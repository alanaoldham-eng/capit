/**
 * @jest-environment node
 */
import React from "react"
import { renderToStaticMarkup } from "react-dom/server"
import { renderInline } from "@/components/inline-markdown"

const html = (text: string) => renderToStaticMarkup(<>{renderInline(text)}</>)

describe("renderInline", () => {
  it("renders [label](url) as a link that shows only the label", () => {
    const out = html("See [Texas plugging rule](https://law.cornell.edu/regulations/texas/16-Tex-Admin-Code-SS-3-14) now.")
    expect(out).toContain('href="https://law.cornell.edu/regulations/texas/16-Tex-Admin-Code-SS-3-14"')
    expect(out).toMatch(/>Texas plugging rule<\/a>/)
    expect(out).not.toContain("](")
    expect(out).not.toMatch(/>https?:\/\//) // the URL is never the visible text
  })

  it("opens external links in a new tab with noopener", () => {
    const out = html("[source](https://example.gov/report.pdf)")
    expect(out).toContain('target="_blank"')
    expect(out).toContain('rel="noopener noreferrer"')
  })

  it("keeps internal links in-app, without a new tab", () => {
    const out = html("See the [Methodology](/methodology).")
    expect(out).toContain('href="/methodology"')
    expect(out).not.toContain('target="_blank"')
  })

  it("links mailto without a new tab", () => {
    const out = html("[Email us](mailto:hello@example.com)")
    expect(out).toContain('href="mailto:hello@example.com"')
    expect(out).not.toContain('target="_blank"')
  })

  it("renders **bold**, including inside a link label", () => {
    expect(html('**"Abandoned" on its own is ambiguous:** some states')).toContain("<strong")
    expect(html("[**Bold** label](/x)")).toMatch(/<a[^>]*><strong[^>]*>Bold<\/strong> label<\/a>/)
    expect(html("**Collect:** records")).not.toContain("**")
  })

  it("auto-links a bare URL and keeps sentence punctuation out of it", () => {
    const out = html("Statistics: https://www.kgs.ku.edu/PRS/wellStats.html.")
    expect(out).toContain('href="https://www.kgs.ku.edu/PRS/wellStats.html"')
    expect(out).toMatch(/<\/a>\.$/)
  })

  it("prefixes a bare www. URL with https", () => {
    expect(html("see www.rrc.texas.gov for more")).toContain('href="https://www.rrc.texas.gov"')
  })

  it("keeps an unbalanced closing parenthesis out of a bare URL", () => {
    expect(html("(source: https://a.gov/x)")).toMatch(/href="https:\/\/a\.gov\/x"[^>]*>https:\/\/a\.gov\/x<\/a>\)/)
  })

  it("does not double-link a URL that is already a Markdown link", () => {
    expect(html("[label](https://a.gov/x)").match(/<a /g)).toHaveLength(1)
  })

  it("never renders an unsafe scheme as a link", () => {
    expect(html("[click me](javascript:alert(1))")).not.toContain("<a")
  })

  it("leaves plain text untouched", () => {
    expect(html("No links or bold here.")).toBe("No links or bold here.")
  })
})
