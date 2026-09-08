'use client'

import React from "react"
import Link from "next/link"
import Image from "next/image"
import type { PageContent } from "@/lib/types"

interface ContentPageProps {
  page?: PageContent
}

/**
 * Content authored in Tina uses **bold** inline. Rendering the raw string put
 * literal asterisks on the page, so translate just that one construct.
 */
function renderInline(text: string): React.ReactNode {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('**') && part.endsWith('**') ? (
      <strong key={i} className="font-bold text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  )
}

export function ContentPage({ page }: ContentPageProps) {
  if (!page) return null

  const sections = page.sections || []
  const bodyText = typeof page.body === "string" ? page.body : page.body ? JSON.stringify(page.body) : ""

  const heroImageSrc =
    typeof page.heroImage === "string" && page.heroImage.trim().length > 0
      ? page.heroImage
      : typeof page.image === "string" && page.image.trim().length > 0
      ? page.image
      : null

  const primaryHref = page.primaryCta?.href || page.primaryCta?.link || "#"
  const primaryLabel = page.primaryCta?.label || page.primaryCta?.text || "Learn More"

  const secondaryHref = page.secondaryCta?.href || page.secondaryCta?.link || "#"
  const secondaryLabel = page.secondaryCta?.label || page.secondaryCta?.text || "View Details"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <section className="px-6 py-12 lg:px-12 xl:px-20 border-b border-border/40 bg-muted/20">
        <div className="mx-auto max-w-5xl space-y-8">
          {page.eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">
              {typeof page.eyebrow === 'string' ? page.eyebrow : JSON.stringify(page.eyebrow)}
            </p>
          ) : null}
          
          {(page.headline || page.title) && (
            <h1 className="text-4xl font-black tracking-tight text-primary md:text-5xl lg:text-6xl">
              {typeof page.headline === 'string' ? page.headline : typeof page.title === 'string' ? page.title : ""}
            </h1>
          )}

          {/* Subpage Banner Image from Tina CMS */}
          {heroImageSrc && (
            <div className="relative aspect-[21/9] w-full overflow-hidden rounded-2xl border border-border/80 shadow-md bg-muted">
              <Image
                src={heroImageSrc}
                alt={typeof page.headline === 'string' ? page.headline : 'Hero Banner'}
                fill
                sizes="(max-width: 1200px) 100vw, 1024px"
                className="object-cover"
                priority
              />
            </div>
          )}

          {bodyText ? (
            <p className="max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">
              {bodyText}
            </p>
          ) : null}

          {(page.primaryCta || page.secondaryCta) ? (
            <div className="flex flex-wrap gap-3 pt-2">
              {page.primaryCta ? (
                <Link 
                  href={primaryHref} 
                  className="rounded-full bg-secondary px-6 py-3 text-sm font-bold text-primary shadow-md hover:bg-secondary/90 transition-colors"
                >
                  {primaryLabel}
                </Link>
              ) : null}
              {page.secondaryCta ? (
                <Link 
                  href={secondaryHref} 
                  className="rounded-full border border-primary/20 bg-white px-6 py-3 text-sm font-bold text-primary hover:bg-primary/5 transition-colors"
                >
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          ) : null}
        </div>
      </section>

      {sections.length > 0 && (
        <section className="px-6 py-16 lg:px-12 xl:px-20">
          <div className="mx-auto grid max-w-5xl gap-8">
            {sections.map((section, idx) => (
              <article key={idx} className="rounded-2xl border border-border/70 bg-card p-6 shadow-sm md:p-8 space-y-4">
                {section.heading && (
                  <h2 className="text-2xl font-black tracking-tight text-primary">{section.heading}</h2>
                )}
                {section.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-muted border border-border/60">
                    <Image
                      src={section.image}
                      alt={section.heading || 'Section Image'}
                      fill
                      sizes="(max-width: 1200px) 100vw, 800px"
                      className="object-cover"
                    />
                  </div>
                )}
                {section.body && (
                  <p className="leading-8 text-muted-foreground">{renderInline(section.body)}</p>
                )}
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="mt-5 grid gap-2 text-sm text-foreground md:grid-cols-2">
                    {section.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="rounded-xl bg-muted/60 px-4 py-3">
                        {renderInline(bullet)}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default ContentPage