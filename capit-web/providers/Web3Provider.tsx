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
  allWallets: 'HIDE',
  featuredWalletIds: [METAMASK_ID, COINBASE_ID],
  includeWalletIds: [METAMASK_ID, COINBASE_ID],
  enableAnalytics: false,
  enableOnramp: false,
  features: {
    email: false,
    socials: [],
  },
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

      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        const msg = event.reason?.message || event.reason?.toString() || ''
        if (
          msg.includes('expired') ||
          msg.includes('Proposal expired') ||
          msg.includes('Request expired') ||
          msg.includes('Connection interrupted') ||
          msg.includes('WebSocket') ||
          msg.includes('socket')
        ) {
          event.preventDefault()
          console.warn('[Web3Provider] Suppressed transient WalletConnect socket rejection.')
        }
      }

      window.addEventListener('unhandledrejection', handleUnhandledRejection)
      return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection)
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