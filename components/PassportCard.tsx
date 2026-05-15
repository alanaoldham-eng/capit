import { shortenAddress } from "@/lib/cardano";
import type { Badge, UserProfile, WalletConnectionState } from "@/lib/types";
import StatusPill from "./StatusPill";

export default function PassportCard({ profile, wallet, badges }: { profile: UserProfile | null; wallet: WalletConnectionState | null; badges: Badge[] }) {
  return (
    <section className="card overflow-hidden">
      <div className="bg-navy-950 p-6 text-white">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-blue-100">Cardano Passport</p>
          <StatusPill tone="blue">UX demo</StatusPill>
        </div>
        <h2 className="mt-8 text-3xl font-bold">{profile?.displayName || "New Passport Holder"}</h2>
        <p className="mt-2 text-blue-100">{profile?.email || "Create an email profile to begin"}</p>
      </div>
      <div className="grid gap-4 p-6">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Wallet</p>
          <p className="mt-2 break-all text-sm font-medium text-navy-950">{shortenAddress(wallet?.rewardAddress || wallet?.address)}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Collected badges</p>
          <p className="mt-2 text-3xl font-bold text-navy-950">{badges.length}</p>
        </div>
        <div className="grid gap-3">
          {badges.length === 0 ? <p className="text-sm text-slate-600">Claim your first demo badge to see it here.</p> : badges.map((badge) => (
            <div key={badge.id} className="rounded-2xl border border-slate-200 p-4">
              <p className="font-semibold text-navy-950">{badge.title}</p>
              <p className="mt-1 text-sm text-slate-600">Local claim record</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
