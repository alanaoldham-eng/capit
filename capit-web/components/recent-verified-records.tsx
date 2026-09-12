'use client'

import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { RecentVerifiedRecordsContent, RecentRecordEntry } from '@/lib/types'
import { clampPageSize, paginate, rangeLabel } from '@/lib/month-pages'

interface RecentVerifiedRecordsProps {
  content?: RecentVerifiedRecordsContent
}

const defaultEntries: RecentRecordEntry[] = [
  { period: 'July 2026 (to date)', wells: '24 wells', isCurrentMonth: true },
  { period: 'June 2026', wells: '135 wells' },
  { period: 'May 2026', wells: '221 wells' },
  { period: 'April 2026', wells: '410 wells' },
  { period: 'March 2026', wells: '524 wells' },
  { period: 'February 2026', wells: '628 wells' },
  { period: 'January 2026', wells: '566 wells' },
]

const ARROW_CLASS =
  'rounded p-1 text-neutral-400 transition-colors hover:text-neutral-700 dark:hover:text-neutral-200 ' +
  'disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-neutral-400'

export function RecentVerifiedRecords({ content }: RecentVerifiedRecordsProps) {
  const title = content?.title || 'Recent Verified Records'
  const updatedLabel = content?.currentDateLabel || 'July 10, 2026'
  const entries: RecentRecordEntry[] = content?.entries?.length ? content.entries : defaultEntries

  /**
   * Months are entered in Tina newest first, so page 0 is the newest page.
   * "<" steps back in time to older months; ">" steps forward to newer ones.
   */
  const pageSize = clampPageSize(content?.pageSize)
  const pages = paginate(entries, pageSize)
  const [page, setPage] = useState(0)
  // Stay in range if an editor removes months while previewing in Tina.
  const current = Math.min(page, pages.length - 1)
  const visible = pages[current] ?? []
  const hasPaging = pages.length > 1
  const label = rangeLabel(visible.map((entry) => entry.period)) ?? `Page ${current + 1} of ${pages.length}`

  return (
    <div className="p-5 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <div className="min-w-0">
          <h3 className="text-base font-bold text-neutral-900 dark:text-white">{title}</h3>
          <p className="mt-0.5 text-[11px] text-neutral-500">{`Updated ${updatedLabel}`}</p>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-xs text-neutral-500">
          {hasPaging ? (
            <button
              type="button"
              onClick={() => setPage(current + 1)}
              disabled={current >= pages.length - 1}
              aria-label="Show older months"
              className={ARROW_CLASS}
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
          {/* Announced to screen readers whenever the page changes. */}
          <span aria-live="polite" className="whitespace-nowrap px-1 font-medium">
            {label}
          </span>
          {hasPaging ? (
            <button
              type="button"
              onClick={() => setPage(current - 1)}
              disabled={current === 0}
              aria-label="Show newer months"
              className={ARROW_CLASS}
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {/* List Entries */}
      <div className="space-y-3">
        {visible.map((item: RecentRecordEntry, index: number) => (
          <div
            key={`${current}-${index}`}
            className="flex items-center justify-between py-1 text-xs border-b border-neutral-50 dark:border-neutral-800/50 last:border-none"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-neutral-700 dark:text-neutral-300 font-medium">
                {item.period}
              </span>
            </div>
            <span className="font-bold text-neutral-900 dark:text-white font-mono">
              {typeof item.wells === 'number' ? `${item.wells} wells` : item.wells}
            </span>
          </div>
        ))}
        {/* Pad a short last page so the card keeps its height beside the leaderboard. */}
        {hasPaging
          ? Array.from({ length: pageSize - visible.length }, (_, i) => (
              <div key={`pad-${i}`} aria-hidden="true" className="py-1 text-xs border-b border-transparent">
                &nbsp;
              </div>
            ))
          : null}
      </div>

      {/* Footer Link */}
      <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2 text-[11px] text-neutral-500">
        <span className="px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
          C
        </span>
        <span className="font-bold text-neutral-800 dark:text-neutral-200">CAPIT</span>
        <a
          href={content?.footerLinkUrl || 'https://capittoken.com/records'}
          target="_blank"
          rel="noopener noreferrer"
          className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 underline truncate"
        >
          {content?.footerLinkUrl || 'https://capittoken.com/records'}
        </a>
      </div>
    </div>
  )
}

export default RecentVerifiedRecords
