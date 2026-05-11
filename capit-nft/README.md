# CAPIT Hybrid NFT Architecture + Admin Platform

CAPIT NFT is an operational platform and public registry for the CAPIT plugged-well ecosystem. It is **not** a public mint site.

## Non-negotiable invariant

**1 verified plugged/capped U.S. oil or gas well = 1 CAPIT token minted.**

Registry, Premium, and Genesis NFTs are layered records and collectibles. They never change CAPIT ERC-20 supply mechanics.

## Asset architecture

| Asset | Quantity | Role |
| --- | --- | --- |
| CAPIT token | ~1.8M max eventually | One fungible token per verified plugged well |
| Registry NFTs | All wells eventually | Audit/provenance receipts |
| Premium NFTs | Curated subset | Collectible storytelling |
| Genesis NFTs | Small launch set | Scarcity and community artifacts |

## Folder architecture

- `app/admin` — internal operator dashboard for spreadsheet upload, tier review, metadata/art orchestration, dry-run, Safe preparation, and receipts.
- `app/explorer` — public registry search and activity explorer.
- `app/gallery` — public Premium and Genesis collectible gallery.
- `app/api` — route handlers for batch validation, metadata generation, art jobs, and Safe transaction preparation.
- `batch` — command-line metadata and Ideogram CSV exporters.
- `contracts` — reference Solidity architecture for registry, NFTs, and Safe-only OracleMinter.
- `db/schema.sql` — PostgreSQL schema for admin users, batches, wells, NFT records, art jobs, transactions, and audit logs.
- `lib/art` — Ideogram, manual batch, and placeholder provider abstraction.
- `lib/blockchain` — Base Sepolia dry-run and Safe transaction helpers.
- `lib/metadata` — proof hashing and OpenSea-compatible metadata generation.
- `lib/tiers` — automatic NFT tier assignment rules with admin override support.
- `sample-data` — Charles's sample spreadsheet format.
- `examples` — example metadata, prompts, and audit reports.

## Admin workflow

1. Upload monthly plugged-well spreadsheet.
2. Validate required fields and duplicate API numbers.
3. Generate `api_number_hash`, `well_id_hash`, and `proof_hash`.
4. Assign `registry_only`, `premium_candidate`, or `genesis_candidate`.
5. Allow admin override before metadata immutability.
6. Generate Registry metadata for all validated wells.
7. Generate Premium/Genesis prompts for curated candidates.
8. Generate art via Ideogram API, manual Ideogram batch CSV, or placeholder provider.
9. Upload metadata/art to IPFS.
10. Dry-run on Base Sepolia.
11. Prepare a Safe multisig transaction for Base mainnet.
12. Execute production mint and export receipt.

## Development

```bash
cd capit-nft
npm install
npm run typecheck
npm run export:ideogram
npm run generate:metadata
```

## Spreadsheet format

Use `sample-data/sample-well-batch.csv`. Required columns include `api_number`, `state`, `county`, `operator`, `plug_date`, and `source_url`. Optional columns include coordinates, plugging cost estimate, methane reduction estimate, depth, offshore flag, launch batch flag, and notes.

## Security model

- Production mint execution is Safe multisig-only.
- Duplicate API hashes are rejected.
- Base Sepolia dry-run is required before mainnet preparation.
- Frontend never stores private keys.
- Provider API keys stay server-side.
- Metadata is treated as immutable after mint.
- Audit logs are hash-chained.
