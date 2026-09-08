'use client'

import React, { ReactNode, useEffect } from 'react'
import { wagmiConfig, projectId, hasWalletConnect } from '../config/web3'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

// WalletConnect explorer *wallet* ids (not project ids - see config/web3.ts).
const METAMASK_ID = 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'
const COINBASE_ID = 'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa'

/**
 * Named wallet rows, declared locally.
 *
 * featuredWalletIds/includeWalletIds only filter the list that ApiController
 * fetches from api.web3modal.org, so while that endpoint is unreachable the
 * modal renders no named wallets at all. customWallets is read straight from
 * OptionsController by w3m-connect-custom-widget with no network call, so these
 * two rows show up regardless.
 *
 * Clicking a row opens the branded WalletConnect QR / deep-link flow, which does
 * still need a working relay. A row whose rdns matches an installed extension is
 * dropped automatically, so there is no duplicate when MetaMask is announced
 * over EIP-6963.
 */
const CUSTOM_WALLETS = [
  {
    id: METAMASK_ID,
    name: 'MetaMask',
    rdns: 'io.metamask',
    homepage: 'https://metamask.io',
    mobile_link: 'metamask://',
    app_store: 'https://apps.apple.com/us/app/metamask/id1438144202',
    play_store: 'https://play.google.com/store/apps/details?id=io.metamask',
  },
  {
    id: COINBASE_ID,
    name: 'Base Wallet',
    rdns: 'com.coinbase.wallet',
    homepage: 'https://www.base.org',
    mobile_link: 'https://go.cb-w.com',
    app_store: 'https://apps.apple.com/app/coinbase-wallet/id1278383455',
    play_store: 'https://play.google.com/store/apps/details?id=org.toshi',
  },
]

/**
 * w3m-connect-walletconnect-widget renders an unbranded "WalletConnect" row
 * whenever a WALLET_CONNECT connector exists, and v5 exposes no option to hide
 * it - the only supported off switch is enableWalletConnect: false, which would
 * also remove the QR flow the named rows depend on. Reach into the modal's
 * shadow tree and hide just that element instead. Fails silently: if the
 * internal element name changes, the row simply reappears.
 */
function hideWalletConnectRow() {
  const HIDDEN = 'w3m-connect-walletconnect-widget{display:none!important}'

  const applyTo = (root: ShadowRoot) => {
    if (root.querySelector('style[data-capit-hide-wc]')) return
    if (!root.querySelector('w3m-connect-walletconnect-widget')) return
    const style = document.createElement('style')
    style.setAttribute('data-capit-hide-wc', '')
    style.textContent = HIDDEN
    root.appendChild(style)
  }

  const walk = (node: Element | ShadowRoot, depth = 0) => {
    if (depth > 12) return
    const el = node as Element
    const shadow = (el as HTMLElement).shadowRoot
    if (shadow) {
      applyTo(shadow)
      shadow.querySelectorAll('*').forEach((child) => walk(child, depth + 1))
    }
  }

  try {
    const modals = document.querySelectorAll('w3m-modal')
    if (!modals.length) return
    modals.forEach((modal) => walk(modal))
  } catch {
    /* non-fatal: the row stays visible */
  }
}

const modalConfig = {
  wagmiConfig,
  projectId,
  enableEIP6963: true,
  // 'HIDE' removes the "All Wallets" button; includeWalletIds then restricts the
  // list to MetaMask and Coinbase only. Email/socials are switched off at the
  // connector level in config/web3.ts - there is no `features` option in v5.
  allWallets: 'HIDE',
  featuredWalletIds: [METAMASK_ID, COINBASE_ID],
  includeWalletIds: [METAMASK_ID, COINBASE_ID],
  customWallets: CUSTOM_WALLETS,
  enableAnalytics: false,
  enableOnramp: false,
  enableSwaps: false,
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#FABE3C',
    '--w3m-border-radius-master': '12px',
  },
}

// createWeb3Modal calls the WalletConnect explorer API, which 403s without a
// valid project id. Skip it entirely so the console stays clean; injected and
// Coinbase connectors are still wired up by wagmi.
if (hasWalletConnect) {
  createWeb3Modal(modalConfig as unknown as Parameters<typeof createWeb3Modal>[0])
}

interface ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: ProviderProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('wc@2:') || key.startsWith('@w3m/')) {
            localStorage.removeItem(key)
          }
        })
      } catch (e) {}

      const isWalletConnectNoise = (msg: string) =>
        msg.includes('expired') ||
        msg.includes('Proposal expired') ||
        msg.includes('Request expired') ||
        msg.includes('Connection interrupted') ||
        msg.includes('WebSocket') ||
        msg.includes('socket') ||
        msg.includes('Project not found')

      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        const msg = event.reason?.message || event.reason?.toString() || ''
        if (isWalletConnectNoise(msg)) {
          event.preventDefault()
          console.warn('[Web3Provider] Suppressed transient WalletConnect socket rejection.')
        }
      }

      // The relay also emits synchronous errors ("Connection interrupted while
      // trying to subscribe") from an EventEmitter, which surface as uncaught
      // errors rather than rejections and trip the Next dev overlay.
      const handleError = (event: ErrorEvent) => {
        const msg = event.error?.message || event.message || ''
        if (isWalletConnectNoise(msg)) {
          event.preventDefault()
          event.stopImmediatePropagation()
          console.warn('[Web3Provider] Suppressed transient WalletConnect socket error.')
        }
      }

      window.addEventListener('unhandledrejection', handleUnhandledRejection)
      window.addEventListener('error', handleError, true)

      // A MutationObserver on <body> never sees the modal's internals, because
      // they live in nested shadow roots that mutation records do not cross.
      // Poll instead - the walk short-circuits immediately when no modal is
      // mounted, and again once the style has been injected.
      const hideTimer = window.setInterval(hideWalletConnectRow, 400)
      hideWalletConnectRow()

      return () => {
        window.clearInterval(hideTimer)
        window.removeEventListener('unhandledrejection', handleUnhandledRejection)
        window.removeEventListener('error', handleError, true)
      }
    }
  }, [])

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default Web3Provider