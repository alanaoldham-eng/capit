import type { Metadata } from "next"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { ContentPage } from "@/components/page/content-page"
import { getFooterContent, getPageContent, getSiteContent } from "@/lib/content"

const stateNames: Record<string, string> = {
  texas: "Texas",
  pennsylvania: "Pennsylvania",
  oklahoma: "Oklahoma",
}

interface PageProps {
  params: { state: string }
}

export function generateStaticParams() {
  return Object.keys(stateNames).map((state) => ({ state }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const stateName = stateNames[params.state] ?? params.state
  return {
    title: `${stateName} Well Plugging Tracker | CAPIT`,
    description: `Review ${stateName} well-plugging records, source definitions, recent activity, and CAPIT publication notes.`,
  }
}

export default function StateDetailPage({ params }: PageProps) {
  const site = getSiteContent()
  const footer = getFooterContent()
  const template = getPageContent("state-detail-template")!
  const stateName = stateNames[params.state] ?? params.state.replace(/-/g, " ")
  const page = JSON.parse(JSON.stringify(template).replaceAll("[State Name]", stateName))
  return (
    <>
      <Header content={site} />
      <ContentPage page={page} />
      <Footer site={site} content={footer} />
    </>
  )
}
