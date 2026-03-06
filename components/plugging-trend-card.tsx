"use client"

const trendData = [
  { day: 1, value: 15 },
  { day: 5, value: 22 },
  { day: 10, value: 28 },
  { day: 15, value: 35 },
  { day: 20, value: 42 },
  { day: 25, value: 38 },
  { day: 30, value: 45 },
]

const mintLogData = [
  { date: "April 23, 2024", wells: 24 },
  { date: "April 22, 2024", wells: 19 },
  { date: "April 21, 2024", wells: 27 },
  { date: "April 19, 2024", wells: 30 },
]

export function PluggingTrendCard() {
  const maxValue = Math.max(...trendData.map((d) => d.value))

  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <div className="mb-4">
        <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">
          Real-Time Well
        </p>
        <p className="text-xs uppercase tracking-wide font-semibold text-muted-foreground">
          Plugging Data
        </p>
      </div>

      <p className="text-sm font-medium text-foreground mb-3">
        Historical Plugging Trend
      </p>

      {/* Simple bar chart */}
      <div className="flex items-end gap-1 h-24 mb-2">
        {trendData.map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-primary/20 rounded-t"
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mb-4">
        Last 30 Days
      </p>

      {/* Daily Mint Log */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-medium text-foreground">Daily Mint Log</p>
          <button className="text-muted-foreground hover:text-foreground">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className="space-y-2">
          {mintLogData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.date}</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                {item.wells}
                <svg className="w-3 h-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Source: U.S. Department of the Interior
        </p>
      </div>
    </div>
  )
}
