"use client";

import { useState } from "react";
import type { Campaign } from "@/lib/types";

export default function CampaignForm({ onCreate }: { onCreate: (campaign: Campaign) => void }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sponsorFees, setSponsorFees] = useState(true);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    onCreate({
      name,
      slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      title,
      description,
      sponsorFees,
      network: "Cardano Preprod Demo",
      sponsorMode: sponsorFees ? "Platform sponsored UX demo" : "User pays fees in future production flow",
      assetType: "Native Cardano Badge Concept",
      createdAt: new Date().toISOString(),
    });
    setName(""); setSlug(""); setTitle(""); setDescription(""); setSponsorFees(true);
  }

  return (
    <section className="card p-6">
      <p className="text-sm font-semibold text-cardano-600">Create campaign</p>
      <h2 className="mt-2 text-2xl font-bold text-navy-950">Demo claim campaign</h2>
      <form onSubmit={submit} className="mt-6 grid gap-4">
        <label className="grid gap-2"><span className="label">Campaign name</span><input className="input" required value={name} onChange={(event) => setName(event.target.value)} /></label>
        <label className="grid gap-2"><span className="label">Slug</span><input className="input" required value={slug} onChange={(event) => setSlug(event.target.value)} placeholder="community-badge" /></label>
        <label className="grid gap-2"><span className="label">Badge title</span><input className="input" required value={title} onChange={(event) => setTitle(event.target.value)} /></label>
        <label className="grid gap-2"><span className="label">Description</span><textarea className="input min-h-28" required value={description} onChange={(event) => setDescription(event.target.value)} /></label>
        <label className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 text-sm font-medium text-slate-700"><input type="checkbox" checked={sponsorFees} onChange={(event) => setSponsorFees(event.target.checked)} /> Sponsor fees in UX demo</label>
        <button className="button-primary" type="submit">Create demo campaign</button>
      </form>
    </section>
  );
}
