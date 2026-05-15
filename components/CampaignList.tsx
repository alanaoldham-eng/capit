"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Campaign, ClaimRecord } from "@/lib/types";
import { getClaims } from "@/lib/localStorage";

function makeCsv(claims: ClaimRecord[]) {
  const header = ["id", "campaignSlug", "email", "walletAddress", "claimedAt", "status"];
  const rows = claims.map((claim) => header.map((key) => JSON.stringify(String(claim[key as keyof ClaimRecord] || ""))).join(","));
  return [header.join(","), ...rows].join("\n");
}

export default function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
  const [copied, setCopied] = useState<string | null>(null);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000");
  const claims = useMemo(() => getClaims(), []);

  async function copyLink(slug: string) {
    const url = `${appUrl}/claim/${slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(slug);
  }

  function exportCsv() {
    const blob = new Blob([makeCsv(getClaims())], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "cardano-onboardkit-claims.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm font-semibold text-cardano-600">Campaigns</p><h2 className="mt-2 text-2xl font-bold text-navy-950">Claim links</h2></div><button onClick={exportCsv} className="button-secondary">Export CSV</button></div>
      <p className="mt-3 text-sm text-slate-600">CSV exports {claims.length} local claim records from this browser.</p>
      <div className="mt-6 grid gap-4">
        {campaigns.map((campaign) => (
          <article key={campaign.slug} className="rounded-3xl border border-slate-200 p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div><h3 className="font-bold text-navy-950">{campaign.title}</h3><p className="mt-1 text-sm text-slate-600">{campaign.description}</p><p className="mt-3 text-sm font-medium text-cardano-600">/claim/{campaign.slug}</p><p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">QR code coming in v002</p></div>
              <div className="flex flex-wrap gap-2"><Link className="button-secondary" href={`/claim/${campaign.slug}`}>Open</Link><button className="button-primary" onClick={() => copyLink(campaign.slug)}>{copied === campaign.slug ? "Copied" : "Copy claim link"}</button></div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
