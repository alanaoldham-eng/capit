import Link from "next/link"
import { BarChart3, ArrowRight } from "lucide-react"
import type { StateLeaderboardContent } from "@/lib/types"

interface StateLeaderboardProps {
  content: StateLeaderboardContent
}

export function StateLeaderboard({ content }: StateLeaderboardProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-border/70 bg-card p-5 shadow-[0_18px_40px_rgba(15,56,41,0.05)] lg:p-6">
      <h3 className="mb-5 text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">{content.title}</h3>

      <div className="flex-grow space-y-5">
        {content.entries.map((item) => (
          <div key={item.rank} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-4 text-base font-black text-primary">{item.rank}</span>
              <span className="text-lg font-black tracking-[-0.03em] text-foreground">{item.state}</span>
              <span className="text-sm font-semibold uppercase text-muted-foreground">{item.flag}</span>
            </div>
            <span className="text-xl font-black tabular-nums text-foreground">{item.wells.toLocaleString()}</span>
          </div>
        ))}
      </div>

      <Link
        href={content.viewAllButton.href}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/92"
      >
        <BarChart3 className="h-4 w-4" aria-hidden="true" />
        {content.viewAllButton.label}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>

      <p className="mt-4 text-center text-[10px] text-muted-foreground">{content.dataSourceNote}</p>
    </div>
  )
}
