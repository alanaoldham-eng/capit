'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useAccount, useChainId, useSwitchChain, useConnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { defaultChain, hasWalletConnect } from '@/config/web3'

const ACTION_BUTTON_CLASS =
  'w-full py-4 mt-2 bg-[#FABE3C] hover:bg-[#e5aa2b] text-neutral-900 font-bold rounded-xl transition-all shadow-md active:scale-[0.99]'

/**
 * useWeb3Modal throws unless createWeb3Modal ran, and createWeb3Modal only runs
 * when a WalletConnect project id is configured. Keeping the hook inside a
 * component that is mounted conditionally keeps hook order stable in both cases.
 */
function ConnectViaModal() {
  const { open } = useWeb3Modal()
  return (
    <button type="button" onClick={() => open()} className={ACTION_BUTTON_CLASS}>
      Connect Wallet
    </button>
  )
}

/** Fallback when WalletConnect is unavailable: connect the browser wallet directly. */
function ConnectViaInjected() {
  const { connect, connectors } = useConnect()
  const handleConnect = () => {
    const injected = connectors.find((c) => c.type === 'injected') ?? connectors[0]
    if (injected) connect({ connector: injected })
  }
  return (
    <button type="button" onClick={handleConnect} className={ACTION_BUTTON_CLASS}>
      Connect Wallet
    </button>
  )
}

export function SwapWidget() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const [usdcAmount, setUsdcAmount] = useState('')

  const isWrongNetwork = isConnected && chainId !== defaultChain.id

  const capitOutput =
    usdcAmount && !isNaN(Number(usdcAmount))
      ? (Number(usdcAmount) / 0.025).toLocaleString(undefined, { maximumFractionDigits: 2 })
      : '0.00'

  const handleAction = () => {
    if (isWrongNetwork) {
      switchChain({ chainId: defaultChain.id })
    } else {
      console.log('Initiating swap of', usdcAmount, 'USDC for CAPIT')
    }
  }

  return (
    <div id="swap" className="w-full max-w-md mx-auto space-y-4 scroll-mt-32 my-12">
      <div className="p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Protocol Swap Engine</h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold uppercase">
            {chainId === defaultChain.id ? defaultChain.name : 'Network Check'}
          </span>
        </div>

        <div className="space-y-3">
          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700">
            <div className="flex justify-between text-xs text-neutral-500 mb-2">
              <span>Spend allocation</span>
              <span>Balance: 0.00 USDC</span>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="number"
                placeholder="0.00"
                value={usdcAmount}
                onChange={(e) => setUsdcAmount(e.target.value)}
                className="bg-transparent text-2xl font-bold focus:outline-none w-1/2 text-neutral-900 dark:text-white"
              />
              <div className="flex items-center space-x-2 bg-white dark:bg-neutral-700 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-600">
                <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">USDC</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-2 relative z-10">
            <div className="bg-neutral-200 dark:bg-neutral-700 p-1.5 rounded-full text-neutral-600 dark:text-neutral-300">
              ↓
            </div>
          </div>

          <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700">
            <div className="flex justify-between text-xs text-neutral-500 mb-2">
              <span>You receive</span>
              <span>Est. Rate: 1 CAPIT = $0.025</span>
            </div>
            <div className="flex items-center justify-between">
              <input
                type="text"
                readOnly
                value={capitOutput}
                className="bg-transparent text-2xl font-bold focus:outline-none w-1/2 text-neutral-900 dark:text-white cursor-default"
              />
              {/* Enlarged Badge Mark per Bug 3 */}
              <div className="flex items-center space-x-2 bg-[#FABE3C]/20 dark:bg-[#FABE3C]/10 px-3.5 py-2 rounded-lg border border-[#FABE3C]">
                <Image
                  src="/images/capit-logo.png"
                  alt="CAPIT"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-contain"
                />
                <span className="font-extrabold text-base text-neutral-900 dark:text-white tracking-wide">CAPIT</span>
              </div>
            </div>
          </div>

          {!isConnected ? (
            hasWalletConnect ? <ConnectViaModal /> : <ConnectViaInjected />
          ) : (
            <button type="button" onClick={handleAction} className={ACTION_BUTTON_CLASS}>
              {isWrongNetwork ? `Switch to ${defaultChain.name}` : 'Swap for CAPIT'}
            </button>
          )}
        </div>

        <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-neutral-500">
          <Image src="/images/capit-logo.png" alt="CAPIT" width={16} height={16} className="w-4 h-4 rounded-full object-contain" />
          <span>Interact directly with live Uniswap V3 liquidity pool</span>
        </div>
      </div>

      <div className="p-4 bg-neutral-100 dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-600 dark:text-neutral-300 text-center space-y-1.5 shadow-sm">
        <div className="font-semibold text-neutral-900 dark:text-white flex items-center justify-center space-x-1.5">
          <span>🔒 Hardware Wallet User Guidance (Ledger Stax / Nano / Trezor)</span>
        </div>
        <p className="leading-relaxed">
          Unlock your Ledger or Trezor device, open the Ethereum or Base app, and connect through your MetaMask or Coinbase Wallet browser extension.
        </p>
      </div>
    </div>
  )
}

export default SwapWidget