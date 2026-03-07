import type {
  SiteContent,
  HomeContent,
  DashboardContent,
  FooterContent,
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

// Combined loader for full page content
export function getFullPageContent() {
  return {
    site: getSiteContent(),
    home: getHomeContent(),
    dashboard: getDashboardContent(),
    footer: getFooterContent(),
  }
}
