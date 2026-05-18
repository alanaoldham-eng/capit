import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
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
    <div className="min-h-screen bg-[#fbfaf6] flex flex-col justify-between">
      <div>
        <Header content={site} />
        
        {/* Dynamic Back to Home Row */}
        <div className="mx-auto max-w-5xl px-6 pt-12 lg:px-12 xl:px-20 -mb-8">
          <Link href="/" className="inline-flex items-center text-sm font-semibold text-primary/80 hover:text-primary transition-colors hover:underline">
            {"← Back to home"}
          </Link>
        </div>

        <ContentPage page={page} />
      </div>
      <Footer site={site} content={footer} />
    </div>
  )
}