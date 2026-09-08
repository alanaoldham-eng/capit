import { defaultWagmiConfig } from '@web3modal/wagmi/react'
import { base, baseSepolia } from 'wagmi/chains'

export const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'

const metadata = {
  name: 'CAPIT Ecosystem',
  description: 'CAPIT Public Well-Plugging Registry & Swap',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://capittoken.com',
  icons: ['/images/CAPIT-LOGO-large_3x.png'],
}

export const chains = [baseSepolia, base] as const

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: true,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true, // Correct placement for Wagmi config
})