import type { WalletConnectionState } from "./types";

export const cardanoNetwork = process.env.NEXT_PUBLIC_CARDANO_NETWORK || "preprod-demo";

export function shortenAddress(address?: string) {
  if (!address) return "Not connected";
  if (address.length <= 18) return address;
  return `${address.slice(0, 10)}...${address.slice(-8)}`;
}

export function emptyWalletState(): WalletConnectionState {
  return { connected: false };
}
