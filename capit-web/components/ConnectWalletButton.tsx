'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { useAccount, useConnect } from 'wagmi'
import type { Connector } from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import { hasWalletConnect } from '@/config/web3'

interface ConnectWalletButtonProps {
  className: string
  label?: string
}

/**
 * The one Connect Wallet button for the whole site.
 *
 * useWeb3Modal throws unless createWeb3Modal ran, and createWeb3Modal only runs
 * when NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID was set at build time (see
 * providers/Web3Provider.tsx). Each branch is its own component, mounted
 * conditionally, so hook order stays stable in both cases.
 */
export function ConnectWalletButton({ className, label = 'Connect Wallet' }: ConnectWalletButtonProps) {
  return hasWalletConnect ? (
    <ConnectViaModal className={className} label={label} />
  ) : (
    <ConnectViaChooser className={className} label={label} />
  )
}

function ConnectViaModal({ className, label }: Required<ConnectWalletButtonProps>) {
  const { open } = useWeb3Modal()
  return (
    <button type="button" onClick={() => open()} className={className}>
      {label}
    </button>
  )
}

/** Connector ids/types that are not a wallet the user can pick in this fallback. */
const EXCLUDED_TYPES = new Set(['walletConnect'])
const EXCLUDED_IDS = new Set(['w3mAuth'])
const GENERIC_INJECTED_ID = 'injected'

function displayName(connector: Connector): string {
  if (connector.type === 'coinbaseWallet') return 'Base Wallet'
  return connector.name
}

function hasBrowserWallet(): boolean {
  return typeof window !== 'undefined' && typeof (window as { ethereum?: unknown }).ethereum !== 'undefined'
}

/**
 * Pick the wallets worth showing when Web3Modal is not available.
 *
 * - EIP-6963 announces each installed extension as its own injected connector
 *   (id = the wallet's rdns, e.g. io.metamask), with a proper name and icon.
 * - wagmi also keeps a generic "Injected" connector. It is only useful when no
 *   extension announced itself over EIP-6963 but window.ethereum still exists.
 * - The Coinbase connector works with no extension at all (it opens a popup),
 *   so it is always offered - labelled Base Wallet to match the modal.
 */
function selectWallets(connectors: readonly Connector[]): Connector[] {
  const usable = connectors.filter((c) => !EXCLUDED_TYPES.has(c.type) && !EXCLUDED_IDS.has(c.id))

  const announced = usable.filter((c) => c.type === 'injected' && c.id !== GENERIC_INJECTED_ID)
  const keepGeneric = announced.length === 0 && hasBrowserWallet()

  const seen = new Set<string>()
  return usable.filter((c) => {
    if (c.id === GENERIC_INJECTED_ID && !keepGeneric) return false
    const key = displayName(c).toLowerCase()
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function friendlyError(error: Error | null): string | null {
  if (!error) return null
  const text = `${error.name} ${error.message}`.toLowerCase()
  if (text.includes('rejected') || text.includes('denied') || text.includes('cancel')) {
    return 'Connection cancelled in your wallet.'
  }
  if (text.includes('provider not found') || text.includes('connector not found')) {
    return 'That wallet was not found in this browser.'
  }
  return 'Could not connect. Please try again.'
}

/**
 * Fallback when WalletConnect is not configured: a small in-page chooser over
 * the browser wallets wagmi can reach directly. It never connects silently to
 * whichever wallet happens to be first, and it tells the user when there is
 * nothing to connect to instead of doing nothing.
 */
function ConnectViaChooser({ className, label }: Required<ConnectWalletButtonProps>) {
  const { isConnected } = useAccount()
  const { connect, connectors, error, isPending, variables, reset } = useConnect()
  const [open, setOpen] = useState(false)

  const wallets = useMemo(() => selectWallets(connectors), [connectors])
  const noExtension = !wallets.some((c) => c.type === 'injected')
  const message = friendlyError(error)

  useEffect(() => {
    if (isConnected) setOpen(false)
  }, [isConnected])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const openChooser = () => {
    reset()
    setOpen(true)
  }

  const pendingId = isPending ? (variables?.connector as Connector | undefined)?.id : undefined

  return (
    <>
      <button type="button" onClick={openChooser} className={className}>
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="capit-wallet-chooser-title"
            className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-5 text-left shadow-2xl dark:border-neutral-800 dark:bg-neutral-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="capit-wallet-chooser-title" className="text-lg font-bold text-neutral-900 dark:text-white">
                Connect a wallet
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="rounded-lg px-2 py-1 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              >
                ✕
              </button>
            </div>

            {wallets.length > 0 ? (
              <ul className="space-y-2">
                {wallets.map((connector) => (
                  <li key={connector.uid}>
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => connect({ connector })}
                      className="flex w-full items-center gap-3 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:border-[#FABE3C] hover:bg-[#FABE3C]/10 disabled:opacity-60 dark:border-neutral-700 dark:text-white"
                    >
                      {connector.icon ? (
                        <Image
                          src={connector.icon}
                          alt=""
                          width={28}
                          height={28}
                          unoptimized
                          className="h-7 w-7 rounded-md"
                        />
                      ) : (
                        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-neutral-100 text-xs dark:bg-neutral-800">
                          {displayName(connector).charAt(0)}
                        </span>
                      )}
                      <span className="flex-1 text-left">{displayName(connector)}</span>
                      {pendingId === connector.id && (
                        <span className="text-xs font-normal text-neutral-500">Check your wallet…</span>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-neutral-600 dark:text-neutral-300">No wallets are available in this browser.</p>
            )}

            {noExtension && (
              <p className="mt-4 text-xs leading-relaxed text-neutral-500">
                No browser wallet extension was found. Install{' '}
                <a href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer" className="underline">
                  MetaMask
                </a>{' '}
                or use Base Wallet, then try again.
              </p>
            )}

            {message && (
              <p role="alert" className="mt-4 text-xs font-semibold text-red-600">
                {message}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ConnectWalletButton
