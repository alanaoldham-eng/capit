import { ContentPageTemplate } from "@/components/content-page-template"

export default function AboutPage() {
  return (
    <ContentPageTemplate
      eyebrow="About CAPIT"
      title="About the CAPIT mission"
      intro="CAPIT is a civic-minded meme utility token concept centered on plugged U.S. wells, transparent reporting, and public education about abandoned well remediation."
      sections={[
        {
          heading: "What CAPIT is building",
          body: [
            "CAPIT is designed to translate a complex environmental topic into an accessible digital experience. The site can evolve into a public-facing dashboard, a content hub, and a product landing page for the token ecosystem.",
            "This placeholder page gives your team a clean destination for future launch copy, media coverage, partner messaging, and educational storytelling."
          ]
        },
        {
          heading: "Why this matters",
          body: [
            "Plugged wells are a real-world environmental milestone. CAPIT connects that progress to an internet-native narrative that is easier to understand, easier to share, and easier to remember.",
            "A dedicated About page creates room for sharper positioning, stronger launch messaging, and future updates without cluttering the homepage."
          ]
        }
      ]}
    />
  )
}
