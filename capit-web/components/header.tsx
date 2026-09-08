'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import type { SiteContent } from '@/lib/types'

interface HeaderProps {
  content?: SiteContent
  site?: SiteContent
}

export function Header({ content, site }: HeaderProps) {
  const siteData = content || site
  const logoSrc = siteData?.logo?.src || siteData?.logoUrl || '/images/CAPIT-LOGO-large_3x.png'
  const logoAlt = siteData?.logo?.alt || siteData?.title || siteData?.name || 'CAPIT Ecosystem'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-28 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Prominent Scaled Logo */}
        <Link href="/" className="flex items-center shrink-0 py-2" aria-label="CAPIT homepage">
          {logoSrc ? (
            <div className="relative h-20 w-64 sm:h-24 sm:w-72">
              <Image
                src={logoSrc}
                alt={logoAlt}
                fill
                sizes="288px"
                className="object-contain object-left"
                priority
              />
            </div>
          ) : (
            <span className="text-3xl font-black tracking-tight text-[#24544A]">
              {siteData?.name || siteData?.title || 'CAPIT'}
            </span>
          )}
        </Link>

        {/* Navigation Bar */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-muted-foreground">
          <Link href="/#dashboard" className="hover:text-foreground transition-colors">
            Dashboard
          </Link>
          <Link href="/states" className="hover:text-foreground transition-colors">
            States
          </Link>
          <Link href="/about" className="hover:text-foreground transition-colors">
            About
          </Link>
          <Link href="/faqs" className="hover:text-foreground transition-colors">
            FAQs
          </Link>
        </nav>

        {/* Primary CTA - Anchor to Homepage Swap Widget */}
        <div className="flex items-center gap-3">
          <Link
            href="/#swap"
            className="inline-flex items-center justify-center rounded-xl bg-[#FABE3C] px-6 py-3 text-xs font-black text-neutral-900 transition-all hover:bg-[#e5aa2b] active:scale-95 shadow-sm"
          >
            Buy CAPIT
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header