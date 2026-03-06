"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

const mintLogEntries = [
  { date: "April 23, 2024", wells: 24, status: "success" },
  { date: "April 22, 2024", wells: 19, status: "success" },
  { date: "April 21, 2024", wells: 27, status: "success" },
  { date: "April 20, 2024", wells: 30, status: "success" },
  { date: "April 19, 2024", wells: 31, status: "success" },
]

export function DailyMintLog() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">Daily Mint Log</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>April 23, 2024</span>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-muted rounded">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-muted rounded">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {mintLogEntries.map((entry, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-2 border-b border-border last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-primary" />
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
          <div className="flex items-center gap-1">
            <span className="w-4 h-4 bg-primary/20 rounded flex items-center justify-center text-primary font-bold text-xs">
              C
            </span>
            <span>CAPIT</span>
          </div>
          <span>https://capit.io/records</span>
        </div>
      </div>
    </div>
  )
}
