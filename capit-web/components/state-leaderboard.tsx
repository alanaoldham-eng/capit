import Link from "next/link"
import { BarChart3, ArrowRight } from "lucide-react"
import type { StateLeaderboardContent } from "@/lib/types"

interface StateLeaderboardProps {
  content: StateLeaderboardContent
}

export function StateLeaderboard({ content }: StateLeaderboardProps) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border h-full flex flex-col">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-5">
        {content.title}
      </h3>

      <div className="space-y-4 flex-grow">
        {content.entries.map((item) => (
          <div
            key={item.rank}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-primary w-5">
                {item.rank}
              </span>
              <span className="font-semibold text-foreground text-lg">
                {item.state}
              </span>
              <span className="text-sm text-muted-foreground">
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
        className="w-full mt-5 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
      >
        <BarChart3 className="w-4 h-4" aria-hidden="true" />
        {content.viewAllButton.label}
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>

      <p className="text-[10px] text-muted-foreground mt-4 text-center">
        {content.dataSourceNote}
      </p>
    </div>
  )
}
