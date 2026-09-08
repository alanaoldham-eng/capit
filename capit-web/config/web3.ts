import { defaultWagmiConfig } from '@web3modal/wagmi/react'
import { base, baseSepolia } from 'wagmi/chains'
import type { Chain } from 'wagmi/chains'

/**
 * WalletConnect Cloud project ID. Create one at https://cloud.walletconnect.com
 * and set NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID.
 *
 * There is deliberately no fallback. The previous hard-coded default was the
 * same hex as METAMASK_ID in Web3Provider - that is MetaMask's *wallet* id from
 * the WalletConnect explorer, not a *project* id, so any environment missing the
 * variable silently fell back to a value that can only ever return 403.
 */
export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? ''

export const hasWalletConnect = projectId.length > 0

if (!hasWalletConnect && typeof window !== 'undefined') {
  console.error(
    '[web3] NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set. ' +
      'WalletConnect is disabled; injected and Coinbase wallets still work.'
  )
}

/**
 * Which Base network to run against, via the project's existing
 * NEXT_PUBLIC_BASE_NETWORK convention ("sepolia" | "mainnet").
 *
 * Defaults to sepolia: the CAPIT token and Uniswap LP are not deployed to Base
 * mainnet yet, so pointing the UI at mainnet would render an explorer link to a
 * contract that does not exist. Flip this to "mainnet" as part of the mainnet
 * deploy, together with NEXT_PUBLIC_CAPIT_TOKEN_ADDRESS and
 * NEXT_PUBLIC_EXPLORER_URL.
 */
const network = (process.env.NEXT_PUBLIC_BASE_NETWORK ?? 'sepolia').trim().toLowerCase()

export const isMainnet = network === 'mainnet' || network === 'base'

export const defaultChain: Chain = isMainnet ? base : baseSepolia

export const chains = [defaultChain] as unknown as readonly [Chain, ...Chain[]]

/** Block explorer for the active chain; env wins so it can be overridden per deploy. */
export const explorerUrl =
  process.env.NEXT_PUBLIC_EXPLORER_URL?.replace(/\/+$/, '') ||
  defaultChain.blockExplorers?.default.url ||
  'https://basescan.org'

/**
 * CAPIT token address for the active chain. Env wins over CMS content because
 * the address is network-specific and must not drift when the chain is switched.
 */
export const tokenAddress = process.env.NEXT_PUBLIC_CAPIT_TOKEN_ADDRESS ?? ''

const metadata = {
  name: 'CAPIT Ecosystem',
  description: 'CAPIT Public Well-Plugging Registry & Swap',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://capittoken.com',
  icons: ['/images/capit-logo.png'],
}

export const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  // WalletConnect stays on so mobile wallets can pair by QR code.
  enableWalletConnect: hasWalletConnect,
  enableInjected: true,
  enableEIP6963: true,
  enableCoinbase: true,
  /**
   * Drops the email / social login row from the modal.
   *
   * These come from the auth connector, which defaultConfig adds unless BOTH
   * email is false and socials is empty - at which point the connector is never
   * pushed at all. The `features: { email, socials }` block this replaces was
   * not a real v5 option and silently did nothing.
   */
  auth: { email: false, socials: [] },
})
