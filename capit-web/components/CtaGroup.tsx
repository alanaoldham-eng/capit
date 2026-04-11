"use client";

import { getBuyCapitUrl } from "@/lib/config/cta";
import { useInjectedWallet } from "@/lib/wallet/useInjectedWallet";

type CtaGroupProps = {
  source: "header" | "footer";
};

export function CtaGroup({ source }: CtaGroupProps) {
  const {
    addressLabel,
    error,
    hasInjectedWallet,
    isConnected,
    isConnecting,
    connectWallet,
  } = useInjectedWallet();

  return (
    <div className="cta-group" data-cta-source={source}>
      <a className="cta" href={getBuyCapitUrl()} target="_blank" rel="noopener noreferrer">
        Buy CAPIT
      </a>
      <button className="cta" type="button" onClick={connectWallet} disabled={isConnecting}>
        {isConnected ? addressLabel : isConnecting ? "Connecting..." : "Connect Wallet"}
      </button>
      {!hasInjectedWallet ? (
        <a className="cta" href="https://metamask.io/download/" target="_blank" rel="noopener noreferrer">
          Install Wallet
        </a>
      ) : null}
      {error ? (
        <span className="cta" role="status" aria-live="polite">
          {error}
        </span>
      ) : null}
    </div>
  );
}