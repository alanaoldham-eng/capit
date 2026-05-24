const isMainnet = process.env.NEXT_PUBLIC_NETWORK === 'mainnet'

export const CHAIN_ID = isMainnet ? 8453 : 84532

export const CONTRACT_ADDRESSES = {
  CAPIT: isMainnet 
    ? '0xYOUR_MAINNET_CAPIT_ADDRESS' as `0x${string}`
    : '0x166aB7d882B1e88d49DB0ac877E42B7470CC9F79' as `0x${string}`,
    
  USDC: isMainnet 
    ? '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913' as `0x${string}` // Canonical Base Mainnet USDC
    : '0x036CbD53842c5426634e7929541eC2318f3dCF7e' as `0x${string}`,
    
  UNISWAP_V3_POOL: isMainnet
    ? '0xYOUR_MAINNET_POOL_ADDRESS' as `0x${string}`
    : '0x38f41903fbabEe0B247FF23F51bD89a17618A514' as `0x${string}`,
    
  // Fixed: Points to canonical Uniswap SwapRouter02 for both environments
  UNISWAP_V3_ROUTER: isMainnet
    ? '0x2626664c2603336E57B271c5C0b26F421741e481' as `0x${string}` // Official Base Mainnet Router02
    : '0x94cC0AaC535CCDB3C01d6787D6413C739ae12bc4' as `0x${string}`, // Official Base Sepolia Router02
  
  UNISWAP_V3_QUOTER: isMainnet
    ? '0x3d4e44Eb1374240CE5F1B871ab261CD16335B76a' as `0x${string}` 
    : '0xC5290058841028F1614F3A6F0F5816cAd0df5E27' as `0x${string}`
}

export const POOL_FEE = isMainnet ? 3000 : 10000 

export const ERC20_ABI = [
  { constant: true, inputs: [{ name: '_owner', type: 'address' }], name: 'balanceOf', outputs: [{ name: 'balance', type: 'uint256' }], type: 'function', stateMutability: 'view' },
  { constant: true, inputs: [{ name: '_owner', type: 'address' }, { name: '_spender', type: 'address' }], name: 'allowance', outputs: [{ name: 'remaining', type: 'uint256' }], type: 'function', stateMutability: 'view' },
  { constant: false, inputs: [{ name: '_spender', type: 'address' }, { name: '_value', type: 'uint256' }], name: 'approve', outputs: [{ name: 'success', type: 'bool' }], type: 'function', stateMutability: 'nonpayable' }
] as const

export const ERC20_MINIMAL_ABI = ERC20_ABI

export const QUOTER_V2_ABI = [
  { inputs: [{ components: [{ internalType: 'address', name: 'tokenIn', type: 'address' }, { internalType: 'address', name: 'tokenOut', type: 'address' }, { internalType: 'uint256', name: 'amountIn', type: 'uint256' }, { internalType: 'uint24', name: 'fee', type: 'uint24' }, { internalType: 'uint160', name: 'sqrtPriceLimitX96', type: 'uint160' }], internalType: 'struct IQuoterV2.QuoteExactInputSingleParams', name: 'params', type: 'tuple' }], name: 'quoteExactInputSingle', outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }, { internalType: 'uint160', name: 'sqrtPriceX96After', type: 'uint160' }, { internalType: 'uint32', name: 'initializedTicksCrossed', type: 'uint32' }, { internalType: 'uint256', name: 'gasEstimate', type: 'uint256' }], stateMutability: 'payable', type: 'function' }
] as const

export const ROUTER_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'tokenIn', type: 'address' },
          { internalType: 'address', name: 'tokenOut', type: 'address' },
          { internalType: 'uint24', name: 'fee', type: 'uint24' },
          { internalType: 'address', name: 'recipient', type: 'address' },
          { internalType: 'uint256', name: 'amountIn', type: 'uint256' },
          { internalType: 'uint256', name: 'amountOutMinimum', type: 'uint256' },
          { internalType: 'uint160', name: 'sqrtPriceLimitX96', type: 'uint160' }
        ],
        internalType: 'struct IV3SwapRouter.ExactInputSingleParams',
        name: 'params',
        type: 'tuple'
      }
    ],
    name: 'exactInputSingle',
    outputs: [{ internalType: 'uint256', name: 'amountOut', type: 'uint256' }],
    stateMutability: 'payable',
    type: 'function'
  }
] as const