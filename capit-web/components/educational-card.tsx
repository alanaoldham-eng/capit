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
    <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-border/70 bg-card shadow-[0_18px_40px_rgba(15,56,41,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(15,56,41,0.08)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border/60 bg-[#F7F7F2]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 420px"
          className="object-contain p-3 transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>

      <div className="flex flex-grow flex-col p-6">
        <h3 className="mb-3 text-[32px] font-black leading-[1.05] tracking-[-0.04em] text-foreground">{title}</h3>
        <p className="mb-6 flex-grow text-[15px] leading-7 text-muted-foreground">{description}</p>
        <Link
          href={linkHref}
          className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-[0.12em] text-primary-foreground shadow-sm transition-all duration-200 hover:bg-primary/92 hover:shadow-md"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  )
}
