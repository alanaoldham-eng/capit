import fs from "fs"
import path from "path"
import type {
  SiteContent,
  HomeContent,
  DashboardContent,
  FooterContent,
  PageContent,
} from "./types"

import siteData from "@/content/site.json"
import homeData from "@/content/home.json"
import dashboardData from "@/content/dashboard.json"
import footerData from "@/content/footer.json"

export function getSiteContent(): SiteContent {
  return siteData as SiteContent
}

export function getHomeContent(): HomeContent {
  return homeData as HomeContent
}

export function getDashboardContent(): DashboardContent {
  return dashboardData as DashboardContent
}

export function getFooterContent(): FooterContent {
  return footerData as FooterContent
}

export function getFullPageContent() {
  return {
    site: getSiteContent(),
    home: getHomeContent(),
    dashboard: getDashboardContent(),
    footer: getFooterContent(),
  }
}

const pagesDirectory = path.join(process.cwd(), "content", "pages")

export function getPageSlugs() {
  if (!fs.existsSync(pagesDirectory)) return []
  return fs
    .readdirSync(pagesDirectory)
    .filter((file) => file.endsWith(".json"))
    .map((file) => file.replace(/\.json$/, ""))
}

export function getPageContent(slug: string): PageContent | null {
  const safeSlug = slug.replace(/[^a-z0-9-]/gi, "")
  const filePath = path.join(pagesDirectory, `${safeSlug}.json`)
  if (!fs.existsSync(filePath)) return null
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as PageContent
}
