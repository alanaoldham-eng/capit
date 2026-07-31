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
  themeMode: 'light',
  themeVariables: {
    '--w3m-accent': '#FABE3C',
    '--w3m-border-radius-master': '12px'
  },
  // We remove includeWalletIds. EIP-6963 handles MetaMask/Coinbase natively.
  // We remove the `features` object entirely to prevent the Type Error on Vercel.
})

interface ProviderProps {
  children: ReactNode
}

export function Web3Provider({ children }: ProviderProps) {
  
  // Ghost Purge Hook: Silently cleans corrupted "Proposal expired" sessions on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('wc@2:core:0.3//proposal');
        localStorage.removeItem('wc@2:client:0.3//proposal');
      } catch (e) {}

      // Prevents "Proposal expired" from crashing the Next.js dev overlay
      const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
        if (event.reason?.message?.includes('expired')) {
          event.preventDefault();
        }
      };
      window.addEventListener('unhandledrejection', handleUnhandledRejection);
      return () => window.removeEventListener('unhandledrejection', handleUnhandledRejection);
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