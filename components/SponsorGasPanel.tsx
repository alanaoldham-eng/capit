import { getMockSponsorQuote } from "@/lib/sponsorService";
import StatusPill from "./StatusPill";

export default function SponsorGasPanel() {
  const quote = getMockSponsorQuote();
  return (
    <section className="card p-6">
      <div className="flex items-center justify-between gap-4"><div><p className="text-sm font-semibold text-cardano-600">Sponsored transaction UX</p><h2 className="mt-2 text-2xl font-bold text-navy-950">Fee support preview</h2></div><StatusPill tone="amber">Mock sponsor quote</StatusPill></div>
      <p className="mt-4 text-sm leading-6 text-slate-600">This panel shows how an app can explain fees before a user claims. v001 does not submit transactions or spend ADA.</p>
      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4"><dt className="text-xs font-semibold uppercase text-slate-500">Estimated fee</dt><dd className="mt-2 text-xl font-bold text-navy-950">{quote.estimatedFeeAda} ADA</dd></div>
        <div className="rounded-2xl bg-slate-50 p-4"><dt className="text-xs font-semibold uppercase text-slate-500">Minimum ADA</dt><dd className="mt-2 text-xl font-bold text-navy-950">{quote.minUtxoAda} ADA</dd></div>
      </dl>
      <p className="mt-4 rounded-2xl bg-blue-50 p-4 text-sm text-blue-800">{quote.note}</p>
    </section>
  );
}
