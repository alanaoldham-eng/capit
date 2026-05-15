export default function ArchitectureCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="relative rounded-3xl border border-slate-200 bg-white p-6">
      <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-sm font-bold text-white">{step}</div>
      <h3 className="text-lg font-bold text-navy-950">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </div>
  );
}
