import Image from "next/image"
import Link from "next/link"
import type { HeroContent } from "@/lib/types"

interface HeroProps {
  content: HeroContent
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-background px-6 py-14 lg:px-12 xl:px-20">
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-muted/50" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl">
        <div className="relative min-h-[520px] overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-primary/10 ring-1 ring-border/60">
          <Image src={content.image.src} alt={content.image.alt} fill priority sizes="(max-width: 1024px) 100vw, 1280px" className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/92 via-[43%] to-white/5" aria-hidden="true" />
          <div className="absolute inset-y-0 left-0 w-2/3 bg-[radial-gradient(circle_at_20%_80%,rgba(234,181,62,0.16),transparent_38%)]" aria-hidden="true" />

          <div className="relative z-10 flex min-h-[520px] max-w-xl flex-col justify-center px-8 py-12 md:px-12 lg:px-16">
            {content.eyebrow ? (
              <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-secondary">
                {content.eyebrow}
              </p>
            ) : null}
            <h1 className="text-5xl font-black leading-[0.98] tracking-tight text-primary md:text-6xl lg:text-7xl">
              {content.headline}
              <br />
              {content.headlineHighlight}
            </h1>
            <p className="mt-7 max-w-md text-base leading-8 text-foreground/75">
              {content.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={content.ctaButton.href} className="rounded-xl bg-secondary px-7 py-3.5 text-sm font-black uppercase tracking-wide text-primary shadow-lg shadow-secondary/25 transition hover:-translate-y-0.5 hover:bg-secondary/90">
                {content.ctaButton.label}
              </Link>
              {content.secondaryCta ? (
                <Link href={content.secondaryCta.href} className="rounded-xl border border-primary/15 bg-white/85 px-7 py-3.5 text-sm font-black uppercase tracking-wide text-primary transition hover:bg-white">
                  {content.secondaryCta.label}
                </Link>
              ) : null}
            </div>
            {content.trustNote ? (
              <p className="mt-5 max-w-md text-xs leading-6 text-muted-foreground">
                {content.trustNote}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
