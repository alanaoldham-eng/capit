import { StatsCard } from "./stats-card"
import { PluggingTrendCard } from "./plugging-trend-card"
import { DailyMintLog } from "./daily-mint-log"
import { StateLeaderboard } from "./state-leaderboard"
import type { DashboardContent } from "@/lib/types"

interface StatsDashboardProps {
  content: DashboardContent
}

export function StatsDashboard({ content }: StatsDashboardProps) {
  return (
    <section id="dashboard" className="w-full py-12 px-6 lg:px-12 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Left column - Plugging Trend */}
          <div className="md:col-span-1">
            <PluggingTrendCard content={content.pluggingTrend} />
          </div>

          {/* Stats Cards */}
          <div className="md:col-span-1 space-y-6">
            {content.statsCards.map((card, index) => (
              <StatsCard key={index} {...card} />
            ))}
          </div>

          {/* CAPIT Tokens Card */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border h-full">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                {content.tokensCard.title}
              </p>
              <p className="text-3xl md:text-4xl font-bold text-primary">
                {content.tokensCard.value}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">C</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {content.tokensCard.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Daily Mint Log */}
          <div className="md:col-span-1">
            <DailyMintLog content={content.dailyMintLog} />
          </div>
        </div>

        {/* State Leaderboard - Full Width */}
        <div className="mt-6">
          <StateLeaderboard content={content.stateLeaderboard} />
        </div>
      </div>
    </section>
  )
}
