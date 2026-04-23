import { ContentPageTemplate } from "@/components/content-page-template"

export default function InactiveWellsRemainPage() {
  return (
    <ContentPageTemplate
      eyebrow="Education"
      title="How many inactive wells remain?"
      intro="This placeholder page is reserved for future data storytelling around inactive wells, priority regions, and the scale of remediation still ahead."
      sections={[
        {
          heading: "The national picture",
          body: [
            "One of the strongest future features for CAPIT is a visual, state-by-state picture of inactive well burdens and plugging progress. This route gives the site a dedicated destination for that story.",
            "A separate page is easier to expand with maps, charts, citations, and narrative copy than a compressed homepage card."
          ]
        },
        {
          heading: "How this supports the product",
          body: [
            "This page can evolve into a bridge between high-level marketing and deeper analytics. It can also host source notes, definitions, and snapshots from future CAPIT dashboards.",
            "For launch prep, sample copy here is enough to support polished navigation and complete page flow."
          ]
        }
      ]}
    />
  )
}
