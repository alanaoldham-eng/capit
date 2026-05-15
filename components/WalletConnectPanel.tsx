"use client";

import { useEffect, useState } from "react";
import { Wallet, AlertCircle } from "lucide-react";
import { BrowserWallet } from "@meshsdk/core";
import { saveWalletState, getWalletState } from "@/lib/localStorage";
import { shortenAddress } from "@/lib/cardano";
import type { WalletConnectionState } from "@/lib/types";
import StatusPill from "./StatusPill";

type InstalledWallet = { name: string; icon?: string; version?: string };

export default function WalletConnectPanel({ onWallet }: { onWallet?: (wallet: WalletConnectionState) => void }) {
  const [installed, setInstalled] = useState<InstalledWallet[]>([]);
  const [state, setState] = useState<WalletConnectionState>({ connected: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setState(getWalletState() || { connected: false });
    async function loadWallets() {
      try {
        const wallets = await BrowserWallet.getAvailableWallets();
        setInstalled(wallets as InstalledWallet[]);
      } catch {
        setInstalled([]);
      }
    }
    loadWallets();
  }, []);

  async function connect(walletName: string) {
    setLoading(true);
    try {
      const wallet = await BrowserWallet.enable(walletName);
      const usedAddresses = await wallet.getUsedAddresses();
      const rewardAddresses = await wallet.getRewardAddresses();
      const nextState: WalletConnectionState = {
        connected: true,
        walletName,
        address: usedAddresses[0],
        rewardAddress: rewardAddresses[0],
      };
      setState(nextState);
      saveWalletState(nextState);
      onWallet?.(nextState);
    } catch (error) {
      const nextState: WalletConnectionState = { connected: false, error: error instanceof Error ? error.message : "Wallet connection failed." };
      setState(nextState);
      onWallet?.(nextState);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-cardano-600">CIP-30 wallet connect</p>
          <h2 className="mt-2 text-2xl font-bold text-navy-950">Connect an existing Cardano wallet</h2>
        </div>
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cardano-100 text-cardano-600"><Wallet /></div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-600">For v001, Cardano Passport supports existing Cardano browser wallets through CIP-30. Embedded email/passkey wallets are planned for v002.</p>
      <div className="mt-5 rounded-2xl bg-slate-50 p-4">
        <div className="flex items-center gap-2"><StatusPill tone={state.connected ? "green" : "slate"}>{state.connected ? "Connected" : "Not connected"}</StatusPill>{state.walletName && <span className="text-sm font-medium text-slate-600">{state.walletName}</span>}</div>
        {(state.rewardAddress || state.address) && <p className="mt-3 break-all text-sm text-slate-700">{shortenAddress(state.rewardAddress || state.address)}</p>}
      </div>
      {installed.length === 0 ? (
        <div className="mt-5 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900"><AlertCircle size={18} /><p>No CIP-30 browser wallet was detected. Install a Cardano wallet extension such as Lace, Eternl, Flint, or another CIP-30 compatible wallet, then refresh this page.</p></div>
      ) : (
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {installed.map((wallet) => <button key={wallet.name} onClick={() => connect(wallet.name)} disabled={loading} className="button-secondary disabled:cursor-not-allowed disabled:opacity-60">Connect {wallet.name}</button>)}
        </div>
      )}
      {state.error && <p className="mt-4 rounded-2xl bg-red-50 p-4 text-sm text-red-700">{state.error}</p>}
    </section>
  );
}
