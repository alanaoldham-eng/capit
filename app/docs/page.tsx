import StatusPill from "@/components/StatusPill";

const kits = [
  ["WalletKit", "CIP-30 connection now; embedded/passkey wallet research later."],
  ["GasStation", "Mock sponsored transaction quotes now; controlled sponsor wallets later."],
  ["ClaimKit", "Claim links and local records now; backend claim lifecycle later."],
  ["AssetKit", "Badge/pass concepts now; preprod native asset minting later."],
  ["AuthKit", "Email profile UX now; project auth and user sessions later."],
];

export default function DocsPage() {
  return (
    <div className="container-page py-12">
      <div className="max-w-3xl"><StatusPill tone="slate">Developer docs</StatusPill><h1 className="mt-4 text-4xl font-bold text-navy-950">Cardano OnboardKit v001 architecture</h1><p className="mt-4 text-slate-600">Cardano OnboardKit is a Cardano-native onboarding layer for dApps that want easier email-first claims, wallet connection, sponsor messaging, and badge/pass flows.</p></div>
      <section className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{kits.map(([title, description]) => <div key={title} className="card p-5"><h2 className="font-bold text-navy-950">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></div>)}</section>
      <section className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card p-6"><StatusPill tone="green">Real in v001</StatusPill><ul className="mt-5 space-y-3 text-slate-700"><li>Next.js App Router prototype</li><li>Email profile saved in localStorage</li><li>Mesh SDK CIP-30 wallet connection component</li><li>Local campaign and claim records</li><li>Mock API routes for health, claims, and sponsor quotes</li></ul></div>
        <div className="card p-6"><StatusPill tone="amber">Scaffolded</StatusPill><ul className="mt-5 space-y-3 text-slate-700"><li>No server-side key custody</li><li>No production embedded wallet</li><li>No real sponsored transaction submission</li><li>No production minting or asset transfer</li><li>No database, billing, API keys, or rate limits</li></ul></div>
      </section>
      <section className="mt-10 card p-6"><h2 className="text-2xl font-bold text-navy-950">Example future SDK calls</h2><pre className="mt-5 overflow-x-auto rounded-2xl bg-navy-950 p-5 text-sm text-blue-100"><code>{`const user = await onboardkit.users.getOrCreate({ email });

const campaign = await onboardkit.claims.create({
  slug: "founders-badge",
  assetType: "native-cardano-badge",
});

const tx = await onboardkit.gas.submitSponsoredTransaction({
  userId: user.id,
  campaignId: campaign.id,
});`}</code></pre></section>
      <section className="mt-10 card p-6"><h2 className="text-2xl font-bold text-navy-950">v002 roadmap</h2><p className="mt-3 text-slate-600">Next priorities are a real backend database, passkey-based embedded wallet research, Blockfrost or Maestro integration, preprod native asset minting, QR codes, project auth, and abuse prevention.</p></section>
    </div>
  );
}
