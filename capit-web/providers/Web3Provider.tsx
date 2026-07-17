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

createWeb3Modal({
  wagmiConfig,
  projectId,
  allWallets: 'HIDE',
  enableAnalytics: false,
  enableEIP6963: true,
  features: {
    email: false,
    socials: [],
  },
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#FABE3C',
    '--w3m-border-radius-master': '12px'
  },
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // MetaMask
    'fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa', // Coinbase Wallet
    // Binance Wallet deferred for MVP per team decision — re-add its verified
    // explorer ID here later, don't guess it.
  ]
})

interface ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: ProviderProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('wc@2:core:0.3//proposal');
        localStorage.removeItem('wc@2:client:0.3//proposal');
      } catch (e) {}
    }
  }, []);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}