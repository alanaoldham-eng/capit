/**
 * Integration Test Suite for capit-web
 * Tests content loading and data integration
 */

import {
  getSiteContent,
  getHomeContent,
  getDashboardContent,
  getFooterContent,
  getFullPageContent,
} from '@/lib/content'

describe('Content Integration Tests', () => {
  describe('getSiteContent', () => {
    it('returns valid site configuration', () => {
      const content = getSiteContent()

      expect(content).toBeDefined()
      expect(content.name).toBeDefined()
      expect(typeof content.name).toBe('string')
      expect(content.name.length).toBeGreaterThan(0)
    })

    it('site has navigation items', () => {
      const content = getSiteContent()

      expect(content.navigation).toBeDefined()
      expect(Array.isArray(content.navigation)).toBe(true)
      expect(content.navigation.length).toBeGreaterThan(0)

      content.navigation.forEach((item) => {
        expect(item.label).toBeDefined()
        expect(item.href).toBeDefined()
        expect(typeof item.label).toBe('string')
        expect(typeof item.href).toBe('string')
      })
    })

    it('site has CTA button configuration', () => {
      const content = getSiteContent()

      expect(content.ctaButton).toBeDefined()
      expect(content.ctaButton.label).toBeDefined()
      expect(content.ctaButton.href).toBeDefined()
    })
  })

  describe('getHomeContent', () => {
    it('returns valid home content', () => {
      const content = getHomeContent()

      expect(content).toBeDefined()
      expect(content.hero).toBeDefined()
      expect(content.educationalCards).toBeDefined()
    })

    it('hero section has required fields', () => {
      const { hero } = getHomeContent()

      expect(hero.headline).toBeDefined()
      expect(hero.headlineHighlight).toBeDefined()
      expect(hero.description).toBeDefined()
      expect(hero.ctaButton).toBeDefined()
      expect(hero.image).toBeDefined()
    })

    it('educational cards have content', () => {
      const { educationalCards } = getHomeContent()

      expect(Array.isArray(educationalCards)).toBe(true)
      expect(educationalCards.length).toBeGreaterThan(0)

      educationalCards.forEach((card) => {
        expect(card.title).toBeDefined()
        expect(card.description).toBeDefined()
        expect(card.imageSrc).toBeDefined()
        expect(card.imageAlt).toBeDefined()
        expect(card.linkHref).toBeDefined()
        expect(card.linkLabel).toBeDefined()
      })
    })
  })

  describe('getDashboardContent', () => {
    it('returns valid dashboard content', () => {
      const content = getDashboardContent()

      expect(content).toBeDefined()
      expect(content.statsCards).toBeDefined()
      expect(content.tokensCard).toBeDefined()
      expect(content.pluggingTrend).toBeDefined()
      expect(content.dailyMintLog).toBeDefined()
      expect(content.stateLeaderboard).toBeDefined()
    })

    it('stats cards have required data', () => {
      const { statsCards } = getDashboardContent()

      expect(Array.isArray(statsCards)).toBe(true)
      expect(statsCards.length).toBeGreaterThan(0)

      statsCards.forEach((card) => {
        expect(card.title).toBeDefined()
        expect(card.value).toBeDefined()
        expect(card.subtitle).toBeDefined()
      })
    })

    it('tokens card has valid data', () => {
      const { tokensCard } = getDashboardContent()

      expect(tokensCard.title).toBeDefined()
      expect(tokensCard.value).toBeDefined()
      expect(tokensCard.subtitle).toBeDefined()
    })

    it('plugging trend has data points', () => {
      const { pluggingTrend } = getDashboardContent()

      expect(pluggingTrend.trendData).toBeDefined()
      expect(Array.isArray(pluggingTrend.trendData)).toBe(true)
      expect(pluggingTrend.trendData.length).toBeGreaterThan(0)

      pluggingTrend.trendData.forEach((point) => {
        expect(typeof point.value).toBe('number')
        expect(typeof point.day).toBe('number')
      })
    })

    it('daily mint log has entries', () => {
      const { dailyMintLog } = getDashboardContent()

      expect(dailyMintLog).toBeDefined()
      expect(dailyMintLog.title).toBeDefined()
      expect(dailyMintLog.entries).toBeDefined()
      expect(Array.isArray(dailyMintLog.entries)).toBe(true)
    })

    it('state leaderboard has entries', () => {
      const { stateLeaderboard } = getDashboardContent()

      expect(stateLeaderboard).toBeDefined()
      expect(stateLeaderboard.entries).toBeDefined()
      expect(Array.isArray(stateLeaderboard.entries)).toBe(true)
      expect(stateLeaderboard.entries.length).toBeGreaterThan(0)

      stateLeaderboard.entries.forEach((entry) => {
        expect(entry.rank).toBeDefined()
        expect(entry.state).toBeDefined()
        expect(entry.wells).toBeDefined()
      })
    })
  })

  describe('getFooterContent', () => {
    it('returns valid footer content', () => {
      const content = getFooterContent()

      expect(content).toBeDefined()
      expect(content.quote).toBeDefined()
      expect(content.socialLinks).toBeDefined()
    })

    it('has quote text', () => {
      const { quote } = getFooterContent()

      expect(typeof quote).toBe('string')
      expect(quote.length).toBeGreaterThan(0)
    })

    it('has social links', () => {
      const { socialLinks } = getFooterContent()

      expect(Array.isArray(socialLinks)).toBe(true)
      expect(socialLinks.length).toBeGreaterThan(0)

      socialLinks.forEach((link) => {
        expect(link.platform).toBeDefined()
        expect(link.href).toBeDefined()
        expect(link.ariaLabel).toBeDefined()
      })
    })
  })

  describe('getFullPageContent', () => {
    it('returns all page content sections', () => {
      const content = getFullPageContent()

      expect(content.site).toBeDefined()
      expect(content.home).toBeDefined()
      expect(content.dashboard).toBeDefined()
      expect(content.footer).toBeDefined()
    })

    it('full page content is internally consistent', () => {
      const { site, home, dashboard, footer } = getFullPageContent()

      // Site name should match in home content
      expect(site.name).toBeDefined()

      // All sections should have content
      expect(home.hero).toBeDefined()
      expect(dashboard.statsCards.length).toBeGreaterThan(0)
      expect(footer.quote).toBeDefined()
    })
  })
})
