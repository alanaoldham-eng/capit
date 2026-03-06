import Image from "next/image"
import { ArrowRight } from "lucide-react"

interface EducationalCardProps {
  title: string
  description: string
  imageSrc: string
  imageAlt: string
}

export function EducationalCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: EducationalCardProps) {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-grow">
          {description}
        </p>
        <button className="mt-4 flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity w-fit">
          LEARN MORE
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
