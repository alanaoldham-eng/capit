import type { StatsCardContent } from "@/lib/types"

interface StatsCardProps extends StatsCardContent {
  icon?: React.ReactNode
}

export function StatsCard({ title, value, subtitle }: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
      <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
      <p className="text-3xl lg:text-4xl font-bold text-primary">{value}</p>
      <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
    </div>
  )
}
