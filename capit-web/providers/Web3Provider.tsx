'use client'

import React, { ReactNode } from 'react'
import { wagmiConfig, projectId } from '../config/web3'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { State, WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()

// Called unconditionally at the module top-level so context mirrors across
// both server pre-renders and client hydration trees, eliminating the hook initialization error.
createWeb3Modal({
  wagmiConfig,
  projectId,
  enableAnalytics: false,
  enableOnRamp: false, // Safely strips out Coinbase fiat dependencies
  themeMode: 'light',   // Flipped to match your clean light-mode mockup palette
  themeVariables: {
    '--w3m-accent': '#FABE3C', // Synchronized with our target amber highlight hex
    '--w3m-border-radius-master': '12px'
  }
})

interface ProviderProps {
  children: ReactNode
  initialState?: State
}

export function Web3Provider({ children, initialState }: ProviderProps) {
  return (
    <WagmiProvider config={wagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}