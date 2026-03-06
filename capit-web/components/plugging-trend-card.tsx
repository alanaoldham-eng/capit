import type { PluggingTrendContent } from "@/lib/types"

interface PluggingTrendCardProps {
  content: PluggingTrendContent
}

export function PluggingTrendCard({ content }: PluggingTrendCardProps) {
  const maxValue = Math.max(...content.trendData.map((d) => d.value))

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border h-full flex flex-col">
      <p className="text-sm font-semibold text-foreground mb-4">
        {content.chartTitle}
      </p>

      {/* Bar chart */}
      <div className="flex items-end gap-1 h-24 mb-2" role="img" aria-label={content.chartTitle}>
        {content.trendData.map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-secondary/70 rounded-t transition-all hover:bg-secondary"
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mb-4">
        {content.chartSubtitle}
      </p>

      {/* Daily Mint Log Mini Section */}
      <div className="border-t border-border pt-4 flex-grow">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold text-foreground">
            {content.mintLogTitle}
          </p>
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground p-1"
            aria-label="View mint log options"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="space-y-1.5">
          {content.mintLogEntries.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-muted-foreground">{item.date}</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                {item.wells}
                <svg
                  className="w-3 h-3 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground mt-4">
          {content.dataSource}
        </p>
      </div>
    </div>
  )
}
