import type { StatsCardContent } from "@/lib/types"

export function StatsCard({ title, value, subtitle }: StatsCardContent) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border h-full">
      <p className="text-sm font-medium text-muted-foreground mb-1.5">{title}</p>
      <p className="text-3xl lg:text-4xl font-bold text-primary tracking-tight leading-none">{value}</p>
      <p className="text-xs text-muted-foreground mt-2">{subtitle}</p>
    </div>
  )
}
