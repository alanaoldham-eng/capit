import { ContentPageTemplate } from "@/components/content-page-template"

export default function FaqsPage() {
  return (
    <ContentPageTemplate
      eyebrow="FAQs"
      title="Frequently asked questions"
      intro="This placeholder FAQ page gives CAPIT a destination for launch-day questions, token education, and investor or community onboarding copy."
      sections={[
        {
          heading: "How should this page be used?",
          body: [
            "Use this page for the questions your audience will actually ask on launch week: what CAPIT is, how the token concept works, where the data comes from, and what users should expect next.",
            "For now, this sample content simply proves the page routing and content structure are ready for expansion."
          ]
        },
        {
          heading: "Can the content be edited later?",
          body: [
            "Yes. Because the site is already content-driven and Tina-ready for local editing, your team can continue expanding these pages without rebuilding the design system from scratch.",
            "That keeps launch copy flexible while preserving engineering control over the application shell."
          ]
        }
      ]}
    />
  )
}
