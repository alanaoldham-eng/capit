'use client'

import React from "react"
import Link from "next/link"
import { BarChart3, ArrowRight } from "lucide-react"
import type { StateLeaderboardContent, StateLeaderboardItem } from "@/lib/types"

interface StateLeaderboardProps {
  content?: StateLeaderboardContent
}

export function StateLeaderboard({ content }: StateLeaderboardProps) {
  const title = content?.title || "STATE LEADERBOARD - 2026"
  const entries: StateLeaderboardItem[] = content?.entries || content?.items || []
  const viewAllHref = content?.viewAllButton?.href || "/states"
  const viewAllLabel = typeof content?.viewAllButton?.label === "string" ? content.viewAllButton.label : "View All States"

  return (
    <div className="bg-card rounded-xl p-5 lg:p-6 shadow-sm border border-border h-full flex flex-col">
      <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-5">
        {title}
      </h3>

      <div className="space-y-5 flex-grow">
        {entries.map((item: StateLeaderboardItem, index: number) => (
          <div
            key={item.rank || index}
            className="flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="text-base font-bold text-primary w-4">
                {item.rank || index + 1}
              </span>
              <span className="font-bold text-foreground text-lg">
                {item.state}
              </span>
              {item.flag && (
                <span className="text-base">
                  {typeof item.flag === 'string' ? item.flag : ""}
                </span>
              )}
            </div>
            <span className="text-xl font-bold text-foreground tabular-nums">
              {typeof item.wells === 'number' ? item.wells.toLocaleString() : item.wells || 0}
            </span>
          </div>
        ))}
      </div>

      <Link
        href={viewAllHref}
        className="w-full mt-6 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3.5 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm"
      >
        <BarChart3 className="w-4 h-4" aria-hidden="true" />
        {viewAllLabel}
        <ArrowRight className="w-4 h-4" aria-hidden="true" />
      </Link>

      {content?.dataSourceNote && (
        <p className="text-[10px] text-muted-foreground mt-4 text-center">
          {typeof content.dataSourceNote === 'string' ? content.dataSourceNote : ""}
        </p>
      )}
    </div>
  )
}

export default StateLeaderboard