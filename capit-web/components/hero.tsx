import Image from "next/image"
import Link from "next/link"
import type { HeroContent } from "@/lib/types"

interface HeroProps {
  content: HeroContent
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative w-full pt-8 pb-16 lg:pt-12 lg:pb-24 px-6 lg:px-12 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-primary leading-[1.1] tracking-tight">
              {content.headline}{" "}
              <span className="block">{content.headlineHighlight}</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              {content.description}
            </p>
            <Link
              href={content.ctaButton.href}
              className="inline-flex items-center px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity text-base uppercase tracking-wide"
            >
              {content.ctaButton.label}
            </Link>
          </div>

          <div className="relative h-[280px] md:h-[380px] lg:h-[450px]">
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
