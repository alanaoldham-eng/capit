import { StatsCard } from "./stats-card"
import { PluggingTrendCard } from "./plugging-trend-card"
import { DailyMintLog } from "./daily-mint-log"
import { StateLeaderboard } from "./state-leaderboard"

export function StatsDashboard() {
  return (
    <section className="w-full py-12 px-6 lg:px-12 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Left column - Plugging Trend */}
          <div className="md:col-span-1">
            <PluggingTrendCard />
          </div>

          {/* Stats Cards */}
          <div className="md:col-span-1 space-y-6">
            <StatsCard
              title="Wells Plugged"
              value="1,327"
              subtitle="Total Historically plugged"
            />
            <StatsCard
              title="Wells Plugged"
              value="674"
              subtitle="Wells plugged this month"
            />
          </div>

          {/* CAPIT Tokens Card */}
          <div className="md:col-span-1">
            <div className="bg-card rounded-xl p-6 shadow-sm border border-border h-full">
              <p className="text-sm font-medium text-muted-foreground mb-2">
                CAPIT Tokens Minted
              </p>
              <p className="text-3xl md:text-4xl font-bold text-primary">
                1,327,843
              </p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">C</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Total CAPIT minted
                </p>
              </div>
            </div>
          </div>

          {/* Daily Mint Log */}
          <div className="md:col-span-1">
            <DailyMintLog />
          </div>
        </div>

        {/* State Leaderboard - Full Width */}
        <div className="mt-6">
          <StateLeaderboard />
        </div>
      </div>
    </section>
  )
}
