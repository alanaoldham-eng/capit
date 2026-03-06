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
        {/* Top Row - Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Plugging Trend Header Card */}
          <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
            <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">
              Real-Time Well
            </p>
            <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">
              Plugging Data
            </p>
          </div>

          {/* Stats Cards */}
          {content.statsCards.map((card, index) => (
            <StatsCard key={index} {...card} />
          ))}

          {/* CAPIT Tokens Card */}
          <div className="bg-card rounded-xl p-5 shadow-sm border border-border">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              {content.tokensCard.title}
            </p>
            <p className="text-3xl lg:text-4xl font-bold text-primary">
              {content.tokensCard.value}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-primary">C</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {content.tokensCard.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Row - Charts and Leaderboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Left Column - Plugging Trend */}
          <div className="lg:col-span-3">
            <PluggingTrendCard content={content.pluggingTrend} />
          </div>

          {/* Middle Column - Daily Mint Log */}
          <div className="lg:col-span-5">
            <DailyMintLog content={content.dailyMintLog} />
          </div>

          {/* Right Column - State Leaderboard */}
          <div className="lg:col-span-4">
            <StateLeaderboard content={content.stateLeaderboard} />
          </div>
        </div>
      </div>
    </section>
  )
}
