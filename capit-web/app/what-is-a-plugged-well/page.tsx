import { ContentPageTemplate } from "@/components/content-page-template"

export default function WhatIsAPluggedWellPage() {
  return (
    <ContentPageTemplate
      eyebrow="Education"
      title="What is a plugged well?"
      intro="A plugged well is a well that has been properly sealed to reduce environmental risk, improve land safety, and prevent unwanted leakage."
      sections={[
        {
          heading: "Why plugging matters",
          body: [
            "Plugging closes off pathways that can contribute to methane leakage, groundwater contamination, and long-term site hazards. It is one of the clearest real-world markers of remediation progress.",
            "This page is a placeholder destination for a fuller educational article, diagrams, and supporting data sources."
          ]
        },
        {
          heading: "How CAPIT uses the concept",
          body: [
            "CAPIT uses plugged wells as the narrative anchor for the token and dashboard experience. That gives the project a tangible real-world reference point rather than abstract internet-only messaging.",
            "Over time, this page can become a more robust explainer with charts, maps, and references."
          ]
        }
      ]}
    />
  )
}
