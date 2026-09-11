import React from "react"
import { notFound } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ContentPage from "@/components/page/content-page"
import {
  getFooterContent,
  getPageContent,
  getPageSlugs,
  getSiteContent,
} from "@/lib/content"
import { getImageSizes } from "@/lib/image-size"

export async function generateStaticParams() {
  const slugs = getPageSlugs()
  return slugs
    .filter((slug: string) => slug !== "state-detail-template")
    .map((slug: string) => ({ slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function DynamicSlugPage({ params }: PageProps) {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const site = getSiteContent()
  const footer = getFooterContent()
  const page = getPageContent(slug)

  if (!page) {
    notFound()
  }

  // Measured here, on the server, so ContentPage can reserve each image's exact
  // box before it loads. These pages are statically generated, so this runs at
  // build time.
  const imageSizes = await getImageSizes([
    typeof page.heroImage === "string" ? page.heroImage : null,
    typeof page.image === "string" ? page.image : null,
    ...(page.sections ?? []).map((section) => section.image),
  ])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header site={site} />
      <main className="flex-1">
        <ContentPage page={page} imageSizes={imageSizes} />
      </main>
      <Footer site={site} content={footer} />
    </div>
  )
}
