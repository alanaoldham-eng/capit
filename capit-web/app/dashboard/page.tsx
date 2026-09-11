import React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ContentPage from "@/components/page/content-page"
import {
  getDashboardContent,
  getFooterContent,
  getPageContent,
  getSiteContent,
} from "@/lib/content"
import { getImageSizes } from "@/lib/image-size"
import type { CtaContent, PageContent } from "@/lib/types"

/** A non-blank string, or undefined - so an emptied CMS field falls through. */
const text = (value: unknown): string | undefined =>
  typeof value === "string" && value.trim().length > 0 ? value : undefined

const hasLabel = (cta?: CtaContent): cta is CtaContent => Boolean(cta && (cta.label || cta.text))

/**
 * /dashboard is a core page. Its hero is edited in Core Config -> dashboard.json
 * -> Hero Section (the `hero` block in content/dashboard.json), while the SEO
 * fields and body sections stay in Sub Pages -> dashboard
 * (content/pages/dashboard.json).
 *
 * This route used to fall through to [slug], which only reads the Sub Pages
 * file, so a hero configured in Core Config never appeared. Every hero field
 * falls back to its Sub Pages value when left empty, so clearing a field in
 * Core Config never blanks the page.
 */
export default async function DashboardPage() {
  const site = getSiteContent()
  const footer = getFooterContent()
  const page = getPageContent("dashboard")
  const hero = getDashboardContent().hero

  const merged: PageContent = {
    ...page,
    eyebrow: text(hero?.eyebrow) ?? page.eyebrow,
    headline: text(hero?.headline) ?? page.headline,
    headlineHighlight: text(hero?.headlineHighlight) ?? page.headlineHighlight,
    body: text(hero?.description) ?? page.body,
    heroImage: text(hero?.image?.src) ?? page.heroImage,
    heroImageAlt: text(hero?.image?.alt) ?? page.heroImageAlt,
    trustNote: text(hero?.trustNote) ?? page.trustNote,
    primaryCta: hasLabel(hero?.ctaButton) ? hero?.ctaButton : page.primaryCta,
    secondaryCta: hasLabel(hero?.secondaryCta) ? hero?.secondaryCta : page.secondaryCta,
  }

  const imageSizes = await getImageSizes([
    merged.heroImage,
    ...(merged.sections ?? []).map((section) => section.image),
  ])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header site={site} />
      <main className="flex-1">
        <ContentPage page={merged} imageSizes={imageSizes} />
      </main>
      <Footer site={site} content={footer} />
    </div>
  )
}
