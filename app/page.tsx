import { BadgeCheck, Code2, CreditCard, Link2, Mail, Wallet } from "lucide-react";
import ArchitectureCard from "@/components/ArchitectureCard";
import FeatureCard from "@/components/FeatureCard";
import Hero from "@/components/Hero";
import StatusPill from "@/components/StatusPill";

const features = [
  { icon: Mail, title: "Email onboarding", description: "Start with a familiar profile flow before introducing wallet concepts." },
  { icon: Wallet, title: "CIP-30 wallet connect", description: "Connect existing Cardano browser wallets through Mesh SDK in client-only UI." },
  { icon: CreditCard, title: "Sponsored transaction UX", description: "Show fee support and sponsor expectations without pretending v001 submits transactions." },
  { icon: BadgeCheck, title: "Native Cardano assets", description: "Model badges, passes, and rewards as Cardano-native concepts for future minting." },
  { icon: Link2, title: "Claim links and QR drops", description: "Create shareable claim pages today, with QR generation planned for v002." },
  { icon: Code2, title: "Developer APIs coming soon", description: "Clean service boundaries for future AuthKit, ClaimKit, WalletKit, GasStation, and AssetKit." },
];

const architecture = [
  ["1", "User signs in with email", "A plain-language profile starts the journey without seed phrases."],
  ["2", "User connects or later creates Cardano wallet", "v001 supports existing CIP-30 wallets. Embedded wallets are a v002 research track."],
  ["3", "Project sponsors claim", "The interface explains a sponsored claim with a mock quote only."],
  ["4", "User receives badge/pass", "Claims are stored locally as badge concepts until production minting exists."],
  ["5", "Developer uses SDK/API", "Docs preview future SDK calls and honest backend requirements."],
];

export default function Home() {
  return (
    <>
      <Hero />
      <section className="container-page py-20">
        <div className="max-w-3xl"><StatusPill tone="blue">Platform layer</StatusPill><h2 className="mt-4 text-3xl font-bold text-navy-950">Built for Cardano onboarding moments</h2><p className="mt-3 text-slate-600">Cardano OnboardKit gives dApps a clearer path for inviting mainstream users into claims, communities, and rewards.</p></div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}</div>
      </section>
      <section className="bg-white py-20">
        <div className="container-page">
          <div className="max-w-3xl"><StatusPill tone="slate">Architecture</StatusPill><h2 className="mt-4 text-3xl font-bold text-navy-950">A simple path from email to Cardano-native rewards</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">{architecture.map(([step, title, description]) => <ArchitectureCard key={step} step={step} title={title} description={description} />)}</div>
        </div>
      </section>
      <section className="container-page py-20">
        <div className="card grid gap-8 p-8 lg:grid-cols-2">
          <div><StatusPill tone="green">What works now</StatusPill><ul className="mt-5 space-y-3 text-slate-700"><li>Email profile stored locally</li><li>CIP-30 wallet connection panel</li><li>Local claim and badge records</li><li>Dashboard campaign mock and CSV export</li></ul></div>
          <div><StatusPill tone="amber">What is scaffolded</StatusPill><ul className="mt-5 space-y-3 text-slate-700"><li>Embedded email/passkey wallets</li><li>Sponsored transaction submission</li><li>Native asset minting and delivery</li><li>Production backend, auth, rate limits, and API keys</li></ul></div>
        </div>
      </section>
    </>
  );
}
