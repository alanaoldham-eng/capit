import type { LucideIcon } from "lucide-react";

export default function FeatureCard({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) {
  return (
    <div className="card p-6">
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-cardano-100 text-cardano-600"><Icon size={22} /></div>
      <h3 className="mt-5 text-lg font-bold text-navy-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
