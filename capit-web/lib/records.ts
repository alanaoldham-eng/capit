import fs from "fs"
import path from "path"

/**
 * Downloadable records for the /records page.
 *
 * Each record is one JSON file in content/records/, edited in Tina under
 * "Records". Server-only: this reads the filesystem, so never import it from a
 * client component.
 */
export interface RecordEntry {
  /** File name without .json - stable React key. */
  slug: string
  title: string
  /** Where the link points, or null when no usable link is set. */
  href: string | null
  isExternal: boolean
  isPdf: boolean
  description?: string
  /** ISO date string, when set. */
  date?: string
}

const RECORDS_DIR = path.join(process.cwd(), "content", "records")

/**
 * Only absolute http(s) URLs and site-relative paths become links. Anything
 * else (javascript:, data:, protocol-relative //host) is treated as unset.
 */
function safeHref(raw: unknown): string | null {
  if (typeof raw !== "string") return null
  const value = raw.trim()
  if (!value) return null
  if (/^https?:\/\//i.test(value)) return value
  if (value.startsWith("/") && !value.startsWith("//")) return value
  return null
}

const text = (raw: unknown): string | undefined =>
  typeof raw === "string" && raw.trim() ? raw.trim() : undefined

export function getRecords(dir: string = RECORDS_DIR): RecordEntry[] {
  if (!fs.existsSync(dir)) return []

  const records: RecordEntry[] = []
  for (const file of fs.readdirSync(dir)) {
    if (!file.endsWith(".json")) continue

    let data: Record<string, unknown>
    try {
      // Strip a BOM - some Windows editors add one, and JSON.parse rejects it.
      data = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8").replace(/^\uFEFF/, ""))
    } catch {
      // One bad file must not take the whole page down at build time.
      console.warn(`[records] Skipped ${file}: not valid JSON.`)
      continue
    }

    const title = text(data.title)
    if (!title) continue

    // An uploaded PDF (file) wins over a pasted link (url).
    const href = safeHref(data.file) ?? safeHref(data.url)
    const date = text(data.date)

    records.push({
      slug: file.replace(/\.json$/, ""),
      title,
      href,
      isExternal: href !== null && /^https?:\/\//i.test(href),
      isPdf: href !== null && /\.pdf($|[?#])/i.test(href),
      description: text(data.description),
      date: date && !Number.isNaN(Date.parse(date)) ? date : undefined,
    })
  }

  // Newest dated records first, then undated records A-Z.
  return records.sort((a, b) => {
    if (a.date && b.date) return Date.parse(b.date) - Date.parse(a.date)
    if (a.date) return -1
    if (b.date) return 1
    return a.title.localeCompare(b.title)
  })
}
