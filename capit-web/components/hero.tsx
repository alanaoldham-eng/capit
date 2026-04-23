import Image from "next/image"
import Link from "next/link"
import type { HeroContent } from "@/lib/types"

interface HeroProps {
  content: HeroContent
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#F8F7F2] px-6 pb-14 pt-10 lg:px-12 lg:pb-16 lg:pt-14 xl:px-16 xl:pb-20">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#EEF0E5]/85" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px]">
        <div className="relative min-h-[560px] overflow-hidden rounded-[36px] bg-[linear-gradient(180deg,#fbfaf5_0%,#f1f0e7_72%,#e7eadc_100%)] px-8 py-10 shadow-[0_30px_80px_rgba(15,56,41,0.08)] sm:px-10 lg:min-h-[620px] lg:px-12 lg:py-14 xl:px-16 xl:py-16">
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58%] lg:block" aria-hidden="true">
            <div className="absolute inset-y-0 left-[-14%] right-0 rounded-l-[48px] bg-gradient-to-r from-[#F8F7F2] via-[#F8F7F2]/70 to-transparent" />
            <div className="absolute inset-y-0 left-[6%] right-[-2%] overflow-hidden rounded-[36px]">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 62vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.65),transparent_28%),linear-gradient(90deg,rgba(248,247,242,0.95)_0%,rgba(248,247,242,0.28)_36%,rgba(248,247,242,0)_62%)]" />
            </div>
          </div>

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)]">
            <div className="max-w-[560px] space-y-6 pt-2 lg:space-y-7 lg:pt-6">
              <h1 className="max-w-[620px] text-5xl font-black leading-[0.95] tracking-[-0.04em] text-primary sm:text-6xl lg:text-[74px] xl:text-[82px]">
                {content.headline}
                <br />
                <span className="text-primary">{content.headlineHighlight}</span>
              </h1>

              <p className="max-w-[480px] text-lg leading-9 text-foreground/78 lg:text-[21px] lg:leading-10">
                {content.description}
              </p>

              <Link
                href={content.ctaButton.href}
                className="inline-flex items-center rounded-2xl border border-[#D39E1F] bg-secondary px-8 py-4 text-sm font-black uppercase tracking-[0.12em] text-primary shadow-[0_16px_30px_rgba(210,167,39,0.24)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/95 hover:shadow-[0_20px_36px_rgba(210,167,39,0.28)]"
              >
                {content.ctaButton.label}
              </Link>
            </div>

            <div className="relative mx-auto block h-[320px] w-full max-w-[520px] overflow-hidden rounded-[28px] bg-[#EEF0E7] shadow-[0_20px_50px_rgba(16,56,41,0.08)] lg:hidden">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="100vw"
                priority
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
