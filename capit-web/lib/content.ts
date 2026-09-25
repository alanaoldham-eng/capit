import fs from "fs"
import path from "path"

import {
  SiteContent,
  FooterContent,
  HomeContent,
  DashboardContent,
  PageContent,
} from "./types"

/**
 * Slugs that are served by a different content file than their own name.
 * Keys are URL slugs, values are the file in content/pages (without .json).
 */
const PAGE_SLUG_ALIASES: Record<string, string> = {
  "terms-of-service": "terms-of-use",
}

/** Used only if the content directory cannot be read at build time. */
const FALLBACK_PAGE_SLUGS = [
  "about",
  "faqs",
  "privacy-policy",
  "terms-of-use",
  "what-is-a-plugged-well",
  "why-plugging-wells-matter",
  "how-methane-is-measured",
  "inactive-wells-remain",
  "methodology",
  "buy-capit",
  "contact",
  "states",
  "sponsorships",
]

export function getSiteContent(): SiteContent {
  try {
    return require("../content/site.json")
  } catch (e) {
    return {
      name: "CAPIT Ecosystem",
      title: "CAPIT Protocol",
      logoUrl: "/images/capit-logo.png",
      navigation: [
        { label: "Dashboard", href: "/dashboard" },
        { label: "States", href: "/states" },
        { label: "About", href: "/about" },
        { label: "Methodology", href: "/methodology" },
        { label: "FAQs", href: "/faqs" },
      ],
      ctaButton: { label: "Buy CAPIT", href: "/#swap" },
    }
  }
}

export function getHomeContent(): HomeContent {
  try {
    return require("../content/home.json")
  } catch (e) {
    return {
      hero: {
        eyebrow: "PUBLIC WELL-PLUGGING DATA WITH TRANSPARENT ON-CHAIN REPORTING",
        headline: "Plug Wells.\nMint Tokens.\nTrack Progress.",
        description: "CAPIT brings together public well-plugging records, state-by-state reporting, and permanent protocol activity on the Base network. Explore the national snapshot, compare states, and review the methodology behind our strict 1:1 environmental infrastructure tracking.",
        ctaButton: { label: "VIEW DASHBOARD", href: "/dashboard" },
        secondaryCta: { label: "EXPLORE STATES", href: "/states" },
        image: { src: "/images/cappy-and-well.jpg", alt: "CAPIT Verified Plugged Well Inspector" },
      },
      methodologyStrip: {
        heading: "Source-linked. Time-stamped. Revision-aware.",
        body: "The CAPIT protocol enforces absolute cryptographic provenance for every tokenized environmental asset.",
        href: "/methodology",
        label: "Read Methodology",
      },
      educationalCards: [
        {
          title: "What is a Plugged Well?",
          description: "Our CAPIT well is plugged from capped wells, building set data.",
          imageSrc: "/images/cappy-and-well.jpg",
          imageAlt: "Plugged well diagram",
          linkHref: "/what-is-a-plugged-well",
          linkLabel: "LEARN MORE",
        },
        {
          title: "Why Does Plugging Wells Matter?",
          description: "Plugging reduces methane emissions and protects groundwater across regional basins.",
          imageSrc: "/images/cappy-and-well.jpg",
          imageAlt: "Environmental protection",
          linkHref: "/why-plugging-wells-matter",
          linkLabel: "LEARN MORE",
        },
        {
          title: "How Many Inactive Wells Remain?",
          description: "An estimated 3.5 million abandoned or inactive wells exist across state inventories.",
          imageSrc: "/images/plug-map.jpg",
          imageAlt: "Inactive wells map",
          linkHref: "/inactive-wells-remain",
          linkLabel: "LEARN MORE",
        },
      ],
    }
  }
}

export function getDashboardContent(): DashboardContent {
  try {
    const data = require("../content/dashboard.json")
    if (!data.stateLeaderboard || !data.stateLeaderboard.entries || data.stateLeaderboard.entries.length === 0) {
      data.stateLeaderboard = {
        title: "STATE LEADERBOARD - 2026",
        entries: [
          { rank: 1, state: "Texas", code: "TX", wells: 724 },
          { rank: 2, state: "Kansas", code: "KS", wells: 628 },
          { rank: 3, state: "New Mexico", code: "NM", wells: 298 },
          { rank: 4, state: "Pennsylvania", code: "PA", wells: 230 },
          { rank: 5, state: "Kentucky", code: "KY", wells: 132 },
          { rank: 6, state: "Oklahoma", code: "OK", wells: 125 },
        ],
        viewAllButton: { label: "View All States", href: "/states" },
        dataSourceNote: "Official public state registry filings aggregated and verified on Base network.",
      }
    }
    if (!data.ctaCard) {
      data.ctaCard = {
        title: "Add a Call to Action for:",
        bullets: ["Sponsorships", "Partners", "Clients"],
        href: "/sponsorships",
      }
    }
    return data
  } catch (e) {
    return {
      statsCards: [
        { title: "VERIFIED PLUGGED-WELL RECORDS", value: "1,851,542", subtitle: "Physical infrastructure records that have passed CAPIT's strict publication and verification rules." },
        { title: "ADDED THIS YEAR", value: "2,508", subtitle: "Newly published records successfully tracked and aggregated during 2026." },
      ],
      ctaCard: {
        title: "Add a Call to Action for:",
        bullets: ["Sponsorships", "Partners", "Clients"],
        href: "/sponsorships",
      },
      stateLeaderboard: {
        title: "STATE LEADERBOARD - 2026",
        entries: [
          { rank: 1, state: "Texas", code: "TX", wells: 724 },
          { rank: 2, state: "Kansas", code: "KS", wells: 628 },
          { rank: 3, state: "New Mexico", code: "NM", wells: 298 },
          { rank: 4, state: "Pennsylvania", code: "PA", wells: 230 },
          { rank: 5, state: "Kentucky", code: "KY", wells: 132 },
          { rank: 6, state: "Oklahoma", code: "OK", wells: 125 },
        ],
        viewAllButton: { label: "View All States", href: "/states" },
        dataSourceNote: "Official public state registry filings aggregated and verified on Base network.",
      },
    }
  }
}

export function getFooterContent(): FooterContent {
  try {
    return require("../content/footer.json")
  } catch (e) {
    return {
      quote: "Public records first. Protocol transparency always.",
      disclaimer: "Data is provided for informational purposes and may be delayed, corrected, or revised.",
    }
  }
}

/**
 * Every page slug the site serves, discovered from content/pages so that a new
 * JSON file becomes a real route without editing this list. Runs at build time
 * (generateStaticParams), where the filesystem is available.
 */
export function getPageSlugs(): string[] {
  let slugs: string[] = []

  try {
    const dir = path.join(process.cwd(), "content", "pages")
    slugs = fs
      .readdirSync(dir)
      .filter((file) => file.endsWith(".json"))
      .map((file) => file.replace(/\.json$/, ""))
  } catch (e) {
    slugs = []
  }

  if (slugs.length === 0) {
    slugs = [...FALLBACK_PAGE_SLUGS]
  }

  // Alias slugs have no file of their own but must still resolve.
  for (const alias of Object.keys(PAGE_SLUG_ALIASES)) {
    if (!slugs.includes(alias)) slugs.push(alias)
  }

  return slugs
}

/**
 * Returns the page's content, or null when no content file exists for the slug.
 * Returning null is what lets the route call notFound(): an unknown URL must be
 * a 404, never a placeholder page named after the URL.
 */
export function getPageContent(slug: string = "home"): PageContent | null {
  const targetFile = PAGE_SLUG_ALIASES[slug] || slug

  try {
    const pageData = require(`../content/pages/${targetFile}.json`)
    return {
      ...pageData,
      slug,
    }
  } catch (e) {
    return null
  }
}

export function getFullPageContent(slug: string = "home"): {
  site: SiteContent
  footer: FooterContent
  page: PageContent | null
} {
  return {
    site: getSiteContent(),
    footer: getFooterContent(),
    page: getPageContent(slug),
  }
}
