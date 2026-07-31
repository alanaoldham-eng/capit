"use client";

import { useAccount, useChainId, useSwitchChain } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { baseSepolia } from "wagmi/chains";
import { getBuyCapitUrl } from "@/lib/config/cta";

type CtaGroupProps = {
  source: "header" | "footer";
};

function truncateAddress(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function CtaGroup({ source }: CtaGroupProps) {
  const { open } = useWeb3Modal();
  const { address, isConnected, isConnecting } = useAccount();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const isWrongNetwork = isConnected && chainId !== baseSepolia.id;

  const handleClick = () => {
    if (isWrongNetwork) {
      switchChain({ chainId: baseSepolia.id });
      return;
    }
    // Web3Modal's open() shows the connect list when disconnected, and the
    // account/disconnect screen when already connected — no need for
    // separate connect/disconnect logic here.
    open();
  };

  const buttonLabel = () => {
    if (isConnecting) return "Connecting...";
    if (!isConnected) return "Connect Wallet";
    if (isWrongNetwork) return isSwitching ? "Switching Network..." : "Wrong Network";
    return address ? truncateAddress(address) : "Connected";
  };

  return (
    <div className="cta-group" data-cta-source={source}>
      <a className="cta" href={getBuyCapitUrl()} target="_blank" rel="noopener noreferrer">
        Buy CAPIT
      </a>
      <button
        className="cta"
        type="button"
        onClick={handleClick}
        disabled={isConnecting || isSwitching}
      >
        {buttonLabel()}
      </button>
    </div>
  );
}