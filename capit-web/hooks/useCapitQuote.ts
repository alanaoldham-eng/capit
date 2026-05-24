import { useReadContract } from 'wagmi'
import { parseUnits, formatUnits } from 'viem'
import { CONTRACT_ADDRESSES, QUOTER_V2_ABI, POOL_FEE } from '@/config/constants'
import { useDebounce } from './useDebounce'

export function useCapitQuote(usdcInputAmount: string) {
  const debouncedInput = useDebounce(usdcInputAmount, 350)

  // Avoid running queries for blank or zero inputs
  const isValidInput = !!debouncedInput && !isNaN(Number(debouncedInput)) && Number(debouncedInput) > 0
  const parsedAmountIn = isValidInput ? parseUnits(debouncedInput, 6) : 0n

  const { data, isLoading, isError, refetch } = useReadContract({
    address: CONTRACT_ADDRESSES.UNISWAP_V3_QUOTER,
    abi: QUOTER_V2_ABI,
    functionName: 'quoteExactInputSingle',
    args: isValidInput ? [
      {
        tokenIn: CONTRACT_ADDRESSES.USDC,
        tokenOut: CONTRACT_ADDRESSES.CAPIT,
        amountIn: parsedAmountIn,
        fee: POOL_FEE,
        sqrtPriceLimitX96: 0n // 0 disables boundary constraints
      }
    ] : undefined,
    query: {
      enabled: isValidInput,
      staleTime: 10000, // consider cache fresh for 10 seconds
    }
  })

  // Extract amountOut from the returned multi-variable array payload
  const rawAmountOut = data ? (data as any)[0] as bigint : 0n
  const formattedCapitOutput = rawAmountOut > 0n ? formatUnits(rawAmountOut, 18) : '0.00'

  return {
    rawCapitOutput: rawAmountOut,
    formattedCapitOutput,
    rawUsdcInput: parsedAmountIn,
    isQuoteLoading: isLoading && isValidInput,
    isQuoteError: isError,
    refreshQuote: refetch
  }
}