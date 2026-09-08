'use client'

import React from 'react'
import type { RecentVerifiedRecordsContent, RecentRecordEntry } from '@/lib/types'

interface RecentVerifiedRecordsProps {
  content?: RecentVerifiedRecordsContent
}

export function RecentVerifiedRecords({ content }: RecentVerifiedRecordsProps) {
  const title = content?.title || 'Recent Verified Records'
  const currentDateLabel = content?.currentDateLabel || 'July 10, 2026'

  const defaultEntries: RecentRecordEntry[] = [
    { period: 'July 2026 (to date)', wells: '24 wells', isCurrentMonth: true },
    { period: 'June 2026', wells: '135 wells' },
    { period: 'May 2026', wells: '221 wells' },
    { period: 'April 2026', wells: '410 wells' },
    { period: 'March 2026', wells: '524 wells' },
    { period: 'February 2026', wells: '628 wells' },
    { period: 'January 2026', wells: '566 wells' },
  ]

  const entries: RecentRecordEntry[] = content?.entries?.length ? content.entries : defaultEntries

  return (
    <div className="p-5 bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
        <h3 className="text-base font-bold text-neutral-900 dark:text-white">
          {title}
        </h3>
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <span>{currentDateLabel}</span>
          <div className="flex items-center gap-1 font-mono text-neutral-400">
            <button className="px-1 hover:text-neutral-700 dark:hover:text-neutral-200">&lt;</button>
            <button className="px-1 hover:text-neutral-700 dark:hover:text-neutral-200">&gt;</button>
          </div>
        </div>
      </div>

      {/* List Entries */}
      <div className="space-y-3">
        {entries.map((item: RecentRecordEntry, index: number) => (
          <div
            key={index}
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