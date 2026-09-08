import type { ReactNode } from "react"

export interface SocialLink {
  platform?: string
  url?: string
  href?: string
  ariaLabel?: string
  icon?: string
  [key: string]: unknown
}

export interface SiteContent {
  name?: string
  title?: string
  description?: string
  logoUrl?: string
  logo?: {
    src?: string
    alt?: string
  }
  navigation?: Array<{ label: string; href: string }>
  ctaButton?: { label: string; href: string }
  [key: string]: unknown
}

export interface FooterContent {
  tagline?: string
  quote?: string
  disclaimer?: string
  copyright?: string
  links?: Array<{ label?: string; href?: string }>
  socialLinks?: SocialLink[]
  [key: string]: unknown
}

export interface CtaContent {
  text?: string
  link?: string
  label?: string
  href?: string
  [key: string]: unknown
}

export interface HeroImage {
  src?: string
  alt?: string
}

export interface HeroContent {
  eyebrow?: string
  headline?: string
  headlineHighlight?: string
  description?: string
  trustNote?: string
  ctaButton?: CtaContent
  secondaryCta?: CtaContent
  tertiaryCta?: CtaContent
  image?: HeroImage
  title?: string
  subtitle?: string
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  primaryCta?: CtaContent
  imageSrc?: string
  imageAlt?: string
  heroImage?: HeroImage
  [key: string]: unknown
}

export interface EducationalCardContent {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  linkHref: string
  linkLabel: string
  [key: string]: unknown
}

export interface MethodologyStripContent {
  heading?: string
  title?: string
  body?: string
  description?: string
  label?: ReactNode
  href?: string
  primaryCtaText?: string
  primaryCtaLink?: string
  secondaryCtaText?: string
  secondaryCtaLink?: string
  [key: string]: unknown
}

export interface HomeContent {
  hero?: HeroContent
  methodologyStrip?: MethodologyStripContent
  educationalCards?: EducationalCardContent[]
  [key: string]: unknown
}

export interface PageSection {
  heading?: string
  image?: string
  body?: string
  bullets?: string[]
  [key: string]: unknown
}

export interface PageContent {
  title?: string
  eyebrow?: ReactNode
  headline?: ReactNode
  description?: string
  heroImage?: string
  image?: string
  body?: string | Record<string, unknown>
  primaryCta?: CtaContent
  secondaryCta?: CtaContent
  sections?: PageSection[]
  slug?: string
  updatedAt?: string
  [key: string]: unknown
}

export interface ResourceLink {
  title: string
  subtitle: string
  url: string
  badge?: string
  [key: string]: unknown
}

export interface TokenResourcesCardContent {
  title?: string
  subtitle?: string
  contractAddress?: string
  links?: ResourceLink[]
  [key: string]: unknown
}

export interface RecentRecordEntry {
  period: string
  wells: string | number
  isCurrentMonth?: boolean
  [key: string]: unknown
}

export interface RecentVerifiedRecordsContent {
  title?: string
  currentDateLabel?: string
  entries?: RecentRecordEntry[]
  footerLinkText?: string
  footerLinkUrl?: string
  [key: string]: unknown
}

export interface StatsCardContent {
  title: string
  value: string
  subtitle?: string
  helperText?: string
  [key: string]: unknown
}

export interface PluggingTrendData {
  value: number
  day?: number
  [key: string]: unknown
}

export interface MintLogEntry {
  date: string
  wells: number
  status?: string
  [key: string]: unknown
}

export interface PluggingTrendContent {
  chartTitle?: string
  chartSubtitle?: ReactNode
  title?: string
  mintLogTitle?: ReactNode
  trendData?: PluggingTrendData[]
  mintLogEntries?: MintLogEntry[]
  dataSource?: string
  sectionTitle?: string[]
  [key: string]: unknown
}

export interface DailyMintLogContent {
  title?: string
  currentDate?: ReactNode
  entries?: MintLogEntry[]
  footer?: {
    brandLabel?: string
    recordsUrl?: string
    [key: string]: unknown
  }
  [key: string]: unknown
}

export interface StateLeaderboardItem {
  rank?: number | string
  state?: string
  code?: string
  flag?: ReactNode
  wells?: number
  [key: string]: unknown
}

export interface StateLeaderboardContent {
  title?: string
  subtitle?: string
  items?: StateLeaderboardItem[]
  entries?: StateLeaderboardItem[]
  viewAllButton?: {
    label?: ReactNode
    href?: string
    [key: string]: unknown
  }
  dataSourceNote?: ReactNode
  [key: string]: unknown
}

export interface CtaCardContent {
  title?: string
  bullets?: string[]
  linkLabel?: string
  href?: string
  [key: string]: unknown
}

export interface DashboardContent {
  statsCards?: StatsCardContent[]
  tokensCard?: {
    title?: string
    value?: string
    subtitle?: string
    [key: string]: unknown
  }
  pluggingTrend?: PluggingTrendContent
  recentVerifiedRecords?: RecentVerifiedRecordsContent
  tokenResourcesCard?: TokenResourcesCardContent
  educationalCards?: EducationalCardContent[]
  stateLeaderboard?: StateLeaderboardContent
  dailyMintLog?: DailyMintLogContent
  ctaCard?: CtaCardContent
  [key: string]: unknown
}