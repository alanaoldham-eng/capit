import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { baseSepolia, mainnet } from 'wagmi/chains'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'YOUR_PROJECT_ID_FALLBACK'

if (!projectId) {
  throw new Error('Project ID is undefined. Please set NEXT_PUBLIC_PROJECT_ID.')
}

const metadata = {
  name: 'CAPIT Ecosystem Registry',
  description: 'Environmental Registry & Token Swap Interface',
  url: 'https://capit.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Including mainnet strictly as a read-only dependency to handle background profile/ENS syncs safely
export const chains = [baseSepolia, mainnet] as const

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
})