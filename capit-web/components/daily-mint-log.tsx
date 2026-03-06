"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import type { DailyMintLogContent } from "@/lib/types"

interface DailyMintLogProps {
  content: DailyMintLogContent
}

export function DailyMintLog({ content }: DailyMintLogProps) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-sm border border-border h-full">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-foreground">{content.title}</h3>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="text-xs">{content.currentDate}</span>
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              className="p-1 hover:bg-muted rounded transition-colors"
              aria-label="Previous date"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="p-1 hover:bg-muted rounded transition-colors"
              aria-label="Next date"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-0">
        {content.entries.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-3 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">{entry.date}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {entry.wells} wells
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-4 bg-secondary rounded flex items-center justify-center text-primary font-bold text-[10px]">
              C
            </span>
            <span>{content.footer.brandLabel}</span>
          </div>
          <span className="text-muted-foreground/70">{content.footer.recordsUrl}</span>
        </div>
      </div>
    </div>
  )
}
