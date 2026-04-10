import type { StatsCardContent } from "@/lib/types"

export function StatsCard({ title, value, subtitle }: StatsCardContent) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border/60 h-full hover:shadow-md transition-shadow duration-200">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2">{title}</p>
      <p className="text-4xl lg:text-5xl font-bold text-primary tracking-tight leading-none mb-3">{value}</p>
      <p className="text-xs text-muted-foreground font-medium">{subtitle}</p>
    </div>
  )
}
