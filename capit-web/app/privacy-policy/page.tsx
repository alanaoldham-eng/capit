import { ContentPageTemplate } from "@/components/content-page-template"

export default function PrivacyPolicyPage() {
  return (
    <ContentPageTemplate
      eyebrow="Privacy Policy"
      title="Sample privacy policy"
      intro="This is placeholder legal copy for the CAPIT website. Replace it with attorney-reviewed language before launch."
      sections={[
        {
          heading: "Information collection",
          body: [
            "This sample page exists to prove the legal page routing and styling are in place. Replace this paragraph with real privacy policy language covering analytics, wallet interactions, cookies, and any contact forms you later enable.",
            "Until then, treat this content as structural placeholder text only."
          ]
        },
        {
          heading: "Use of information",
          body: [
            "Document how the CAPIT website uses visitor information, including analytics, newsletter signups, customer support, and any future wallet connection telemetry that may be introduced.",
            "Keep production legal content version-controlled just like the rest of the site."
          ]
        }
      ]}
    />
  )
}
