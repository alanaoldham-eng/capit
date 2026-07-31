'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useAccount, useChainId, useSwitchChain } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { baseSepolia } from 'wagmi/chains'

export function SwapWidget() {
  const { isConnected } = useAccount()
  const chainId = useChainId()
  const { switchChain } = useSwitchChain()
  const { open } = useWeb3Modal()
  const [amount, setAmount] = useState('')

  const isWrongNetwork = isConnected && chainId !== baseSepolia.id

  const handleAction = () => {
    if (!isConnected) {
      open()
    } else if (isWrongNetwork) {
      switchChain({ chainId: baseSepolia.id })
    } else {
      // Execute Swap Logic via Uniswap V3 Router
      console.log('Initiating swap for', amount, 'USDC')
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-neutral-900 dark:text-white">Protocol Swap Engine</h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-semibold uppercase">
          {chainId === baseSepolia.id ? 'Base Sepolia' : 'Network Check'}
        </span>
      </div>

      <div className="space-y-4">
        <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-xl border border-neutral-100 dark:border-neutral-700">
          <div className="flex justify-between text-xs text-neutral-500 mb-2">
            <span>Spend allocation</span>
            <span>Balance: 0.00 USDC</span>
          </div>
          <div className="flex items-center justify-between">
            <input
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-transparent text-2xl font-bold focus:outline-none w-1/2 text-neutral-900 dark:text-white"
            />
            <div className="flex items-center space-x-2 bg-white dark:bg-neutral-700 px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-600">
              <span className="font-semibold text-sm text-neutral-800 dark:text-neutral-200">USDC</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleAction}
          className="w-full py-4 bg-[#FABE3C] hover:bg-[#e5aa2b] text-neutral-900 font-bold rounded-xl transition-all shadow-md active:scale-[0.99]"
        >
          {!isConnected
            ? 'Connect Wallet'
            : isWrongNetwork
            ? 'Switch to Base Sepolia'
            : 'Swap for CAPIT'}
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-neutral-500">
        <Image src="/cappy-logo.png" alt="CAPIT" width={20} height={20} className="w-5 h-5" />
        <span>Interact directly with live Uniswap V3 liquidity pool</span>
      </div>
    </div>
  )
}