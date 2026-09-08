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
      return () => {
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