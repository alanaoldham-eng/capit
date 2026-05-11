# API Routes

- `POST /api/batches` validates a JSON batch and returns hashes plus NFT tier assignments.
- `POST /api/art-jobs` starts an Ideogram, manual batch, or placeholder art job.
- `POST /api/metadata` creates OpenSea-compatible metadata for one well.
- `POST /api/safe` prepares Safe transaction data for the OracleMinter.

All routes are server-side surfaces. Provider keys and Safe configuration must remain in environment variables.
