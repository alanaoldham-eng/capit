import { EducationalCard } from "./educational-card"
import type { EducationalCardContent } from "@/lib/types"

interface EducationalSectionProps { cards: EducationalCardContent[] }

export function EducationalSection({ cards }: EducationalSectionProps) {
  return (
    <section className="w-full bg-background px-6 py-16 lg:px-12 lg:py-20 xl:px-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => <EducationalCard key={card.title} {...card} />)}
        </div>
      </div>
    </section>
  )
}
