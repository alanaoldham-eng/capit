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

// Declared as a standalone object with type assertion to bypass Next.js build-time excess property checks
const web3ModalConfig = {
  wagmiConfig,
  projectId,
  enableEIP6963: true,
  features: {
    email: false,
    socials: false,
  },
  allWallets: 'HIDE' as const,
  enableAnalytics: false,
  enableOnramp: false,
  themeMode: 'light' as const,
  themeVariables: {
    '--w3m-accent': '#FABE3C',
    '--w3m-border-radius-master': '12px',
  },
  // Official 64-character WalletConnect Explorer IDs for MetaMask and Coinbase Wallet
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase Wallet
  ],
}

createWeb3Modal(web3ModalConfig as unknown as Parameters<typeof createWeb3Modal>[0])

interface ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: ProviderProps) {
  // Purges expired session tokens and handles unhandled WalletConnect promise rejections
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