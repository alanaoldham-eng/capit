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
    <article className="bg-card rounded-lg overflow-hidden shadow-sm border border-border/50 flex flex-col h-full hover:shadow-md hover:border-border transition-all duration-200">
      {/* Image with rounded corners and hover effect */}
      <div className="relative h-48 w-full overflow-hidden bg-muted/50">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
          className="object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content with better spacing */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-foreground leading-tight mb-3">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-6">
          {description}
        </p>
        <Link
          href={linkHref}
          className="mt-auto inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200 text-sm uppercase tracking-wide hover:gap-3"
        >
          {linkLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  )
}
