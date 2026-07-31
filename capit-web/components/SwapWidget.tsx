'use client'

import React, { useState, useEffect } from 'react'
import { useAccount, useDisconnect } from 'wagmi'
import { useCapitBalances } from '../hooks/useCapitBalances'
import { useCapitQuote } from '../hooks/useCapitQuote'
import { useTokenApproval } from '../hooks/useTokenApproval'
import { useCapitSwap } from '../hooks/useCapitSwap'
import { useWeb3Modal } from '@web3modal/wagmi/react'

export function SwapWidget() {
  const [usdcAmount, setUsdcAmount] = useState<string>('')
  const [mounted, setMounted] = useState(false)
  const [errorState, setErrorState] = useState<string | null>(null)
  
  const { open } = useWeb3Modal()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    setMounted(true)
  }, [])

  const { balances, isConnected, isLoading: isBalancesLoading, refetchAll } = useCapitBalances()
  const { rawCapitOutput, formattedCapitOutput, rawUsdcInput, isQuoteLoading } = useCapitQuote(usdcAmount)

  const handleSystemRefresh = () => {
    setUsdcAmount('')
    setErrorState(null)
    refetchAll()
  }

  const { isApproved, handleApprove, isApprovalTxPending } = useTokenApproval(rawUsdcInput, refetchAll)
  const { executeSwap, isSwapTxPending } = useCapitSwap(handleSystemRefresh)

  const handleActionClick = async () => {
    if (!isConnected) {
      open()
      return
    }

    setErrorState(null)

    try {
      if (!isApproved) {
        await handleApprove()
      } else {
        await executeSwap(rawUsdcInput, rawCapitOutput)
      }
    } catch (err: any) {
      console.error('CRITICAL SWAP FAULT:', err)
      setErrorState(err?.shortMessage || err?.message || 'Transaction execution failed.')
    }
  }

  const formatDisplayAmount = (value: string) => {
    if (!value || value === '0.00') return '0.00'
    const num = parseFloat(value)
    return isNaN(num) ? '0.00' : num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })
  }

  const getButtonText = () => {
    if (!isConnected) return 'Connect Wallet'
    if (isBalancesLoading) return 'Syncing State...'
    if (!usdcAmount || parseFloat(usdcAmount) === 0) return 'Enter Amount'
    if (rawUsdcInput > balances.usdc.raw) return 'Insufficient USDC Balance'
    if (isQuoteLoading) return 'Calculating Best Rate...'
    if (isApprovalTxPending) return 'Approving Router Access...'
    if (!isApproved) return 'Approve USDC Spend'
    if (isSwapTxPending) return 'Executing Atomic Swap...'
    return 'Buy CAPIT'
  }

  const isButtonDisabled = 
    isConnected && 
    (!usdcAmount || 
     parseFloat(usdcAmount) === 0 || 
     rawUsdcInput > balances.usdc.raw || 
     isQuoteLoading || 
     isApprovalTxPending || 
     isSwapTxPending)

  if (!mounted) {
    return (
      <div className="w-full max-w-md p-6 mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl text-slate-400 animate-pulse">
        <div className="flex justify-between items-center mb-5">
          <div className="h-5 w-36 bg-slate-200 rounded"></div>
          <div className="h-4 w-16 bg-slate-100 rounded"></div>
        </div>
        <div className="h-20 w-full bg-slate-50 border border-slate-100 rounded-xl mb-3"></div>
        <div className="h-20 w-full bg-slate-50 border border-slate-100 rounded-xl mb-5"></div>
        <div className="h-12 w-full bg-slate-200 rounded-xl"></div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md p-6 mx-auto bg-white border border-slate-200 rounded-[32px] shadow-xl text-slate-800">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-black tracking-tight text-slate-900">Protocol Swap Engine</h2>
        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 rounded-md border border-slate-200">
          Base Sepolia
        </span>
      </div>

      {/* Testing & QA Account Management Chip */}
      {isConnected && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs animate-in fade-in duration-200">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
          <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Active Session</span>
          <span className="font-mono text-slate-700 bg-white border border-slate-200 px-1.5 py-0.5 rounded-md font-bold ml-1">
            {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Authorized'}
          </span>
          <button
            type="button"
            onClick={() => disconnect()}
            className="ml-auto font-black text-red-500 hover:text-red-600 uppercase tracking-widest text-[10px] transition-colors"
          >
            Disconnect
          </button>
        </div>
      )}

      {/* Input Token Panel */}
      <div className="p-4 mb-2.5 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
          <span>Spend allocation</span>
          <span>Balance: {formatDisplayAmount(balances.usdc.formatted)} USDC</span>
        </div>
        <div className="flex items-center justify-between">
          <input
            type="number"
            placeholder="0.00"
            value={usdcAmount}
            onChange={(e) => setUsdcAmount(e.target.value)}
            disabled={isApprovalTxPending || isSwapTxPending}
            className="w-full text-2xl font-bold bg-transparent border-none text-slate-900 placeholder-slate-300 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:margin-0 [&::-webkit-inner-spin-button]:margin-0"
          />
          <span className="text-sm font-black tracking-wide text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm ml-2">USDC</span>
        </div>
      </div>

      {/* Output Token Panel */}
      <div className="p-4 mb-4 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="flex justify-between text-xs text-slate-500 mb-1.5 font-medium">
          <span>Acquire allocation</span>
          <span>Balance: {formatDisplayAmount(balances.capit.formatted)} CAPIT</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <div className={`text-2xl font-bold truncate ${isQuoteLoading ? 'text-slate-300' : 'text-slate-900'}`}>
            {formatDisplayAmount(formattedCapitOutput)}
          </div>
          <span className="flex items-center gap-2 text-sm font-black tracking-wide text-slate-400 bg-white border border-slate-200 px-2.5 py-1 rounded-lg shadow-sm shrink-0">
            {/* CAPPY LOGO INJECTED HERE */}
            <Image alt="Cappy Logo" className="rounded-full object-contain" height="{20}" src="/cappy-logo.png" width="{20}"/>
            CAPIT
          </span>
        </div>
      </div>

      {/* Dynamic Error Status Banner */}
      {errorState && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl font-medium overflow-hidden break-words">
          <span className="font-bold block mb-0.5">Execution Error:</span>
          {errorState}
        </div>
      )}

      <button
        onClick={handleActionClick}
        disabled={isButtonDisabled}
        className={`w-full py-3.5 px-4 font-black rounded-xl text-sm tracking-wide shadow-sm transition-all duration-150 transform active:scale-[0.98]
          ${isButtonDisabled 
            ? 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed' 
            : 'bg-[#FABE3C] hover:bg-[#E5AF30] text-slate-900'}`}
      >
        {getButtonText()}
      </button>

      {/* Hardware Wallet Explainer - Only visible when not connected */}
      {!isConnected && (
        <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 text-center shadow-sm">
          <span className="block font-bold text-slate-900 mb-1">
            Using a Ledger or Trezor?
          </span>
          Connect your hardware wallet directly through the MetaMask or Coinbase Wallet browser extensions to access the CAPIT ecosystem safely via USB.
        </div>
      )}

      {isConnected && (
        <div className="mt-4 text-center text-[11px] font-medium text-slate-400">
          Gas Balance: <span className="font-bold text-slate-600">{parseFloat(balances.eth.formatted).toFixed(4)} ETH</span>
        </div>
      )}
    </div>
  )
}