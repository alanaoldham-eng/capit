import Link from "next/link"
import { BarChart3, ArrowRight } from "lucide-react"
import type { StateLeaderboardContent } from "@/lib/types"

interface StateLeaderboardProps {
  content: StateLeaderboardContent
}

export function StateLeaderboard({ content }: StateLeaderboardProps) {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        {content.title}
      </h3>

      <div className="space-y-4">
        {content.entries.map((item) => (
          <div
            key={item.rank}
            className="flex items-center justify-between py-2"
          >
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-primary w-6">
                {item.rank}
              </span>
              <span className="font-semibold text-foreground text-lg">
                {item.state}
              </span>
              <span className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                {item.flag}
              </span>
            </div>
            <span className="text-xl font-bold text-foreground">
              {item.wells.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

      <Link
        href={content.viewAllButton.href}
        className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        <BarChart3 className="w-4 h-4" aria-hidden="true" />
        {content.viewAllButton.label}
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        {content.dataSourceNote}
      </p>
    </div>
  )
}
