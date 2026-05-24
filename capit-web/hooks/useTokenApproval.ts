import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { useEffect } from 'react'
import { maxUint256 } from 'viem'
import { CONTRACT_ADDRESSES, ERC20_ABI } from '../config/constants'

export function useTokenApproval(amountToSpend: bigint, onApprovalSuccess?: () => void) {
  const { address } = useAccount()
  const { writeContractAsync, data: txHash } = useWriteContract()

  // 1. Read current allowance of SwapRouter02 over user's USDC
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: CONTRACT_ADDRESSES.USDC,
    abi: ERC20_ABI,
    functionName: 'allowance',
    args: address ? [address, CONTRACT_ADDRESSES.UNISWAP_V3_ROUTER] : undefined,
    query: {
      enabled: !!address,
    }
  })

  // 2. Track execution state of approval transaction
  const { isSuccess: isMined, isLoading: isWaitingForMining } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  useEffect(() => {
    if (isMined) {
      refetchAllowance().then(() => {
        if (onApprovalSuccess) onApprovalSuccess()
      })
    }
  }, [isMined, refetchAllowance, onApprovalSuccess])

  const currentAllowance = (allowance as bigint) || 0n
  const isApproved = amountToSpend === 0n ? true : currentAllowance >= amountToSpend

  const handleApprove = async () => {
    try {
      const tx = await writeContractAsync({
        address: CONTRACT_ADDRESSES.USDC,
        abi: ERC20_ABI,
        functionName: 'approve',
        args: [
          CONTRACT_ADDRESSES.UNISWAP_V3_ROUTER, 
          maxUint256 // Requests infinite approval so you never have to sign an approval screen again
        ]
      })
      return tx
    } catch (error) {
      console.error('Approval rejected or execution failed:', error)
      throw error
    }
  }

  return {
    isApproved,
    currentAllowance,
    handleApprove,
    isApprovalTxPending: isWaitingForMining,
    refetchAllowance
  }
}