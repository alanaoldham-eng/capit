'use client'

import React from 'react'
import Link from 'next/link'
import { StatsCard } from '@/components/stats-card'
import { TokenResourcesCard } from '@/components/TokenResourcesCard'
import { RecentVerifiedRecords } from '@/components/recent-verified-records'
import { StateLeaderboard } from '@/components/state-leaderboard'
import type { DashboardContent, CtaCardContent } from '@/lib/types'

interface StatsDashboardProps {
  content?: DashboardContent
}

export function StatsDashboard({ content }: StatsDashboardProps) {
  const defaultStats = [
    {
      title: 'VERIFIED PLUGGED-WELL RECORDS',
      value: '1,851,542',
      subtitle: 'Physical infrastructure records that have passed CAPIT’s strict publication and verification rules.',
    },
    {
      title: 'ADDED THIS YEAR',
      value: '2,508',
      subtitle: 'Newly published records successfully tracked and aggregated during 2026.',
    },
  ]

  const stats = content?.statsCards?.length ? content.statsCards.slice(0, 2) : defaultStats
  const stateLeaderboardData = content?.stateLeaderboard || {}

  const ctaCard = content?.ctaCard as CtaCardContent | undefined
  const ctaTitle = ctaCard?.title || 'Add a Call to Action for:'
  const ctaBullets = ctaCard?.bullets || ['Sponsorships', 'Partners', 'Clients']
  const ctaHref = ctaCard?.href || '/sponsorships'

  return (
    <section id="dashboard" className="w-full bg-background py-12 px-4 sm:px-6 lg:px-12 xl:px-20 scroll-mt-24">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Top 3-Card Grid: 2 Stat Cards + 1 Yellow CTA Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((card, idx) => (
            <StatsCard key={idx} {...card} />
          ))}

          {/* Yellow CTA Block */}
          <Link
            href={ctaHref}
            className="bg-[#FABE3C] hover:bg-[#e5aa2b] transition-all rounded-2xl p-6 shadow-sm border border-amber-300 flex flex-col justify-between group active:scale-[0.99]"
          >
            <div className="space-y-3">
              <p className="text-base font-extrabold text-neutral-900 leading-snug">
                {ctaTitle}
              </p>
              <ul className="space-y-1 text-sm font-black text-neutral-900">
                {ctaBullets.map((bullet: string, bIdx: number) => (
                  <li key={bIdx} className="flex items-center gap-1.5">
                    <span className="text-xs">•</span> {bullet}
                  </li>
                ))}
              </ul>
            </div>
            <div className="pt-4 flex items-center justify-between text-xs font-black text-neutral-900 uppercase tracking-wider">
              <span>Get Involved</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </Link>
        </div>

        {/* Bento Dashboard Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
              <TokenResourcesCard content={content?.tokenResourcesCard} />
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <RecentVerifiedRecords content={content?.recentVerifiedRecords} />
            <StateLeaderboard content={stateLeaderboardData} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsDashboard