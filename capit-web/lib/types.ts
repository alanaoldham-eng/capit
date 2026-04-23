// Site-wide content types
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
    alt: string
    src?: string
  }
  navigation: NavItem[]
  ctaButton: {
    label: string
    href: string
  }
}

// Home page content types
export interface HeroContent {
  headline: string
  headlineHighlight: string
  description: string
  ctaButton: {
    label: string
    href: string
  }
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
  hero: HeroContent
  educationalCards: EducationalCardContent[]
}

// Dashboard content types
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
  viewAllButton: {
    label: string
    href: string
  }
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

// Footer content types
export interface LegalLink {
  label: string
  href: string
}

export interface FooterContent {
  quote: string
  navigation: NavItem[]
  socialLinks: SocialLink[]
  walletButton: {
    label: string
  }
  copyright: string
  legalLinks: LegalLink[]
}
