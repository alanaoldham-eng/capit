import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { EducationalCardContent } from "@/lib/types"

type EducationalCardProps = EducationalCardContent

export function EducationalCard({
  title,
  description,
  imageSrc,
  imageAlt,
  linkHref,
  linkLabel,
}: EducationalCardProps) {
  return (
    <article className="bg-card rounded-xl overflow-hidden shadow-sm border border-border flex flex-col h-full">
      {/* Title at top */}
      <div className="px-5 pt-5 pb-3">
        <h3 className="text-lg font-bold text-foreground leading-snug">{title}</h3>
      </div>
      
      {/* Image */}
      <div className="px-5">
        <div className="relative h-40 w-full rounded-lg overflow-hidden">
          <Image src={imageSrc} alt={imageAlt} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px" className="object-cover" />
        </div>
      </div>
      
      {/* Description and CTA */}
      <div className="p-5 pt-4 flex flex-col flex-grow">
        <p className="text-sm text-muted-foreground leading-relaxed flex-grow min-h-[3rem]">
          {description}
        </p>
        <Link
          href={linkHref}
          className="mt-5 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-sm uppercase tracking-wide"
        >
          {linkLabel}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
