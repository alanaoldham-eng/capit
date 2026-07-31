import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { baseSepolia, mainnet } from 'wagmi/chains'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ''

export const chains = [baseSepolia, mainnet] as const

const metadata = {
  name: 'CAPIT Ecosystem Registry',
  description: 'Environmental Registry & Token Swap Interface',
  url: 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  enableWalletConnect: true,
  enableInjected: true, 
  enableEIP6963: true, // This automatically discovers MetaMask and Coinbase without duplicates
  enableCoinbase: true,
  enableEmail: false // Strictly disables Reown's email login
})