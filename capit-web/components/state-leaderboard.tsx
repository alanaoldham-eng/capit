"use client"

import { BarChart3, ArrowRight } from "lucide-react"

const leaderboardData = [
  { rank: 1, state: "Texas", flag: "TX", wells: 1342 },
  { rank: 2, state: "Pennsylvania", flag: "PA", wells: 987 },
  { rank: 3, state: "Oklahoma", flag: "OK", wells: 742 },
]

export function StateLeaderboard() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
        State Leaderboard
      </h3>

      <div className="space-y-4">
        {leaderboardData.map((item) => (
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

      <button className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
        <BarChart3 className="w-4 h-4" />
        View All States
        <ArrowRight className="w-4 h-4" />
      </button>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Data updates - daily - from data.gov
      </p>
    </div>
  )
}
