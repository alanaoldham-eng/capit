import React from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ContentPage from "@/components/page/content-page"
import { RecordsList } from "@/components/records-list"
import { getFooterContent, getPageContent, getSiteContent } from "@/lib/content"
import { getImageSizes } from "@/lib/image-size"
import { getRecords } from "@/lib/records"

/**
 * /records - downloadable source documents.
 *
 * The intro (eyebrow, headline, body, optional hero image) is edited in Tina
 * under Sub Pages -> records. The list itself comes from the Records
 * collection: one JSON file per record in content/records/.
 */
export default async function RecordsPage() {
  const site = getSiteContent()
  const footer = getFooterContent()
  const page = getPageContent("records")
  const records = getRecords()

  const imageSizes = await getImageSizes([
    typeof page.heroImage === "string" ? page.heroImage : null,
    ...(page.sections ?? []).map((section) => section.image),
  ])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Header site={site} />
      <main className="flex-1">
        <ContentPage page={page} imageSizes={imageSizes}>
          <RecordsList records={records} />
        </ContentPage>
      </main>
      <Footer site={site} content={footer} />
    </div>
  )
}
