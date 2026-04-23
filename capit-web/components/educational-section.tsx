import { EducationalCard } from "./educational-card"
import type { EducationalCardContent } from "@/lib/types"

interface EducationalSectionProps {
  cards: EducationalCardContent[]
}

export function EducationalSection({ cards }: EducationalSectionProps) {
  return (
    <section className="w-full bg-[#F6F5EF] px-6 py-16 lg:px-12 lg:py-20 xl:px-16">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => (
            <EducationalCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
