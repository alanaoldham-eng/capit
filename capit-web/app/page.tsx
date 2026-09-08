import React from "react"
import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { StatsDashboard } from "@/components/stats-dashboard"
import { EducationalSection } from "@/components/educational-section"
import { MethodologyStrip } from "@/components/methodology-strip"
import Footer from "@/components/footer"
import nextDynamic from "next/dynamic"
import {
  getHomeContent,
  getDashboardContent,
  getSiteContent,
  getFooterContent,
} from "@/lib/content"

export const dynamic = 'force-dynamic'

// Client-only: the WalletConnect stack touches indexedDB at import time, which
// throws during server rendering. Loading it with ssr:false keeps that off the
// server entirely.
const SwapWidget = nextDynamic(
  () => import("@/components/SwapWidget").then((mod) => mod.SwapWidget),
  {
    ssr: false,
    loading: () => (
      <div className="my-12 flex h-[300px] flex-col items-center justify-center text-sm font-medium text-muted-foreground animate-pulse">
        <span>Initializing Web3 Provider...</span>
      </div>
    ),
  }
)

export default async function HomePage() {
  let home: any = {}
  let dashboard: any = {}
  let site: any = {}
  let footer: any = {}

  try {
    home = getHomeContent()
  } catch (e) {}

  try {
    dashboard = getDashboardContent()
  } catch (e) {}

  try {
    site = getSiteContent()
  } catch (e) {}

  try {
    footer = getFooterContent()
  } catch (e) {}

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header site={site} />
      <main className="flex-1">
        <Hero content={home?.hero} />
        <StatsDashboard content={dashboard} />
        <EducationalSection cards={home?.educationalCards || []} />
        <SwapWidget />
        <MethodologyStrip content={home?.methodologyStrip} />
      </main>
      <Footer site={site} content={footer} />
    </div>
  )
}