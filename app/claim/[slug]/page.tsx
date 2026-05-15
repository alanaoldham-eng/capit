import { notFound } from "next/navigation";
import ClaimFlow from "@/components/ClaimFlow";
import { getMockCampaign, mockCampaigns } from "@/lib/mockCampaigns";

export function generateStaticParams() {
  return mockCampaigns.map((campaign) => ({ slug: campaign.slug }));
}

export default async function ClaimPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const campaign = getMockCampaign(slug);
  if (!campaign) notFound();
  return <div className="container-page py-12"><ClaimFlow campaign={campaign} /></div>;
}
