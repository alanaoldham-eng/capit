"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BASE_CHAIN } from "@/lib/config/cta";

type EthereumProvider = {
  isMetaMask?: boolean;
  providers?: EthereumProvider[];
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  on?: (eventName: string, listener: (...args: unknown[]) => void) => void;
  removeListener?: (eventName: string, listener: (...args: unknown[]) => void) => void;
};

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function getInjectedProvider(): EthereumProvider | undefined {
  if (typeof window === "undefined") return undefined;

  const ethereum = window.ethereum;
  if (!ethereum) return undefined;

  if (Array.isArray(ethereum.providers) && ethereum.providers.length > 0) {
    const metaMaskProvider = ethereum.providers.find((provider) => provider.isMetaMask);
    return metaMaskProvider ?? ethereum.providers[0];
  }

  return ethereum;
}

async function switchToBase(provider: EthereumProvider) {
  try {
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${BASE_CHAIN.id.toString(16)}` }],
    });
  } catch (error) {
    const code = (error as { code?: number }).code;

    if (code === 4902) {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${BASE_CHAIN.id.toString(16)}`,
            chainName: BASE_CHAIN.chainName,
            nativeCurrency: BASE_CHAIN.nativeCurrency,
            rpcUrls: BASE_CHAIN.rpcUrls,
            blockExplorerUrls: BASE_CHAIN.blockExplorerUrls,
          },
        ],
      });
      return;
    }

    throw error;
  }
}

export function useInjectedWallet() {
  const [address, setAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const syncAccounts = useCallback(async (provider: EthereumProvider) => {
    const accounts = (await provider.request({ method: "eth_accounts" })) as string[];
    setAddress(accounts[0] ?? "");
  }, []);

  const connectWallet = useCallback(async () => {
    const provider = getInjectedProvider();

    if (!provider) {
      setError("No injected wallet found. Please install MetaMask.");
      return;
    }

    setError("");
    setIsConnecting(true);

    try {
      const chainId = (await provider.request({ method: "eth_chainId" })) as string;

      if (chainId.toLowerCase() !== `0x${BASE_CHAIN.id.toString(16)}`.toLowerCase()) {
        await switchToBase(provider);
      }

      const accounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as string[];

      setAddress(accounts[0] ?? "");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to connect wallet or switch network.";
      setError(message);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  useEffect(() => {
    const provider = getInjectedProvider();
    if (!provider || !provider.on || !provider.removeListener) {
      return;
    }

    const onAccountsChanged = (accounts: unknown) => {
      if (Array.isArray(accounts) && typeof accounts[0] === "string") {
        setAddress(accounts[0]);
      } else {
        setAddress("");
      }
    };

    const onChainChanged = async () => {
      try {
        await syncAccounts(provider);
      } catch {
        setAddress("");
      }
    };

    provider.on("accountsChanged", onAccountsChanged);
    provider.on("chainChanged", onChainChanged);
    void syncAccounts(provider);

    return () => {
      provider.removeListener?.("accountsChanged", onAccountsChanged);
      provider.removeListener?.("chainChanged", onChainChanged);
    };
  }, [syncAccounts]);

  return {
    hasInjectedWallet: mounted && Boolean(getInjectedProvider()),
    isConnected: Boolean(address),
    addressLabel: useMemo(() => (address ? truncateAddress(address) : ""), [address]),
    isConnecting,
    error,
    connectWallet,
  };
}