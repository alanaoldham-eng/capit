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
    <article className="bg-card rounded-xl overflow-hidden shadow-sm border border-border flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="p-5 pb-0">
        <h3 className="text-lg font-bold text-foreground mb-3">{title}</h3>
      </div>
      <div className="relative h-40 w-full px-5">
        <div className="relative h-full w-full rounded-lg overflow-hidden">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover" />
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
          {description}
        </p>
        <Link
          href={linkHref}
          className="mt-4 flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity w-fit text-sm"
        >
          {linkLabel}
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
