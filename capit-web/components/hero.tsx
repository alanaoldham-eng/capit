import Image from "next/image"
import Link from "next/link"
import type { HeroContent } from "@/lib/types"

interface HeroProps {
  content: HeroContent
}

export function Hero({ content }: HeroProps) {
  return (
    <section className="relative w-full py-12 lg:py-20 px-6 lg:px-12 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background to-transparent z-0" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance">
              {content.headline}{" "}
              <span className="block">{content.headlineHighlight}</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              {content.description}
            </p>
            <Link
              href={content.ctaButton.href}
              className="inline-block px-8 py-3 bg-secondary text-secondary-foreground font-semibold rounded-full hover:opacity-90 transition-opacity text-lg"
            >
              {content.ctaButton.label}
            </Link>
          </div>

          <div className="relative h-[300px] md:h-[400px] lg:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
