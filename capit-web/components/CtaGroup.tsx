'use client'

import React from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { hasWalletConnect } from '@/config/web3'
import { ConnectWalletButton } from '@/components/ConnectWalletButton'

const CONNECT_CLASS =
  'px-5 py-2.5 bg-[#FABE3C] hover:bg-[#e5aa2b] text-neutral-900 font-bold rounded-xl transition-all shadow-sm active:scale-95'

const ADDRESS_CLASS =
  'px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-900 dark:text-white font-mono text-xs font-semibold rounded-xl border border-neutral-300 dark:border-neutral-700 transition-all'

function truncate(address?: string) {
  return address ? `${address.slice(0, 6)}...${address.slice(-4)}` : ''
}

/**
 * useWeb3Modal throws unless createWeb3Modal ran (only when a WalletConnect
 * project id is configured), so the Account-view button lives in its own
 * component and is only mounted when the modal exists.
 */
function AddressViaModal({ label }: { label: string }) {
  const { open } = useWeb3Modal()
  return (
    <button type="button" onClick={() => open({ view: 'Account' })} className={ADDRESS_CLASS}>
      {label}
    </button>
  )
}

export function CtaGroup() {
  const { isConnected, address } = useAccount()
  const { disconnect } = useDisconnect()
  const truncatedAddress = truncate(address)

  return (
    <div className="flex items-center space-x-3">
      {!isConnected ? (
        <ConnectWalletButton className={CONNECT_CLASS} />
      ) : (
        <div className="flex items-center space-x-2">
          {hasWalletConnect ? (
            <AddressViaModal label={truncatedAddress} />
          ) : (
            <span className={ADDRESS_CLASS} title={address}>
              {truncatedAddress}
            </span>
          )}
          <button
            type="button"
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

export default CtaGroup
