import { StatsCard } from "./stats-card"
import { DailyMintLog } from "./daily-mint-log"
import { StateLeaderboard } from "./state-leaderboard"
import type { DashboardContent } from "@/lib/types"

interface StatsDashboardProps {
  content: DashboardContent
}

export function StatsDashboard({ content }: StatsDashboardProps) {
  return (
    <section id="dashboard" className="w-full bg-muted/50 px-4 py-12 sm:px-6 lg:px-12 lg:py-16 xl:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {/* Real-Time Well Plugging Data */}
          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm sm:col-span-2 lg:col-span-3 lg:row-span-2">
            <p className="mb-1 text-[11px] font-black uppercase leading-tight tracking-[0.18em] text-primary/70">
              Real-Time Well
            </p>
            <p className="mb-5 text-[11px] font-black uppercase leading-tight tracking-[0.18em] text-primary/70">
              Plugging Data
            </p>

            <div className="flex flex-col">
              <p className="mb-3 text-sm font-bold text-foreground">Historical Plugging Trend</p>
              <div className="mb-2 flex h-24 items-end gap-1 rounded-xl bg-muted/35 px-3 pb-3 pt-4 sm:h-28 lg:h-24">
                {content.pluggingTrend.trendData.slice(0, 8).map((item, index) => {
                  const maxValue = Math.max(...content.pluggingTrend.trendData.map((d) => d.value))
                  return (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-[hsl(152,50%,70%)]"
                      style={{ height: `${(item.value / maxValue) * 100}%` }}
                    />
                  )
                })}
              </div>
              <p className="mb-7 text-center text-xs text-muted-foreground">Last 30 Days</p>

              <div className="border-t border-border/70 pt-5">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground">Daily Mint Log</p>
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <div className="space-y-2">
                  {content.pluggingTrend.mintLogEntries.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.date}</span>
                      <span className="flex items-center gap-1 font-bold text-foreground">
                        {item.wells}
                        <svg className="h-3 w-3 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-5 rounded-xl bg-muted/30 p-3 text-[0.68rem] leading-5 text-muted-foreground">
                  {content.pluggingTrend.dataSource}
                </p>
              </div>
            </div>
          </div>

          {content.statsCards.map((card, index) => (
            <div key={index} className="lg:col-span-3">
              <StatsCard {...card} />
            </div>
          ))}

          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm lg:col-span-3">
            <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-primary/70">{content.tokensCard.title}</p>
            <p className="text-4xl font-black tracking-tight text-primary lg:text-5xl">{content.tokensCard.value}</p>
            <div className="mt-4 flex items-start gap-2">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary">
                <span className="text-[10px] font-black text-primary">C</span>
              </div>
              <p className="text-xs leading-5 text-muted-foreground">{content.tokensCard.subtitle}</p>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-5">
            <DailyMintLog content={content.dailyMintLog} />
          </div>

          <div className="sm:col-span-2 lg:col-span-4">
            <StateLeaderboard content={content.stateLeaderboard} />
          </div>
        </div>
      </div>
    </section>
  )
}
