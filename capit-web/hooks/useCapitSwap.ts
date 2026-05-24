import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { CONTRACT_ADDRESSES, ROUTER_ABI, POOL_FEE } from '../config/constants'

export function useCapitSwap(onSwapSuccess?: () => void) {
  const { address } = useAccount()
  const { writeContractAsync, data: txHash } = useWriteContract()

  const { isLoading: isSwappingMined, isSuccess: isSwapSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  })

  const executeSwap = async (amountIn: bigint, projectedAmountOut: bigint) => {
    if (!address) throw new Error('Wallet connection required.')
    if (amountIn === 0n) throw new Error('Invalid input amount.')

    // Apply a safe 1% slippage threshold for initial testnet curve depth handling (990 / 1000)
    const amountOutMinimum = (projectedAmountOut * 990n) / 1000n

    try {
      const tx = await writeContractAsync({
        address: CONTRACT_ADDRESSES.UNISWAP_V3_ROUTER,
        abi: ROUTER_ABI,
        functionName: 'exactInputSingle',
        args: [
          {
            tokenIn: CONTRACT_ADDRESSES.USDC,
            tokenOut: CONTRACT_ADDRESSES.CAPIT,
            fee: POOL_FEE,
            recipient: address,
            amountIn: amountIn,
            amountOutMinimum: amountOutMinimum,
            sqrtPriceLimitX96: 0n
          }
        ],
        value: 0n
      })

      if (onSwapSuccess) onSwapSuccess()
      return tx
    } catch (error) {
      console.error('Swap execution dropped or reverted:', error)
      throw error
    }
  }

  return {
    executeSwap,
    isSwapTxPending: isSwappingMined,
    isSwapSuccess,
    swapTxHash: txHash
  }
}