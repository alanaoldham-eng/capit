import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { ContentPage } from "@/components/page/content-page"
import { getFooterContent, getPageContent, getPageSlugs, getSiteContent } from "@/lib/content"

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getPageSlugs()
    .filter((slug) => slug !== "state-detail-template")
    .map((slug) => ({ slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getPageContent(params.slug)
  if (!page) return {}
  return { title: page.title, description: page.description }
}

export default function GenericPage({ params }: PageProps) {
  const site = getSiteContent()
  const footer = getFooterContent()
  const page = getPageContent(params.slug)
  if (!page) notFound()
  return (
    <>
      <Header content={site} />
      <ContentPage page={page} />
      <Footer site={site} content={footer} />
    </>
  )
}
