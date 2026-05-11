export interface SafeMintPreparation {
  safeAddress: string;
  to: string;
  value: "0";
  data: string;
  operation: 0;
  dryRunNetwork: "base-sepolia";
  productionNetwork: "base-mainnet";
  invariant: "one_verified_plugged_well_one_capit_token";
}

export function prepareOracleMinterSafeTransaction(oracleMinterAddress: string, encodedMintCallData: string): SafeMintPreparation {
  const safeAddress = process.env.SAFE_ADDRESS ?? "0x0000000000000000000000000000000000000000";
  return {
    safeAddress,
    to: oracleMinterAddress,
    value: "0",
    data: encodedMintCallData,
    operation: 0,
    dryRunNetwork: "base-sepolia",
    productionNetwork: "base-mainnet",
    invariant: "one_verified_plugged_well_one_capit_token"
  };
}
