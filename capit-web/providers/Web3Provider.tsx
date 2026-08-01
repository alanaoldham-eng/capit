'use client'

import React, { ReactNode, useEffect } from 'react'
import { wagmiConfig, projectId } from '../config/web3'
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

// Verified 64-character WalletConnect Explorer IDs
const METAMASK_ID = 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'
const COINBASE_ID = 'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa'

const modalConfig = {
  wagmiConfig,
  projectId,
  enableEIP6963: true,
  features: {
    email: false,
    socials: [], // Empty array explicitly disables Google, X, Discord, GitHub
  },
  allWallets: 'HIDE' as const, // Suppresses general search catalog
  enableAnalytics: false,
  enableOnramp: false,
  themeMode: 'light' as const,
  themeVariables: {
    '--w3m-accent': '#FABE3C',
    '--w3m-border-radius-master': '12px',
  },
  // Featured wallet IDs pin QR/mobile triggers without blocking local EIP-6963 extension detectors
  featuredWalletIds: [METAMASK_ID, COINBASE_ID],
}

createWeb3Modal(modalConfig as unknown as Parameters<typeof createWeb3Modal>[0])

interface ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: ProviderProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('wc@2:core:0.3//proposal')
        localStorage.removeItem('wc@2:client:0.3//proposal')
      } catch (e) {}

      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        const msg = event.reason?.message || ''
        if (
          msg.includes('expired') ||
          msg.includes('Proposal expired') ||
          msg.includes('Request expired')
        ) {
          event.preventDefault()
          console.warn('[Web3Provider] Suppressed expired WalletConnect proposal error.')
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