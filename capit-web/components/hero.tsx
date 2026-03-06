import Image from "next/image"
import Link from "next/link"
import type { HeroContent } from "@/lib/types"

interface HeroProps {
  content: HeroContent
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative w-full py-16 lg:py-24 xl:py-28 px-6 lg:px-12 xl:px-20 overflow-hidden bg-gradient-to-br from-background via-background to-[hsl(152,30%,92%)]">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-b from-transparent via-transparent to-[hsl(152,25%,85%)]" aria-hidden="true" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-7">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold text-primary leading-[1.08] tracking-tight">
              {content.headline}
              <br />
              <span className="text-primary">{content.headlineHighlight}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              {content.description}
            </p>
            <Link
              href={content.ctaButton.href}
              className="inline-flex items-center px-7 py-3.5 bg-secondary text-primary font-bold rounded-full hover:bg-secondary/90 transition-colors text-sm uppercase tracking-wide shadow-md hover:shadow-lg"
            >
              {content.ctaButton.label}
            </Link>
          </div>

          {/* Right Illustration */}
          <div className="relative h-[320px] md:h-[400px] lg:h-[440px] xl:h-[480px]">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
