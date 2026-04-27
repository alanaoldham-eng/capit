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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:auto-rows-fr">
          {/* Real-Time Well Plugging Data - tall left card */}
          <div className="bg-card rounded-2xl border border-border/60 p-5 shadow-sm lg:col-span-3 lg:row-span-2 lg:min-h-[360px]">
            <p className="text-[11px] uppercase tracking-[0.18em] font-black text-primary/70 leading-tight mb-1">
              Real-Time Well
            </p>
            <p className="text-[11px] uppercase tracking-[0.18em] font-black text-primary/70 leading-tight mb-4">
              Plugging Data
            </p>

            <div className="flex h-full flex-col">
              <p className="text-xs font-bold text-foreground mb-2">Historical Plugging Trend</p>
              <div className="flex items-end gap-1 h-20 mb-1.5 rounded-xl bg-muted/35 px-2 pb-2 pt-3">
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
              <p className="text-[10px] text-muted-foreground text-center mb-4">Last 30 Days</p>

              <div className="border-t border-border/70 pt-3 mt-auto">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-xs font-bold text-foreground">Daily Mint Log</p>
                  <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <div className="space-y-1.5">
                  {content.pluggingTrend.mintLogEntries.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">{item.date}</span>
                      <span className="font-bold text-foreground flex items-center gap-0.5">
                        {item.wells}
                        <svg className="w-2.5 h-2.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] leading-4 text-muted-foreground mt-3">{content.pluggingTrend.dataSource}</p>
              </div>
            </div>
          </div>

          {content.statsCards.map((card, index) => (
            <div key={index} className="lg:col-span-3">
              <StatsCard {...card} />
            </div>
          ))}

          <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm lg:col-span-3">
            <p className="mb-1 text-sm font-semibold text-muted-foreground">{content.tokensCard.title}</p>
            <p className="text-3xl font-black tracking-tight text-primary lg:text-4xl">{content.tokensCard.value}</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary">
                <span className="text-[10px] font-black text-primary">C</span>
              </div>
              <p className="text-xs text-muted-foreground">{content.tokensCard.subtitle}</p>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-5 lg:col-start-4">
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
