export interface NavItem {
  label: string
  href: string
}

export interface SocialLink {
  platform: "twitter" | "facebook" | "discord" | "email"
  href: string
  ariaLabel: string
}

export interface SiteContent {
  name: string
  logo: {
    src?: string
    alt: string
  }
  navigation: NavItem[]
  ctaButton: {
    label: string
    href: string
  }
}

export interface CtaContent {
  label: string
  href: string
}

export interface HeroContent {
  eyebrow?: string
  headline: string
  headlineHighlight: string
  description: string
  ctaButton: CtaContent
  secondaryCta?: CtaContent
  tertiaryCta?: CtaContent
  trustNote?: string
  image: {
    src: string
    alt: string
  }
}

export interface EducationalCardContent {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  linkHref: string
  linkLabel: string
}

export interface HomeContent {
  seo?: {
    title: string
    description: string
  }
  hero: HeroContent
  snapshot?: {
    heading: string
    intro: string
  }
  educationalCards: EducationalCardContent[]
  methodologyStrip?: {
    heading: string
    body: string
    href: string
    label: string
  }
}

export interface StatsCardContent {
  title: string
  value: string
  subtitle: string
}

export interface TokensCardContent {
  title: string
  value: string
  subtitle: string
}

export interface TrendDataPoint {
  day: number
  value: number
}

export interface MintLogEntry {
  date: string
  wells: number
  status: "success" | "pending" | "failed"
}

export interface PluggingTrendContent {
  sectionTitle: string[]
  chartTitle: string
  chartSubtitle: string
  dataSource: string
  trendData: TrendDataPoint[]
  mintLogTitle: string
  mintLogEntries: MintLogEntry[]
}

export interface LeaderboardEntry {
  rank: number
  state: string
  flag: string
  wells: number
}

export interface StateLeaderboardContent {
  title: string
  entries: LeaderboardEntry[]
  viewAllButton: CtaContent
  dataSourceNote: string
}

export interface DailyMintLogContent {
  title: string
  currentDate: string
  entries: MintLogEntry[]
  footer: {
    brandLabel: string
    recordsUrl: string
  }
}

export interface DashboardContent {
  statsCards: StatsCardContent[]
  tokensCard: TokensCardContent
  pluggingTrend: PluggingTrendContent
  dailyMintLog: DailyMintLogContent
  stateLeaderboard: StateLeaderboardContent
}

export interface LegalLink {
  label: string
  href: string
}

export interface FooterContent {
  quote: string
  disclaimer?: string
  navigation: NavItem[]
  socialLinks: SocialLink[]
  walletButton: {
    label: string
  }
  copyright: string
  legalLinks: LegalLink[]
}

export interface ContentSection {
  heading: string
  body: string
  bullets?: string[]
}

export interface PageContent {
  title: string
  description: string
  eyebrow?: string
  headline: string
  body: string
  primaryCta?: CtaContent
  secondaryCta?: CtaContent
  sections: ContentSection[]
}
