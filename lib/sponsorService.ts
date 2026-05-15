import type { SponsorQuote } from "./types";

export function getMockSponsorQuote(): SponsorQuote {
  return {
    sponsored: true,
    estimatedFeeAda: "0.18",
    minUtxoAda: "1.5",
    mode: "mock",
    note: "v001 quote only. No transaction submitted.",
  };
}
