import { createConfig, http } from 'wagmi'
import { base, baseSepolia } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ||
  'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96'

const metadata = {
  name: 'CAPIT Ecosystem',
  description: 'CAPIT Protocol Swap Engine',
  url: 'https://capittoken.com',
  icons: ['https://capittoken.com/cappy-logo.png'],
}

export const wagmiConfig = createConfig({
  chains: [baseSepolia, base],
  transports: {
    [baseSepolia.id]: http(),
    [base.id]: http(),
  },
  connectors: [
    // 1. Generic injected fallback (EIP-6963 auto-detects installed extensions like MetaMask/Coinbase)
    injected(),
    // 2. Coinbase Wallet connector using object syntax for options
    coinbaseWallet({
      appName: metadata.name,
      appLogoUrl: metadata.icons[0],
      preference: { options: 'all' },
    }),
    // 3. WalletConnect connector guarded for SSR / Node environment
    ...(typeof window !== 'undefined'
      ? [
          walletConnect({
            projectId,
            metadata,
            showQrModal: false,
          }),
        ]
      : []),
  ],
})