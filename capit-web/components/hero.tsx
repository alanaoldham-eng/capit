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
        <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-primary/10 ring-1 ring-border/60 lg:min-h-[500px]">
          <Image
            src={content.image.src}
            alt={content.image.alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
            className="object-cover object-[62%_center] opacity-55 sm:opacity-65 lg:opacity-100"
          />

          {/* Stronger responsive readability layers. Desktop keeps the mockup-like artwork sweep; mobile keeps copy legible. */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-white via-white/90 to-white/60 sm:bg-gradient-to-r sm:from-white sm:via-white/90 sm:via-[48%] sm:to-white/8"
            aria-hidden="true"
          />
          <div
            className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_15%_82%,rgba(234,181,62,0.18),transparent_34%)] sm:w-2/3"
            aria-hidden="true"
          />

          <div className="relative z-10 flex min-h-[650px] flex-col justify-center px-7 py-10 sm:min-h-[600px] sm:px-10 md:px-12 lg:min-h-[500px] lg:max-w-[560px] lg:px-16 lg:py-14 xl:max-w-[620px]">
            {content.eyebrow ? (
              <p className="mb-5 max-w-[32rem] text-[0.72rem] font-black uppercase leading-6 tracking-[0.22em] text-secondary sm:text-xs">
                {content.eyebrow}
              </p>
            ) : null}

            <h1 className="max-w-[12ch] text-4xl font-black leading-[1.02] tracking-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              {content.headline}
              <br />
              {content.headlineHighlight}
            </h1>

            <p className="mt-6 max-w-[29rem] text-base leading-8 text-primary/78 sm:text-[1.05rem] lg:text-base">
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
                  className="inline-flex justify-center rounded-xl border border-primary/15 bg-white/85 px-7 py-3.5 text-sm font-black uppercase tracking-wide text-primary shadow-sm transition hover:bg-white"
                >
                  {content.secondaryCta.label}
                </Link>
              ) : null}
            </div>

            {content.trustNote ? (
              <p className="mt-5 max-w-[31rem] text-xs leading-6 text-muted-foreground sm:text-[0.8rem]">
                {content.trustNote}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
