"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import type { DailyMintLogContent } from "@/lib/types"

interface DailyMintLogProps {
  content: DailyMintLogContent
}

export function DailyMintLog({ content }: DailyMintLogProps) {
  return (
    <div className="flex h-full flex-col rounded-[24px] border border-border/70 bg-card p-5 shadow-[0_18px_40px_rgba(15,56,41,0.05)] lg:p-6">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h3 className="text-xl font-black tracking-[-0.03em] text-foreground">{content.title}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="text-xs font-semibold uppercase tracking-[0.14em]">{content.currentDate}</span>
          <div className="flex items-center gap-0.5 rounded-full bg-muted/70 p-0.5">
            <button type="button" className="rounded-full p-1.5 transition-colors hover:bg-card" aria-label="Previous date">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" className="rounded-full p-1.5 transition-colors hover:bg-card" aria-label="Next date">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow divide-y divide-border/70">
        {content.entries.map((entry, index) => (
          <div key={index} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
            <div className="flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-[hsl(152,50%,55%)]" aria-hidden="true" />
              <span className="text-sm text-muted-foreground">{entry.date}</span>
            </div>
            <span className="text-sm font-black text-foreground">{entry.wells} wells</span>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-border/70 pt-4">
        <div className="flex flex-wrap items-center gap-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-black text-primary">
              C
            </span>
            <span className="font-semibold text-foreground">{content.footer.brandLabel}</span>
          </div>
          <span className="text-muted-foreground/70">{content.footer.recordsUrl}</span>
        </div>
      </div>
    </div>
  )
}
