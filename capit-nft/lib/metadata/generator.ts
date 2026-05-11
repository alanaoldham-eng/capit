import type { HashedWellRecord, OpenSeaMetadata } from "@/types/capit";

export function generateRegistryMetadata(well: HashedWellRecord): OpenSeaMetadata {
  return {
    name: `CAPIT Registry Receipt — ${well.state}-${well.apiNumber}`,
    description: "Public environmental receipt for one verified plugged/capped U.S. oil or gas well. CAPIT uses a strict invariant: one verified plugged well permits exactly one CAPIT token mint. This registry NFT is an audit/provenance layer, not a carbon credit.",
    image: well.imageUri ?? "ipfs://placeholder-registry-map-art",
    external_url: `https://capit.eco/registry/${encodeURIComponent(well.apiNumber)}`,
    attributes: [
      { trait_type: "NFT Tier", value: well.nftTier },
      { trait_type: "State", value: well.state },
      { trait_type: "County", value: well.county },
      { trait_type: "Operator", value: well.operator },
      { trait_type: "Plug Date", value: new Date(well.plugDate).getTime(), display_type: "date" },
      { trait_type: "Proof Hash", value: well.proofHash },
      { trait_type: "Well ID Hash", value: well.wellIdHash },
      { trait_type: "Plugging Cost Estimate USD", value: well.pluggingCostEstimateUsd ?? 0, display_type: "number" },
      { trait_type: "Methane Reduction Estimate tCO2e", value: well.methaneReductionEstimateTonsCo2e ?? 0, display_type: "number" }
    ]
  };
}

export function generatePremiumMetadata(well: HashedWellRecord, imageUri: string): OpenSeaMetadata {
  return {
    ...generateRegistryMetadata({ ...well, imageUri }),
    name: `CAPIT Premium Well Story — ${well.county}, ${well.state}`,
    description: "Curated CAPIT collectible artwork for a selected plugged well with high narrative, environmental, historical, or community significance. Premium NFTs are storytelling overlays and do not change the one-well-one-CAPIT-token supply rule.",
    image: imageUri,
    attributes: [
      ...generateRegistryMetadata(well).attributes,
      { trait_type: "Collection Layer", value: "Premium" },
      { trait_type: "Visual Theme", value: "Industrial Americana GIS" }
    ]
  };
}

export function generateGenesisMetadata(well: HashedWellRecord, imageUri: string): OpenSeaMetadata {
  return {
    ...generatePremiumMetadata(well, imageUri),
    name: `CAPIT Genesis Archive — ${well.state}-${well.apiNumber}`,
    description: "Scarce CAPIT launch artifact from the Genesis set. Genesis NFTs are community collectibles and never alter the CAPIT mint ratio of exactly one token per verified plugged/capped well.",
    attributes: [
      ...generatePremiumMetadata(well, imageUri).attributes,
      { trait_type: "Collection Layer", value: "Genesis" },
      { trait_type: "Launch Artifact", value: true }
    ]
  };
}
