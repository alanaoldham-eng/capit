import Link from "next/link";
import StatusPill from "./StatusPill";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(36,107,254,0.42),transparent_30rem),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.12),transparent_24rem)]" />
      <div className="container-page relative grid gap-12 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <StatusPill tone="blue">Cardano-native v001 UX demo</StatusPill>
          <h1 className="mt-6 max-w-4xl text-5xl font-bold tracking-tight sm:text-6xl">Email-first onboarding for Cardano dApps</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-100">Let crypto-newbie users claim assets, join communities, and use Cardano apps without touching seed phrases on day one.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link className="button-primary" href="/passport">Try Cardano Passport</Link>
            <Link className="button-secondary" href="/dashboard">Open Project Dashboard</Link>
          </div>
        </div>
        <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur">
          <div className="rounded-3xl bg-white p-6 text-navy-900">
            <p className="text-sm font-semibold text-cardano-600">Claim preview</p>
            <h2 className="mt-3 text-2xl font-bold">Founders Badge</h2>
            <p className="mt-2 text-slate-600">Email profile, optional wallet connection, local claim record, and a transparent path to future Cardano minting.</p>
            <div className="mt-6 grid gap-3">
              {['Email profile created', 'CIP-30 wallet supported', 'Mock sponsor quote ready', 'Production minting coming in v002'].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 p-4 text-sm font-medium">{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
