import type { PluggedWellRecord } from "@/types/capit";

const avoidText = "Avoid cartoon styling, childish aesthetics, fake carbon-credit claims, exaggerated fantasy oil rigs, greenwashing slogans, and unreadable UI text.";

export function registryPrompt(well: PluggedWellRecord): string {
  return `Standardized CAPIT registry NFT image for plugged well ${well.apiNumber} in ${well.county}, ${well.state}: clean GIS map card, county outline, subtle satellite texture, coordinate grid, industrial Americana typography blocks, Base-chain blue accents, verified plugged-well receipt aesthetic, legible audit infrastructure layout. ${avoidText}`;
}

export function premiumPrompt(well: PluggedWellRecord): string {
  return `Cinematic collectible NFT artwork for a verified plugged oil or gas well in ${well.county}, ${well.state}. Blend satellite map overlays, terrain visualization, abandoned wellhead silhouette, methane plume dissolving into clean data particles, industrial Americana, climate-tech command center UI, serious museum-quality realism, premium Base-chain blue glow, rarity-grade atmosphere, highly detailed and visually rich. ${avoidText}`;
}

export function genesisPrompt(well: PluggedWellRecord): string {
  return `CAPIT Genesis launch collectible: America's plugged well archive onchain, heroic industrial Americana landscape in ${well.state}, GIS grid, archival survey marks, capped well monument, early community artifact energy, premium cinematic lighting, Base-chain culture motifs, scarce founder-edition design, serious environmental infrastructure tone. ${avoidText}`;
}
