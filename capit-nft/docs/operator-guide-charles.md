# Operator Guide for Charles

## Monthly mint checklist

1. Export the verified plugged/capped well list from the source registry.
2. Convert it to the CAPIT spreadsheet format in `sample-data/sample-well-batch.csv`.
3. Upload the spreadsheet in the Admin Dashboard.
4. Resolve validation errors and duplicates.
5. Review automatic tier assignments:
   - `registry_only` for normal infrastructure receipts.
   - `premium_candidate` for high-signal story/art wells.
   - `genesis_candidate` only for approved launch artifacts.
6. Export Ideogram batch CSV for Premium/Genesis art if automated API generation is not being used.
7. Upload finished artwork or allow the provider pipeline to store image URIs.
8. Generate metadata and pin to IPFS.
9. Run the Base Sepolia dry-run and confirm it mints one CAPIT token per well.
10. Prepare the Safe transaction.
11. Have the required Safe signers review and execute on Base mainnet.
12. Export the receipt and store it with the source spreadsheet.

## Important warnings

- Never upload private keys to the dashboard.
- Never mint production transactions without a successful dry-run.
- Never change the mint ratio: one verified plugged/capped well maps to one CAPIT token.
- Premium and Genesis status are art/community layers, not extra CAPIT supply.
