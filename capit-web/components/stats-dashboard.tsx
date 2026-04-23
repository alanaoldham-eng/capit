import { StatsCard } from "./stats-card"
import { DailyMintLog } from "./daily-mint-log"
import { StateLeaderboard } from "./state-leaderboard"
import type { DashboardContent } from "@/lib/types"

interface StatsDashboardProps {
  content: DashboardContent
}

export function StatsDashboard({ content }: StatsDashboardProps) {
  const trendMaxValue = Math.max(...content.pluggingTrend.trendData.map((d) => d.value))

  return (
    <section id="dashboard" className="w-full bg-[#ECEAE1] px-6 py-14 lg:px-12 lg:py-16 xl:px-16 xl:py-20">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:auto-rows-[minmax(190px,auto)]">
          <div className="rounded-[24px] border border-border/70 bg-card p-5 shadow-[0_18px_40px_rgba(15,56,41,0.05)] lg:col-span-3 lg:row-span-2 lg:min-h-[410px]">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
              {content.pluggingTrend.sectionTitle[0]}
            </p>
            <p className="mb-5 text-[11px] font-black uppercase tracking-[0.18em] text-muted-foreground">
              {content.pluggingTrend.sectionTitle[1]}
            </p>

            <div className="flex h-full flex-col">
              <p className="mb-3 text-sm font-bold text-foreground">{content.pluggingTrend.chartTitle}</p>
              <div className="mb-2 flex h-24 items-end gap-1.5 rounded-2xl bg-[#F8F7F2] px-3 py-3">
                {content.pluggingTrend.trendData.map((item, index) => (
                  <div
                    key={index}
                    className="flex-1 rounded-t-md bg-[hsl(152,48%,72%)]"
                    style={{ height: `${(item.value / trendMaxValue) * 100}%` }}
                  />
                ))}
              </div>
              <p className="mb-5 text-center text-[11px] text-muted-foreground">{content.pluggingTrend.chartSubtitle}</p>

              <div className="mt-auto border-t border-border/70 pt-4">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-bold text-foreground">{content.pluggingTrend.mintLogTitle}</p>
                  <svg className="h-4 w-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <div className="space-y-1.5">
                  {content.pluggingTrend.mintLogEntries.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.date}</span>
                      <span className="font-bold text-foreground">{item.wells}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-[10px] text-muted-foreground">{content.pluggingTrend.dataSource}</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3 lg:min-h-[190px]">
            <StatsCard {...content.statsCards[0]} />
          </div>

          <div className="lg:col-span-3 lg:min-h-[190px]">
            <StatsCard {...content.statsCards[1]} />
          </div>

          <div className="rounded-[24px] border border-border/70 bg-card p-6 shadow-[0_18px_40px_rgba(15,56,41,0.05)] lg:col-span-3 lg:min-h-[190px]">
            <p className="mb-2 text-sm font-semibold text-muted-foreground">{content.tokensCard.title}</p>
            <p className="text-4xl font-black tracking-[-0.04em] text-primary lg:text-[56px]">{content.tokensCard.value}</p>
            <div className="mt-3 flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-[11px] font-black text-primary">C</div>
              <p className="text-xs text-muted-foreground">{content.tokensCard.subtitle}</p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:col-start-4 lg:min-h-[300px]">
            <DailyMintLog content={content.dailyMintLog} />
          </div>

          <div className="lg:col-span-4 lg:min-h-[300px]">
            <StateLeaderboard content={content.stateLeaderboard} />
          </div>
        </div>
      </div>
    </section>
  )
}
