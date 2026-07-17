import { http, createConfig, createStorage, cookieStorage } from 'wagmi'
import { baseSepolia, mainnet } from 'wagmi/chains'
import { injected, coinbaseWallet, walletConnect } from 'wagmi/connectors'

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ''

const metadata = {
  name: 'CAPIT Ecosystem Registry',
  description: 'Environmental Registry & Token Swap Interface',
  url: 'http://localhost:3000',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

export const chains = [baseSepolia, mainnet] as const

// FIX (duplicate MetaMask): removed injected({ target: 'metaMask' }).
// enableEIP6963 (set in Web3Provider.tsx) already auto-discovers MetaMask
// as an installed extension — the explicit target connector was creating
// a second, redundant list entry for the same wallet.
//
// Kept a generic injected() as a fallback catch-all for any extension
// that doesn't announce itself via EIP-6963.
//
// FIX (missing Coinbase Wallet): preference must be passed as an object
// ({ options: 'all' }), not a bare string ('all') — the string form is
// deprecated and was causing the connector to fail to register.
const connectors = [
  injected(),
  coinbaseWallet({
    appName: metadata.name,
    appLogoUrl: metadata.icons[0],
    preference: { options: 'all' }
  }),
  // Only walletConnect()'s core touches indexedDB at construction time —
  // scope the SSR guard to just this connector, not the whole array.
  ...(typeof window !== 'undefined' ? [
    walletConnect({
      projectId,
      metadata,
      showQrModal: false
    })
  ] : [])
]

export const wagmiConfig = createConfig({
  chains,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage
  }),
  connectors,
  transports: {
    [baseSepolia.id]: http(),
    [mainnet.id]: http()
  }
})