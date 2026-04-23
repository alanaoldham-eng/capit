import { ContentPageTemplate } from "@/components/content-page-template"

export default function WhyPluggingWellsMatterPage() {
  return (
    <ContentPageTemplate
      eyebrow="Education"
      title="Why does plugging wells matter?"
      intro="Plugging wells can reduce methane leakage, improve safety, and support long-term environmental restoration goals."
      sections={[
        {
          heading: "Environmental impact",
          body: [
            "Improperly abandoned wells can create persistent environmental liabilities. Plugging them helps reduce those liabilities and turns invisible infrastructure into measurable remediation progress.",
            "This placeholder page gives CAPIT a dedicated home for environmental storytelling instead of squeezing that detail into a card on the homepage."
          ]
        },
        {
          heading: "Why the story resonates",
          body: [
            "A launch story is stronger when users can quickly understand the why. This page is the place to show why plugging wells matters to communities, landowners, regulators, and environmental audiences.",
            "For now, sample body copy keeps the route active and ready for final editorial polish."
          ]
        }
      ]}
    />
  )
}
