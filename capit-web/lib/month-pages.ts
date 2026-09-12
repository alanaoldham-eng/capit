/**
 * Paging for the homepage "Records Published by Month" card.
 *
 * Pure functions - no React, no filesystem - so the client component and the
 * tests share them. Months are entered in Tina newest first, so page 0 is the
 * newest page.
 *
 * Phase 1: the months are typed into Tina by hand. When phase 2 automates the
 * feed, it only has to produce the same newest-first list; paging is unchanged.
 */

export const DEFAULT_MONTHS_PER_PAGE = 6
const MAX_MONTHS_PER_PAGE = 24

/** Editor-entered "Months per Page": whole number 1-24, defaulting to 6 when blank or invalid. */
export function clampPageSize(raw: unknown): number {
  const n = typeof raw === "number" ? raw : typeof raw === "string" && raw.trim() ? Number(raw) : NaN
  if (!Number.isFinite(n)) return DEFAULT_MONTHS_PER_PAGE
  return Math.min(MAX_MONTHS_PER_PAGE, Math.max(1, Math.floor(n)))
}

export function paginate<T>(items: T[], pageSize: number): T[][] {
  const size = Math.max(1, Math.floor(pageSize))
  const pages: T[][] = []
  for (let i = 0; i < items.length; i += size) pages.push(items.slice(i, i + size))
  return pages
}

const ABBR = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const FULL = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december",
]

/**
 * "July 2026 (to date)" -> { month: "Jul", year: 2026 }.
 * Null unless the period starts with a real month name (full, 3-letter, or
 * "Sept") followed by a 4-digit year.
 */
export function parsePeriod(period: string): { month: string; year: number } | null {
  const match = /^\s*([A-Za-z]{3,9})\.?\s+(\d{4})\b/.exec(period)
  if (!match) return null
  const word = match[1].toLowerCase()
  const index = FULL.findIndex((full, i) => word === full || word === ABBR[i].toLowerCase())
  const month = index >= 0 ? index : word === "sept" ? 8 : -1
  if (month < 0) return null
  return { month: ABBR[month], year: Number(match[2]) }
}

/**
 * Label for one page of newest-first periods: "Feb – Jul 2026",
 * "Nov 2025 – Feb 2026", or "Jan 2026". Null when either end isn't a plain
 * "<Month> <YYYY>", so the caller can fall back to "Page x of y".
 */
export function rangeLabel(periods: string[]): string | null {
  if (periods.length === 0) return null
  const newest = parsePeriod(periods[0])
  const oldest = parsePeriod(periods[periods.length - 1])
  if (!newest || !oldest) return null
  if (newest.month === oldest.month && newest.year === oldest.year) return `${newest.month} ${newest.year}`
  if (newest.year === oldest.year) return `${oldest.month} – ${newest.month} ${newest.year}`
  return `${oldest.month} ${oldest.year} – ${newest.month} ${newest.year}`
}
