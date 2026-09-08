'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { HeroContent } from '@/lib/types'

interface HeroProps {
  content?: HeroContent
}

export function Hero({ content }: HeroProps) {
  const eyebrow =
    content?.eyebrow || 'PUBLIC WELL-PLUGGING DATA WITH TRANSPARENT ON-CHAIN REPORTING'

  const headline =
    content?.headline ||
    content?.title ||
    'Plug Wells. Mint Tokens.\nTrack Progress.'

  const description =
    content?.description ||
    content?.subtitle ||
    'CAPIT brings together public well-plugging records, state-by-state reporting, and permanent protocol activity on the Base network. Explore the national snapshot, compare states, and review the methodology behind our strict 1:1 environmental infrastructure tracking.'

  const primaryCtaText =
    content?.ctaButton?.label ||
    content?.primaryCtaText ||
    content?.primaryCta?.text ||
    'VIEW DASHBOARD'

  const primaryCtaLink =
    content?.ctaButton?.href ||
    content?.primaryCtaLink ||
    content?.primaryCta?.href ||
    '/#dashboard'

  const secondaryCtaText =
    content?.secondaryCta?.label ||
    content?.secondaryCtaText ||
    content?.secondaryCta?.text ||
    'EXPLORE STATES'

  const secondaryCtaLink =
    content?.secondaryCta?.href ||
    content?.secondaryCtaLink ||
    content?.secondaryCta?.href ||
    '/states'

  const trustNote =
    content?.trustNote ||
    'CAPIT publishes informational content and protocol materials. Please review the methodology, disclosures, and contract details before interacting with any wallet or token feature.'

  const rawImage = content?.image?.src || content?.heroImage?.src || content?.imageSrc

  const initialImageSrc =
    typeof rawImage === 'string' && rawImage.trim().length > 0
      ? rawImage.replace(/^\/public/, '')
      : '/images/cappy-and-well.jpg'

  const [imgSrc, setImgSrc] = useState<string>(initialImageSrc)
  const [hasError, setHasError] = useState<boolean>(false)

  const imageAlt =
    content?.image?.alt ||
    content?.heroImage?.alt ||
    content?.imageAlt ||
    'CAPIT Verified Plugged Well Inspector'

  return (
    <section className="relative w-full bg-[#FAF8F5] py-8 px-4 sm:px-6 lg:px-12 lg:py-12 xl:px-20 border-b border-border/40">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-white p-6 sm:p-10 lg:p-12 shadow-sm min-h-[460px] lg:min-h-[500px] flex items-center">
          
          <div className="absolute inset-y-0 right-0 w-full lg:w-[62%] pointer-events-none z-0">
            {!hasError ? (
              <Image
                src={imgSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover object-right-bottom sm:object-right"
                priority
                onError={() => {
                  console.warn(`[Hero] Missing image asset at ${imgSrc}. Loading fallback asset.`)
                  if (imgSrc !== '/images/CAPIT-LOGO-large_3x.png') {
                    setImgSrc('/images/CAPIT-LOGO-large_3x.png')
                  } else {
                    setHasError(true)
                  }
                }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-transparent via-[#24544A]/10 to-[#24544A]/20" />
            )}
          </div>

          <div className="relative z-10 max-w-full lg:max-w-[52%] space-y-6">
            <div className="inline-flex items-center gap-2 text-[#C0AA4F] text-xs font-black uppercase tracking-wider">
              <span>🛡️</span> {eyebrow}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#24544A] leading-[1.08] whitespace-pre-line">
              {headline}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2 pointer-events-auto">
              <Link
                href={primaryCtaLink}
                className="inline-flex items-center justify-center rounded-xl bg-[#FABE3C] px-6 py-3.5 text-xs font-black text-neutral-900 tracking-wider uppercase transition-all hover:bg-[#e5aa2b] active:scale-95 shadow-sm"
              >
                {primaryCtaText}
              </Link>
              <Link
                href={secondaryCtaLink}
                className="inline-flex items-center justify-center rounded-xl border border-neutral-300 bg-white/90 backdrop-blur-sm px-6 py-3.5 text-xs font-black text-neutral-900 tracking-wider uppercase transition-all hover:bg-white active:scale-95 shadow-sm"
              >
                {secondaryCtaText}
              </Link>
            </div>

            <p className="text-[11px] text-muted-foreground/80 leading-normal pt-2 max-w-lg">
              {trustNote}
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero