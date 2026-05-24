import { useAccount, useBalance, useReadContracts } from 'wagmi'
import { formatUnits } from 'viem'
import { CONTRACT_ADDRESSES, ERC20_MINIMAL_ABI } from '@/config/constants'

export function useCapitBalances() {
  const { address, isConnected } = useAccount()

  // 1. Fetch Native Gas Asset (ETH)
  const { data: ethData, isLoading: isLoadingEth, refetch: refetchEth } = useBalance({
    address,
  })

  // 2. Multicall for USDC and CAPIT ERC-20 Balances
  const { data: erc20Data, isLoading: isLoadingErc20, refetch: refetchErc20 } = useReadContracts({
    contracts: [
      {
        address: CONTRACT_ADDRESSES.USDC,
        abi: ERC20_MINIMAL_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
      },
      {
        address: CONTRACT_ADDRESSES.CAPIT,
        abi: ERC20_MINIMAL_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
      }
    ],
    query: {
      enabled: !!address,
    }
  })

  const [usdcResult, capitResult] = erc20Data || []

  const balances = {
    eth: {
      raw: ethData?.value || 0n,
      formatted: ethData?.formatted || '0.00',
      symbol: 'ETH'
    },
    usdc: {
      raw: (usdcResult?.result as bigint) || 0n,
      formatted: usdcResult?.result ? formatUnits(usdcResult.result as bigint, 6) : '0.00',
      symbol: 'USDC'
    },
    capit: {
      raw: (capitResult?.result as bigint) || 0n,
      formatted: capitResult?.result ? formatUnits(capitResult.result as bigint, 18) : '0.00',
      symbol: 'CAPIT'
    }
  }

  const refetchAll = async () => {
    await Promise.all([refetchEth(), refetchErc20()])
  }

  return {
    balances,
    isConnected,
    userAddress: address,
    isLoading: (isLoadingEth || isLoadingErc20) && isConnected,
    refetchAll
  }
}