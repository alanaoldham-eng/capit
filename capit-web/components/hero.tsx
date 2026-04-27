import Image from "next/image"
import Link from "next/link"
import type { HeroContent } from "@/lib/types"

interface HeroProps {
  content: HeroContent
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-background px-4 py-8 sm:px-6 sm:py-12 lg:px-12 lg:py-16 xl:px-20">
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-muted/50" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[1.75rem] border border-border/70 bg-white shadow-2xl shadow-primary/10 lg:min-h-[520px]">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-[58%_center] opacity-28 sm:opacity-45 lg:opacity-100"
          />

          {/* Mobile-first readability veil; desktop preserves the broad mockup-style artwork sweep under the copy. */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-white via-white/95 via-[58%] to-white/72 sm:bg-gradient-to-r sm:from-white sm:via-white/92 sm:via-[48%] sm:to-white/12 lg:to-transparent"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_18%_84%,rgba(234,181,62,0.18),transparent_34%)] sm:w-2/3"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col px-7 py-10 sm:px-10 sm:py-12 md:px-12 lg:min-h-[520px] lg:max-w-[590px] lg:justify-center lg:px-16 lg:py-14 xl:max-w-[640px]">
            {content.eyebrow ? (
              <p className="mb-4 max-w-[32rem] text-[0.68rem] font-black uppercase leading-5 tracking-[0.22em] text-secondary sm:text-xs">
                {content.eyebrow}
              </p>
            ) : null}

            <h1 className="max-w-[12.5ch] text-[3.25rem] font-black leading-[0.98] tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-7xl">
              {content.headline}
              <br />
              {content.headlineHighlight}
            </h1>

            <p className="mt-5 max-w-[31rem] text-[1.08rem] leading-8 text-primary/82 sm:text-[1.05rem] lg:text-base lg:leading-7">
              {content.description}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href={content.ctaButton.href}
                className="inline-flex justify-center rounded-xl bg-secondary px-7 py-3.5 text-sm font-black uppercase tracking-wide text-primary shadow-lg shadow-secondary/25 transition hover:-translate-y-0.5 hover:bg-secondary/90"
              >
                {content.ctaButton.label}
              </Link>
              {content.secondaryCta ? (
                <Link
                  href={content.secondaryCta.href}
                  className="inline-flex justify-center rounded-xl border border-primary/15 bg-white/90 px-7 py-3.5 text-sm font-black uppercase tracking-wide text-primary shadow-sm transition hover:bg-white"
                >
                  {content.secondaryCta.label}
                </Link>
              ) : null}
            </div>

            {content.trustNote ? (
              <p className="mt-6 max-w-[33rem] rounded-2xl bg-white/70 p-4 text-sm leading-7 text-muted-foreground shadow-sm backdrop-blur-sm sm:bg-transparent sm:p-0 sm:text-xs sm:leading-6 sm:shadow-none">
                {content.trustNote}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
