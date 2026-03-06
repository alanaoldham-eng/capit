import { EducationalCard } from "./educational-card"

const educationalContent = [
  {
    title: "What is a Plugged Well?",
    description:
      "Our CAPIT tokens represent plugged, abandoned, capped wells, building a set of verifiable environmental data.",
    imageSrc: "/images/plugged-well.jpg",
    imageAlt: "Illustration of a plugged well",
  },
  {
    title: "Why Does Plugging Wells Matter?",
    description:
      "Plugging reduces methane and protects groundwater, contributing to environmental protection and public health.",
    imageSrc: "/images/why-plugging.jpg",
    imageAlt: "Illustration showing environmental benefits",
  },
  {
    title: "How Many Inactive Wells Remain?",
    description:
      "Estimated 12,000 inactive wells at risk across the US. Approximately 97,000+ wells need to be plugged.",
    imageSrc: "/images/inactive-wells.jpg",
    imageAlt: "Map showing inactive wells across US",
  },
]

export function EducationalSection() {
  return (
    <section className="w-full py-12 px-6 lg:px-12 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationalContent.map((item, index) => (
            <EducationalCard
              key={index}
              title={item.title}
              description={item.description}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
