'use client'

import React from 'react'
import Link from 'next/link'
import type { FooterContent, SiteContent } from '@/lib/types'

interface FooterProps {
  site?: SiteContent
  content?: FooterContent
}

function XIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

export function Footer({ site, content }: FooterProps) {
  const siteName = site?.name || site?.title || 'CAPIT Ecosystem'
  const quote =
    content?.quote ||
    content?.tagline ||
    'Public records first. Protocol transparency always.'

  const defaultLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'States', href: '/states' },
    { label: 'About', href: '/about' },
    { label: 'Methodology', href: '/methodology' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Buy CAPIT', href: '/#swap' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Use', href: '/terms-of-service' },
  ]

  const links = content?.links?.length ? content.links : defaultLinks

  return (
    <footer className="w-full border-t border-border/60 bg-card py-12 px-4 sm:px-6 lg:px-12 xl:px-20">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3 max-w-2xl">
            <p className="text-xs font-black tracking-widest uppercase text-slate-400">
              {siteName}
            </p>
            <p className="text-sm font-medium leading-relaxed text-slate-500">
              {quote}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://x.com/capittoken"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="CAPIT on X"
              className="text-slate-500 hover:text-primary transition-colors p-2 rounded-lg hover:bg-muted"
            >
              <XIcon className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 pt-6 border-t border-border/40 text-xs text-slate-500">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href || '#'}
              target={link.href?.startsWith('http') ? '_blank' : undefined}
              className="hover:text-primary font-medium transition-colors"
            >
              {link.label || 'Link'}
            </Link>
          ))}
        </div>

        <div className="pt-4 text-[11px] text-slate-400 space-y-2">
          <p>
            {content?.disclaimer ||
              'Data is provided for informational purposes and may be delayed, corrected, or revised.'}
          </p>
          <p>© {new Date().getFullYear()} CAPIT Ecosystem. Tellus Digital LLC.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer