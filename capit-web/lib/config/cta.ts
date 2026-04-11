/**
 * CAPIT CTA + chain configuration.
 *
 * Quick switch in .env file for SIT vs production:
 * - Set NEXT_PUBLIC_BASE_NETWORK=sepolia for Base Sepolia SIT.
 * - Set NEXT_PUBLIC_BASE_NETWORK=mainnet for Base Mainnet production.
 *
 * Optional overrides:
 * - NEXT_PUBLIC_BUY_CAPIT_URL can point to any custom buy/swap page.
 */
const DEFAULT_CAPIT_TOKEN = "0x4eA9f88c71f2c4E760ff68256B45a23ee8efa358";

type BaseNetwork = "mainnet" | "sepolia";

type BaseChainConfig = {
  id: number;
  chainSlug: "base" | "base_sepolia";
  chainName: string;
  rpcUrls: [string];
  blockExplorerUrls: [string];
};

const BASE_CHAINS: Record<BaseNetwork, BaseChainConfig> = {
  mainnet: {
    id: 8453,
    chainSlug: "base",
    chainName: "Base",
    rpcUrls: ["https://mainnet.base.org"],
    blockExplorerUrls: ["https://basescan.org"],
  },
  sepolia: {
    id: 84532,
    chainSlug: "base_sepolia",
    chainName: "Base Sepolia",
    rpcUrls: ["https://sepolia.base.org"],
    blockExplorerUrls: ["https://sepolia.basescan.org"],
  },
};

function getBaseNetwork(): BaseNetwork {
  const value = process.env.NEXT_PUBLIC_BASE_NETWORK?.trim().toLowerCase();
  return value === "sepolia" ? "sepolia" : "mainnet";
}

function sanitizeBuyCapitUrl(value: string | undefined, fallbackUrl: string) {
  if (!value) {
    return fallbackUrl;
  }

  const normalizedValue = value.trim();
  if (!normalizedValue) {
    return fallbackUrl;
  }

  try {
    const parsedUrl = new URL(normalizedValue);
    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return fallbackUrl;
    }

    return parsedUrl.toString();
  } catch {
    return fallbackUrl;
  }
}

const activeChain = BASE_CHAINS[getBaseNetwork()];
const defaultBuyCapitUrl = `https://app.uniswap.org/swap?chain=${activeChain.chainSlug}&outputCurrency=${DEFAULT_CAPIT_TOKEN}`;

export const BUY_CAPIT_URL = sanitizeBuyCapitUrl(
  process.env.NEXT_PUBLIC_BUY_CAPIT_URL,
  defaultBuyCapitUrl,
);

export function getBuyCapitUrl() {
  return BUY_CAPIT_URL;
}

export const BASE_CHAIN = {
  id: activeChain.id,
  hex: `0x${activeChain.id.toString(16)}`,
  chainName: activeChain.chainName,
  rpcUrls: activeChain.rpcUrls,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  blockExplorerUrls: activeChain.blockExplorerUrls,
} as const;