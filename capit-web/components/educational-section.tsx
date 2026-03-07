import { EducationalCard } from "./educational-card"
import type { EducationalCardContent } from "@/lib/types"

interface EducationalSectionProps {
  cards: EducationalCardContent[]
}

export function EducationalSection({ cards }: EducationalSectionProps) {
  return (
    <section className="w-full py-12 lg:py-16 px-6 lg:px-12 xl:px-20 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <EducationalCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
