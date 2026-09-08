'use client'

import React from 'react'
import type { PluggingTrendContent, PluggingTrendData, MintLogEntry } from "@/lib/types"

interface PluggingTrendCardProps {
  content?: PluggingTrendContent
}

export function PluggingTrendCard({ content }: PluggingTrendCardProps) {
  const chartTitle = content?.chartTitle || content?.title || "Historical Plugging Trend"
  const trendData: PluggingTrendData[] = content?.trendData || []
  const mintLogEntries: MintLogEntry[] = content?.mintLogEntries || []
  const maxValue = trendData.length > 0 ? Math.max(...trendData.map((d) => d.value), 1) : 1

  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border h-full flex flex-col">
      <p className="text-sm font-semibold text-foreground mb-4">
        {chartTitle}
      </p>

      {/* Bar chart */}
      <div className="flex items-end gap-1 h-24 mb-2" role="img" aria-label={chartTitle}>
        {trendData.map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-secondary/70 rounded-t transition-all hover:bg-secondary"
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          />
        ))}
      </div>

      {content?.chartSubtitle && (
        <p className="text-xs text-muted-foreground text-center mb-4">
          {typeof content.chartSubtitle === 'string' ? content.chartSubtitle : ""}
        </p>
      )}

      {/* Daily Mint Log Mini Section */}
      <div className="border-t border-border pt-4 flex-grow">
        {content?.mintLogTitle && (
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">
              {typeof content.mintLogTitle === 'string' ? content.mintLogTitle : ""}
            </p>
          </div>
        )}
        <div className="space-y-1.5">
          {mintLogEntries.map((item: MintLogEntry, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between text-xs"
            >
              <span className="text-muted-foreground">{item.date}</span>
              <span className="font-medium text-foreground flex items-center gap-1">
                {item.wells}
              </span>
            </div>
          ))}
        </div>
        {content?.dataSource && (
          <p className="text-[10px] text-muted-foreground mt-4">
            {content.dataSource}
          </p>
        )}
      </div>
    </div>
  )
}

export default PluggingTrendCard