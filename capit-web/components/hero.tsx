import Image from "next/image"
import Link from "next/link"
import type { HeroContent } from "@/lib/types"

interface HeroProps {
  content: HeroContent
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative w-full py-12 lg:py-16 px-6 lg:px-16 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-[1.1] tracking-tight">
              {content.headline}
              <br />
              <span className="text-primary">{content.headlineHighlight}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-lg leading-relaxed">
              {content.description}
            </p>
            <Link
              href={content.ctaButton.href}
              className="inline-flex items-center px-7 py-3 bg-secondary text-primary font-bold rounded-full hover:bg-secondary/90 transition-colors text-sm uppercase tracking-wider shadow-sm"
            >
              {content.ctaButton.label}
            </Link>
          </div>

          {/* Right Illustration */}
          <div className="relative h-[300px] md:h-[400px] lg:h-[480px]">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              className="object-contain object-center"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}
