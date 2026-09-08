import { defaultWagmiConfig } from '@web3modal/wagmi/react'
import { base, baseSepolia } from 'wagmi/chains'
import type { Chain } from 'wagmi/chains'

/**
 * WalletConnect Cloud project ID. Create one at https://cloud.walletconnect.com
 * and set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID in the environment.
 *
 * There is deliberately no fallback: the previous hard-coded value was MetaMask's
 * *wallet* id from the WalletConnect explorer, not a *project* id, which is why
 * api.web3modal.org/getWallets returned 403 on every page load.
 */
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''

export const hasWalletConnect = projectId.length > 0

if (!hasWalletConnect && typeof window !== 'undefined') {
  console.error(
    '[web3] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. ' +
      'WalletConnect is disabled; injected and Coinbase wallets still work. ' +
      'Set it before deploying to production.'
  )
}

/**
 * Production runs on Base mainnet. Set NEXT_PUBLIC_ENABLE_TESTNET=true in a
 * preview environment to additionally offer Base Sepolia.
 */
export const enableTestnet = process.env.NEXT_PUBLIC_ENABLE_TESTNET === 'true'

export const chains = (
  enableTestnet ? [base, baseSepolia] : [base]
) as unknown as readonly [Chain, ...Chain[]]

/** The chain the swap widget targets. Always the first entry above. */
export const defaultChain: Chain = chains[0]

const metadata = {
  name: 'CAPIT Ecosystem',
  description: 'CAPIT Public Well-Plugging Registry & Swap',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://capittoken.com',
  icons: ['/images/CAPIT-LOGO-large_3x.png'],
}

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  enableWalletConnect: hasWalletConnect,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
})
