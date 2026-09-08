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

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header site={site} />
      <main className="flex-1">
        <ContentPage page={page} />
      </main>
      <Footer site={site} content={footer} />
    </div>
  )
}