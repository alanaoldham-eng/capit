import { ContentPageTemplate } from "@/components/content-page-template"

export default function TermsOfServicePage() {
  return (
    <ContentPageTemplate
      eyebrow="Terms of Service"
      title="Sample terms of service"
      intro="This is placeholder legal copy for the CAPIT website. Replace it with final attorney-reviewed terms before launch."
      sections={[
        {
          heading: "Website use",
          body: [
            "Use this page for the site usage terms, disclaimers, risk language, external-link disclosures, and any future product or dashboard terms that CAPIT requires.",
            "For the demo, this placeholder content shows the page flow and visual system are already established."
          ]
        },
        {
          heading: "No investment advice",
          body: [
            "If your legal counsel requires disclaimer language around token access, swaps, or educational content, this page is the correct home for it.",
            "Keeping the page live now makes future launch polishing much easier."
          ]
        }
      ]}
    />
  )
}
