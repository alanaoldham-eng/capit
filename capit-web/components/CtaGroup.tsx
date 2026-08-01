'use client'

import React from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'

export function CtaGroup() {
  const { isConnected, address } = useAccount()
  const { open } = useWeb3Modal()
  const { disconnect } = useDisconnect()

  const truncatedAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : ''

  return (
    <div className="flex items-center space-x-3">
      {!isConnected ? (
        <button
          onClick={() => open()}
          className="px-5 py-2.5 bg-[#FABE3C] hover:bg-[#e5aa2b] text-neutral-900 font-bold rounded-xl transition-all shadow-sm active:scale-95"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => open({ view: 'Account' })}
            className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-900 dark:text-white font-mono text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 transition-all"
          >
            {truncatedAddress}
          </button>
          <button
            onClick={() => disconnect()}
            className="px-3 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 text-xs font-semibold rounded-xl transition-all"
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}