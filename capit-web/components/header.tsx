'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import type { SiteContent } from '@/lib/types'

interface HeaderProps {
  content?: SiteContent
  site?: SiteContent
}

const FALLBACK_NAV = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'States', href: '/states' },
  { label: 'About', href: '/about' },
  { label: 'FAQs', href: '/faqs' },
]

export function Header({ content, site }: HeaderProps) {
  const siteData = content || site
  const logoSrc = siteData?.logo?.src || siteData?.logoUrl || '/images/CAPIT-LOGO-large_3x.png'
  const logoAlt = siteData?.logo?.alt || siteData?.title || siteData?.name || 'CAPIT Ecosystem'

  // Navigation comes from content/site.json so it stays editable in Tina.
  const navigation = siteData?.navigation?.length ? siteData.navigation : FALLBACK_NAV
  const ctaLabel = siteData?.ctaButton?.label || 'Buy CAPIT'
  const ctaHref = siteData?.ctaButton?.href || '/#swap'

  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-3 px-4 sm:h-24 sm:px-6 lg:h-28 lg:px-12 xl:px-20">
        {/* Logo scales down on narrow viewports instead of overflowing the bar. */}
        <Link href="/" className="flex min-w-0 items-center py-2" aria-label="CAPIT homepage">
          {logoSrc ? (
            <div className="relative h-12 w-36 sm:h-20 sm:w-56 lg:h-24 lg:w-72">
              <Image
                src={logoSrc}
                alt={logoAlt}
                fill
                sizes="(max-width: 640px) 144px, (max-width: 1024px) 224px, 288px"
                className="object-contain object-left"
                priority
              />
            </div>
          ) : (
            <span className="text-2xl font-black tracking-tight text-[#24544A] sm:text-3xl">
              {siteData?.name || siteData?.title || 'CAPIT'}
            </span>
          )}
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-bold text-muted-foreground md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href={ctaHref}
            className="inline-flex items-center justify-center rounded-xl bg-[#FABE3C] px-4 py-2.5 text-xs font-black text-neutral-900 shadow-sm transition-all hover:bg-[#e5aa2b] active:scale-95 sm:px-6 sm:py-3"
          >
            {ctaLabel}
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-xl border border-border/60 p-2.5 text-[#24544A] transition-colors hover:bg-muted md:hidden"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer: without this, States/About/FAQs were unreachable on phones. */}
      <nav
        id="mobile-nav"
        hidden={!menuOpen}
        className="border-t border-border/60 bg-background px-4 pb-4 pt-2 md:hidden"
      >
        <ul className="flex flex-col">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-border/40 py-3 text-sm font-bold text-[#24544A] last:border-0"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
