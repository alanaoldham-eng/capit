# Content Migration Summary

This document lists all content that was externalized from React components into JSON files for CMS-ready architecture.

## New Structure

```
/content
  site.json       - Site-wide branding and navigation
  home.json       - Hero section and educational cards
  dashboard.json  - Stats, charts, leaderboard data
  footer.json     - Footer content and social links

/lib
  types.ts        - TypeScript interfaces for all content
  content.ts      - Content loader functions
```

## Content Moved by Component

### Header (`components/header.tsx`)
- Logo text ("CAPIT") → `site.json > name`
- Navigation items (Dashboard, About, FAQs) → `site.json > navigation`
- CTA button text ("Buy CAPIT") → `site.json > ctaButton`

### Hero (`components/hero.tsx`)
- Headline text → `home.json > hero.headline`
- Headline highlight → `home.json > hero.headlineHighlight`
- Description paragraph → `home.json > hero.description`
- CTA button ("VIEW DASHBOARD") → `home.json > hero.ctaButton`
- Hero image path and alt text → `home.json > hero.image`

### StatsDashboard (`components/stats-dashboard.tsx`)
- Stats card data (Wells Plugged values) → `dashboard.json > statsCards`
- Tokens card content → `dashboard.json > tokensCard`

### PluggingTrendCard (`components/plugging-trend-card.tsx`)
- Section title lines → `dashboard.json > pluggingTrend.sectionTitle`
- Chart title and subtitle → `dashboard.json > pluggingTrend.chartTitle/chartSubtitle`
- Trend data array → `dashboard.json > pluggingTrend.trendData`
- Mint log entries → `dashboard.json > pluggingTrend.mintLogEntries`
- Data source attribution → `dashboard.json > pluggingTrend.dataSource`

### DailyMintLog (`components/daily-mint-log.tsx`)
- Title ("Daily Mint Log") → `dashboard.json > dailyMintLog.title`
- Current date → `dashboard.json > dailyMintLog.currentDate`
- Log entries → `dashboard.json > dailyMintLog.entries`
- Footer branding → `dashboard.json > dailyMintLog.footer`

### StateLeaderboard (`components/state-leaderboard.tsx`)
- Title → `dashboard.json > stateLeaderboard.title`
- State entries (rank, state, flag, wells) → `dashboard.json > stateLeaderboard.entries`
- View All button → `dashboard.json > stateLeaderboard.viewAllButton`
- Data source note → `dashboard.json > stateLeaderboard.dataSourceNote`

### EducationalSection (`components/educational-section.tsx`)
- All card content moved → `home.json > educationalCards`

### EducationalCard (`components/educational-card.tsx`)
- Now receives all content via props
- Card title, description, image, link → passed from parent

### Footer (`components/footer.tsx`)
- Quote text → `footer.json > quote`
- Navigation items → `footer.json > navigation`
- Social links → `footer.json > socialLinks`
- Wallet button text → `footer.json > walletButton`
- Copyright text → `footer.json > copyright`
- Legal links → `footer.json > legalLinks`

## Changes Made

1. **Removed hardcoded content** from all components
2. **Added TypeScript interfaces** for type safety (`lib/types.ts`)
3. **Created content loader** functions (`lib/content.ts`)
4. **Converted buttons to links** where appropriate for proper semantics
5. **Removed unnecessary "use client"** from components that don't need interactivity
6. **Added ARIA labels** and improved accessibility
7. **Made components purely presentational** - they only receive and display data

## CMS Integration Notes

This structure is designed for easy integration with Git-based CMS solutions:

- **TinaCMS**: Point content collections at `/content/*.json`
- **Decap CMS**: Configure collections for each JSON file
- **Sanity**: Import JSON structure as schema definitions

All content files use simple JSON with clear schemas defined in `lib/types.ts`.
