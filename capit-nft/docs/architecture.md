# CAPIT NFT Architecture

CAPIT is designed as “America's plugged well registry meets crypto culture.” The architecture separates environmental counting from collectible scarcity.

## Smart contracts

- `CAPITToken.sol` is the existing ERC-20 token. It mints one unit per verified plugged well.
- `PluggedWellRegistry.sol` records API number hashes, well ID hashes, proof hashes, metadata URIs, and duplicate status.
- `RegistryNFT.sol` / `CAPITNftBase.sol` mints infrastructure receipts.
- `PremiumNFT.sol` mints curated collectible overlays for selected wells.
- `GenesisNFT.sol` mints scarce launch/community artifacts.
- `OracleMinter.sol` is called by the Safe, records proof hashes, prevents duplicates through the registry, mints one CAPIT token, and mints any required NFT layer.

## NFT flows

### Registry NFT flow

Every verified well can receive one registry receipt. Art can be placeholder, procedural GIS, or a low-cost generated layout. Metadata prioritizes audit fields and OpenSea compatibility.

### Premium NFT flow

Only curated wells become Premium NFT candidates. Rules identify super emitters, first-in-state wells, offshore wells, deep wells, high methane estimates, and manually promoted records. Premium art uses cinematic GIS, industrial Americana, methane visualization, and Base-chain motifs.

### Genesis NFT flow

Genesis candidates are a small launch set. They are scarce community artifacts and never imply a different CAPIT mint ratio.

## Data pipeline

Spreadsheet ingestion normalizes rows, validates schema, computes hashes, assigns tiers, creates metadata, creates art jobs, uploads assets, dry-runs on Base Sepolia, prepares Safe calldata, and records immutable audit events.
