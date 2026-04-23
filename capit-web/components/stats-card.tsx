import type { StatsCardContent } from "@/lib/types"

export function StatsCard({ title, value, subtitle }: StatsCardContent) {
  return (
    <div className="h-full rounded-[24px] border border-border/70 bg-card p-6 shadow-[0_18px_40px_rgba(15,56,41,0.05)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_46px_rgba(15,56,41,0.08)]">
      <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      <p className="mb-3 text-4xl font-black leading-none tracking-[-0.04em] text-primary lg:text-[56px]">{value}</p>
      <p className="text-sm font-medium text-muted-foreground">{subtitle}</p>
    </div>
  )
}
