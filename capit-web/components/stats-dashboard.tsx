import { StatsCard } from "./stats-card"
import { DailyMintLog } from "./daily-mint-log"
import { StateLeaderboard } from "./state-leaderboard"
import type { DashboardContent } from "@/lib/types"

interface StatsDashboardProps {
  content: DashboardContent
}

export function StatsDashboard({ content }: StatsDashboardProps) {
  return (
    <section id="dashboard" className="w-full py-10 lg:py-14 px-6 lg:px-12 xl:px-20 bg-muted/50">
      <div className="max-w-7xl mx-auto">
        {/* Top Row - Asymmetric 4 Column Grid matching mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5 mb-4 lg:mb-5">
          {/* Real-Time Well Plugging Data - Tall left card with mini chart */}
          <div className="lg:col-span-3 lg:row-span-2 bg-card rounded-xl p-5 shadow-sm border border-border flex flex-col">
            <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground leading-tight mb-1">
              Real-Time Well
            </p>
            <p className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground leading-tight mb-4">
              Plugging Data
            </p>
            
            {/* Mini trend preview */}
            <div className="flex-1 flex flex-col">
              <p className="text-xs font-semibold text-foreground mb-2">Historical Plugging Trend</p>
              <div className="flex items-end gap-0.5 h-16 mb-1.5">
                {content.pluggingTrend.trendData.slice(0, 8).map((item, index) => {
                  const maxValue = Math.max(...content.pluggingTrend.trendData.map(d => d.value))
                  return (
                    <div
                      key={index}
                      className="flex-1 bg-[hsl(152,50%,70%)] rounded-t"
                      style={{ height: `${(item.value / maxValue) * 100}%` }}
                    />
                  )
                })}
              </div>
              <p className="text-[10px] text-muted-foreground text-center mb-4">Last 30 Days</p>
              
              {/* Mini mint log inside */}
              <div className="border-t border-border pt-3 mt-auto">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-semibold text-foreground">Daily Mint Log</p>
                  <svg className="w-3.5 h-3.5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </div>
                <div className="space-y-1">
                  {content.pluggingTrend.mintLogEntries.slice(0, 4).map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-[10px]">
                      <span className="text-muted-foreground">{item.date}</span>
                      <span className="font-medium text-foreground flex items-center gap-0.5">
                        {item.wells}
                        <svg className="w-2.5 h-2.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-[9px] text-muted-foreground mt-3">{content.pluggingTrend.dataSource}</p>
              </div>
            </div>
          </div>

          {/* Stats Cards - Two in the middle */}
          {content.statsCards.map((card, index) => (
            <div key={index} className="lg:col-span-3">
              <StatsCard {...card} />
            </div>
          ))}

          {/* CAPIT Tokens Card - Right side */}
          <div className="lg:col-span-3 bg-card rounded-xl p-5 shadow-sm border border-border">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {content.tokensCard.title}
            </p>
            <p className="text-3xl lg:text-4xl font-bold text-primary tracking-tight">
              {content.tokensCard.value}
            </p>
            <div className="flex items-center gap-2 mt-3">
              <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">C</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {content.tokensCard.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row - Daily Mint Log + State Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
          {/* Spacer for alignment with top row's left card */}
          <div className="hidden lg:block lg:col-span-3" aria-hidden="true" />

          {/* Middle - Daily Mint Log */}
          <div className="lg:col-span-5">
            <DailyMintLog content={content.dailyMintLog} />
          </div>

          {/* Right - State Leaderboard */}
          <div className="lg:col-span-4">
            <StateLeaderboard content={content.stateLeaderboard} />
          </div>
        </div>
      </div>
    </section>
  )
}
