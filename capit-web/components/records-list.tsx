import React from "react"
import { FileDown } from "lucide-react"
import { renderInline } from "@/components/inline-markdown"
import type { RecordEntry } from "@/lib/records"

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // Tina stores dates as UTC midnight; formatting in UTC stops them showing as the previous day.
    timeZone: "UTC",
  })

/**
 * Site-hosted files download; external links open in a new tab. The download
 * attribute is ignored for cross-origin URLs, so it is only set on site paths.
 */
function linkProps(record: RecordEntry): React.AnchorHTMLAttributes<HTMLAnchorElement> {
  return record.isExternal ? { target: "_blank", rel: "noopener noreferrer" } : { download: "" }
}

export function RecordsList({ records }: { records: RecordEntry[] }) {
  if (records.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-border/80 bg-card p-8 text-center text-muted-foreground">
        No records have been published yet.
      </p>
    )
  }

  return (
    <ul className="divide-y divide-border/60 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm">
      {records.map((record) => (
        <li key={record.slug} className="space-y-2 p-5 md:p-6">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            {record.href ? (
              <a
                href={record.href}
                {...linkProps(record)}
                className="inline-flex items-start gap-2 text-lg font-bold text-primary underline-offset-4 hover:underline"
              >
                <FileDown className="mt-1 h-5 w-5 shrink-0 text-secondary" aria-hidden="true" />
                <span>{record.title}</span>
                {record.isExternal ? <span className="sr-only"> (opens in a new tab)</span> : null}
              </a>
            ) : (
              <span className="text-lg font-bold text-primary">{record.title}</span>
            )}
            {record.isPdf ? (
              <span className="rounded bg-muted px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
                PDF
              </span>
            ) : null}
          </div>

          {record.date ? (
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {formatDate(record.date)}
            </p>
          ) : null}

          {record.description ? (
            <p className="max-w-3xl text-sm leading-6 text-muted-foreground">{renderInline(record.description)}</p>
          ) : null}

          {/* Visible in preview so an editor notices before publishing. */}
          {record.href ? null : (
            <p className="text-xs font-semibold text-destructive">
              Link missing - add a link or upload a PDF for this record in Tina.
            </p>
          )}
        </li>
      ))}
    </ul>
  )
}

export default RecordsList
