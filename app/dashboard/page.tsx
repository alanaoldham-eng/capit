"use client";

import { useEffect, useMemo, useState } from "react";
import CampaignForm from "@/components/CampaignForm";
import CampaignList from "@/components/CampaignList";
import StatusPill from "@/components/StatusPill";
import { getClaims, getCustomCampaigns, saveCustomCampaigns } from "@/lib/localStorage";
import { mockCampaigns } from "@/lib/mockCampaigns";
import type { Campaign, ClaimRecord } from "@/lib/types";

export default function DashboardPage() {
  const [customCampaigns, setCustomCampaigns] = useState<Campaign[]>([]);
  const [claims, setClaims] = useState<ClaimRecord[]>([]);

  useEffect(() => {
    setCustomCampaigns(getCustomCampaigns());
    setClaims(getClaims());
  }, []);

  const campaigns = useMemo(() => [...mockCampaigns, ...customCampaigns], [customCampaigns]);

  function createCampaign(campaign: Campaign) {
    const next = [campaign, ...customCampaigns.filter((item) => item.slug !== campaign.slug)];
    setCustomCampaigns(next);
    saveCustomCampaigns(next);
  }

  const stats = [
    ["Claims created", campaigns.length.toString()],
    ["Claims completed", claims.length.toString()],
    ["Sponsor tank status", "Mock only"],
    ["Active campaigns", campaigns.length.toString()],
  ];

  return (
    <div className="container-page py-12">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><StatusPill tone="blue">Project dashboard demo</StatusPill><h1 className="mt-4 text-4xl font-bold text-navy-950">Claim campaign workspace</h1><p className="mt-3 max-w-2xl text-slate-600">Create local demo campaigns, share claim links, and export browser-stored claim records. No database is used in v001.</p></div></div>
      <div className="mb-8 grid gap-4 md:grid-cols-4">{stats.map(([label, value]) => <div key={label} className="card p-5"><p className="text-sm text-slate-500">{label}</p><p className="mt-2 text-2xl font-bold text-navy-950">{value}</p></div>)}</div>
      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]"><CampaignForm onCreate={createCampaign} /><CampaignList campaigns={campaigns} /></div>
    </div>
  );
}
