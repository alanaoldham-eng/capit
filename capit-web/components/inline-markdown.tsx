import React from "react"
import Link from "next/link"

/**
 * Inline Markdown for Tina-authored text: [label](url) links, **bold**, and
 * bare URLs.
 *
 * Content in content/pages/*.json is written with these constructs, but it was
 * rendered as raw strings, so pages showed literal asterisks and full
 * "[label](https://...)" source URLs. This translates just those - it is not a
 * general Markdown parser.
 *
 * Prefer [label](url) in content: the page then shows readable link text. A bare
 * URL pasted without that syntax is still turned into a link, as a fallback, so
 * no URL ever renders as dead text.
 *
 * Plain function, no hooks and no "use client", so it works in both server and
 * client components.
 */

const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g
const BOLD = /(\*\*[^*]+\*\*)/g
const BARE_URL = /((?:https?:\/\/|www\.)[^\s<>"]+)/g

const LINK_CLASS =
  "font-medium text-primary underline underline-offset-2 transition-colors hover:text-primary/70"

/** External links open in a new tab; noopener stops the target page reaching back via window.opener. */
function externalLink(href: string, children: React.ReactNode, key: string, className = LINK_CLASS) {
  return (
    <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  )
}

/** Keep sentence punctuation ("see https://x.gov.") and unbalanced ")" out of a bare URL. */
function splitTrailing(url: string): [string, string] {
  let end = url.length
  while (end > 0) {
    const ch = url[end - 1]
    if (".,;:!?'\"".includes(ch)) {
      end--
      continue
    }
    if (ch === ")") {
      const body = url.slice(0, end)
      if ((body.match(/\(/g) ?? []).length < (body.match(/\)/g) ?? []).length) {
        end--
        continue
      }
    }
    break
  }
  return [url.slice(0, end), url.slice(end)]
}

function autolink(text: string, keyPrefix: string): React.ReactNode[] {
  const out: React.ReactNode[] = []
  // split() with one capture group puts the matched URLs at the odd indexes.
  text.split(BARE_URL).forEach((part, i) => {
    if (!part) return
    if (i % 2 === 0) {
      out.push(<React.Fragment key={`${keyPrefix}-p${i}`}>{part}</React.Fragment>)
      return
    }
    const [url, trailing] = splitTrailing(part)
    const href = url.startsWith("www.") ? `https://${url}` : url
    // break-all so a long URL wraps inside its card instead of overflowing it.
    out.push(externalLink(href, url, `${keyPrefix}-u${i}`, `${LINK_CLASS} break-all`))
    if (trailing) out.push(<React.Fragment key={`${keyPrefix}-r${i}`}>{trailing}</React.Fragment>)
  })
  return out
}

/** **bold**, with bare URLs linked inside it unless we are already inside a link. */
function renderBold(text: string, keyPrefix: string, linkify: boolean): React.ReactNode[] {
  const inner = (t: string, k: string): React.ReactNode =>
    linkify ? autolink(t, k) : <React.Fragment key={k}>{t}</React.Fragment>

  return text
    .split(BOLD)
    .filter(Boolean)
    .map((part, i) =>
      part.length > 4 && part.startsWith("**") && part.endsWith("**") ? (
        <strong key={`${keyPrefix}-b${i}`} className="font-bold text-foreground">
          {inner(part.slice(2, -2), `${keyPrefix}-b${i}i`)}
        </strong>
      ) : (
        <React.Fragment key={`${keyPrefix}-t${i}`}>{inner(part, `${keyPrefix}-t${i}i`)}</React.Fragment>
      )
    )
}

function renderLink(label: string, url: string, key: string): React.ReactNode {
  // No autolinking inside a label: an <a> nested in an <a> is invalid HTML.
  const children = renderBold(label, key, false)

  // Site-internal: client-side navigation.
  if ((url.startsWith("/") && !url.startsWith("//")) || url.startsWith("#")) {
    return (
      <Link key={key} href={url} className={LINK_CLASS}>
        {children}
      </Link>
    )
  }

  if (/^https?:\/\//i.test(url)) return externalLink(url, children, key)

  if (/^mailto:/i.test(url)) {
    return (
      <a key={key} href={url} className={LINK_CLASS}>
        {children}
      </a>
    )
  }

  // Any other scheme (javascript:, data:, ...) is never rendered as a link.
  return <React.Fragment key={key}>{children}</React.Fragment>
}

export function renderInline(text: string): React.ReactNode {
  const out: React.ReactNode[] = []
  let last = 0
  let n = 0

  for (const match of text.matchAll(LINK)) {
    const [whole, label, url] = match
    const start = match.index ?? 0
    if (start > last) out.push(...renderBold(text.slice(last, start), `s${n}`, true))
    out.push(renderLink(label, url, `l${n}`))
    last = start + whole.length
    n++
  }
  if (last < text.length) out.push(...renderBold(text.slice(last), `s${n}`, true))

  return out
}
