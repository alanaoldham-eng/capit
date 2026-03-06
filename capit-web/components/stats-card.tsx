interface StatsCardProps {
  title: string
  value: string
  subtitle: string
  icon?: React.ReactNode
}

export function StatsCard({ title, value, subtitle, icon }: StatsCardProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <p className="text-sm font-medium text-muted-foreground mb-2">{title}</p>
      <div className="flex items-center gap-2">
        {icon && <span className="text-secondary">{icon}</span>}
        <p className="text-3xl md:text-4xl font-bold text-primary">{value}</p>
      </div>
      <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
    </div>
  )
}
