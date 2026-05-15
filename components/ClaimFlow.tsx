"use client";

import { useState } from "react";
import type { Campaign, ClaimRecord, WalletConnectionState } from "@/lib/types";
import { recordLocalClaim } from "@/lib/claimService";
import { getProfile } from "@/lib/localStorage";
import WalletConnectPanel from "./WalletConnectPanel";
import StatusPill from "./StatusPill";

export default function ClaimFlow({ campaign }: { campaign: Campaign }) {
  const [email, setEmail] = useState(() => getProfile()?.email || "");
  const [wallet, setWallet] = useState<WalletConnectionState | null>(null);
  const [claim, setClaim] = useState<ClaimRecord | null>(null);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    const nextClaim = recordLocalClaim(campaign, email, wallet?.rewardAddress || wallet?.address);
    setClaim(nextClaim);
  }

  if (claim) {
    return (
      <section className="card p-8">
        <StatusPill tone="green">Local claim record</StatusPill>
        <h1 className="mt-5 text-3xl font-bold text-navy-950">Demo badge claimed</h1>
        <p className="mt-3 text-slate-600">Your claim for {campaign.title} has been recorded in this browser.</p>
        <p className="mt-5 rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-800">v001 records the claim locally. Production v002 will mint/send a native Cardano asset.</p>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="card p-8">
        <StatusPill tone="blue">UX demo</StatusPill>
        <h1 className="mt-5 text-3xl font-bold text-navy-950">{campaign.title}</h1>
        <p className="mt-3 text-slate-600">{campaign.description}</p>
        <dl className="mt-6 grid gap-3 text-sm">
          <div className="rounded-2xl bg-slate-50 p-4"><dt className="font-semibold text-slate-500">Network</dt><dd className="mt-1 text-navy-950">{campaign.network}</dd></div>
          <div className="rounded-2xl bg-slate-50 p-4"><dt className="font-semibold text-slate-500">Sponsor mode</dt><dd className="mt-1 text-navy-950">{campaign.sponsorMode}</dd></div>
          <div className="rounded-2xl bg-slate-50 p-4"><dt className="font-semibold text-slate-500">Asset type</dt><dd className="mt-1 text-navy-950">{campaign.assetType}</dd></div>
        </dl>
        <form onSubmit={submit} className="mt-6 grid gap-4">
          <label className="grid gap-2"><span className="label">Email address</span><input className="input" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" /></label>
          <button className="button-primary" type="submit">Claim Demo Badge</button>
        </form>
      </section>
      <WalletConnectPanel onWallet={setWallet} />
    </div>
  );
}
