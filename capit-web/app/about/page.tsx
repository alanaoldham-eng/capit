import Link from "next/link"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { getFullPageContent, getPageContent } from "@/lib/content"

export default function Page() {
  // 1. Fetch layout assets
  const layoutContent = getFullPageContent()
  const site = layoutContent?.site
  const footer = layoutContent?.footer

  // 2. Load the about.json data
  const aboutPage = getPageContent("about") as any

  if (!aboutPage) return null

  // 3. Extract the structured fields
  const headline = aboutPage.headline || "About CAPIT"
  const body = aboutPage.body
  const primaryCta = aboutPage.primaryCta
  const secondaryCta = aboutPage.secondaryCta
  const sections = aboutPage.sections || []

  return (
    <main className="min-h-screen bg-[#fbfaf6]">
      <Header content={site} />
      <section className="px-6 py-20 lg:px-12 xl:px-20">
        <div className="mx-auto max-w-4xl rounded-2xl border border-border/70 bg-white p-8 shadow-sm md:p-12">
          
          <Link href="/" className="text-sm font-semibold text-primary hover:underline">
            ← Back to home
          </Link>
          
          {/* Main Headline */}
          <h1 className="mt-8 text-4xl font-extrabold tracking-[-0.04em] text-primary md:text-6xl">
            {headline}
          </h1>
          
          {/* Intro Body */}
          {body && (
            <p className="mt-6 text-lg leading-8 text-[#31564e]/90 whitespace-pre-line">
              {body}
            </p>
          )}

          {/* Action Call-to-Action Buttons */}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {primaryCta?.href && (
                <Link href={primaryCta.href} className="rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-md hover:bg-primary/90 transition">
                  {primaryCta.label || "Read More"}
                </Link>
              )}
              {secondaryCta?.href && (
                <Link href={secondaryCta.href} className="rounded-xl border border-border bg-transparent px-5 py-3 text-sm font-bold text-primary hover:bg-[#fbfaf6] transition">
                  {secondaryCta.label || "View Details"}
                </Link>
              )}
            </div>
          )}

          {/* Dynamic Content Sections Loop */}
          {sections.length > 0 && (
            <div className="mt-16 space-y-12 border-t border-border/50 pt-12">
              {sections.map((section: any, idx: number) => (
                <div key={idx} className="space-y-4">
                  <h2 className="text-xl font-extrabold tracking-tight text-primary md:text-2xl">
                    {section.heading}
                  </h2>
                  <p className="text-base leading-7 text-[#31564e]/80">
                    {section.body}
                  </p>

                  {/* Handle Optional Bullets (Like the 5-Step Model) */}
                  {section.bullets && section.bullets.length > 0 && (
                    <ul className="mt-4 space-y-3 pl-5 list-disc text-base leading-7 text-[#31564e]/80">
                      {section.bullets.map((bullet: string, bIdx: number) => {
                        // Split out bold prefixes (e.g. "Collect:") if present
                        const hasColon = bullet.includes(":")
                        if (hasColon) {
                          const [boldPart, rest] = bullet.split(/:(.*)/)
                          return (
                            <li key={bIdx}>
                              <strong>{boldPart}:</strong>{rest}
                            </li>
                          )
                        }
                        return <li key={bIdx}>{bullet}</li>
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          )}

        </div>
      </section>
      <Footer site={site} content={footer} />
    </main>
  )
}