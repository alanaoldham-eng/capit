import { ContentPageTemplate } from "@/components/content-page-template"

export default function StatesPage() {
  return (
    <ContentPageTemplate
      eyebrow="State View"
      title="State-by-state plugging progress"
      intro="This placeholder page is reserved for future state leaderboard details, downloadable reports, and deeper analytics."
      sections={[
        {
          heading: "Future expansion",
          body: [
            "A dedicated state page gives CAPIT room to show rankings, historical progress, downloadable data, and narrative context around the regions that are leading or lagging in plugged well activity.",
            "For launch, the page acts as a clean destination so the homepage CTA does not dead-end."
          ]
        },
        {
          heading: "Potential data modules",
          body: [
            "This page can later support filters by state, month, well type, or source. It can also become the destination for interactive charts and educational explanations of the underlying reporting methodology.",
            "The current placeholder text keeps the routing intact while those modules are still in progress."
          ]
        }
      ]}
    />
  )
}
