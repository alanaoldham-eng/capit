CREATE TYPE nft_tier AS ENUM ('registry_only', 'premium_candidate', 'genesis_candidate');
CREATE TYPE mint_status AS ENUM ('draft', 'validated', 'dry_run_passed', 'safe_prepared', 'minted', 'failed');
CREATE TYPE art_status AS ENUM ('not_required', 'pending', 'manual_exported', 'generating', 'ready', 'failed');
CREATE TYPE admin_role AS ENUM ('owner', 'operator', 'reviewer', 'auditor');

CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  wallet_address TEXT UNIQUE NOT NULL,
  role admin_role NOT NULL DEFAULT 'reviewer',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE mint_batches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_name TEXT NOT NULL,
  source_filename TEXT NOT NULL,
  status mint_status NOT NULL DEFAULT 'draft',
  created_by UUID REFERENCES admin_users(id),
  dry_run_required BOOLEAN NOT NULL DEFAULT TRUE,
  dry_run_passed_at TIMESTAMPTZ,
  safe_tx_hash TEXT,
  receipt_export_uri TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE plugged_wells (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_number TEXT NOT NULL,
  api_number_hash TEXT UNIQUE NOT NULL,
  well_id_hash TEXT UNIQUE NOT NULL,
  proof_hash TEXT UNIQUE NOT NULL,
  state CHAR(2) NOT NULL,
  county TEXT NOT NULL,
  operator TEXT NOT NULL,
  plug_date DATE NOT NULL,
  source_url TEXT NOT NULL,
  latitude NUMERIC(10,7),
  longitude NUMERIC(10,7),
  plugging_cost_estimate_usd NUMERIC(14,2),
  methane_reduction_estimate_tons_co2e NUMERIC(14,4),
  depth_feet INTEGER,
  is_offshore BOOLEAN NOT NULL DEFAULT FALSE,
  nft_tier nft_tier NOT NULL DEFAULT 'registry_only',
  metadata_uri TEXT,
  image_uri TEXT,
  token_id NUMERIC(78,0),
  mint_status mint_status NOT NULL DEFAULT 'draft',
  art_status art_status NOT NULL DEFAULT 'not_required',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT one_capit_per_verified_well UNIQUE (api_number_hash)
);

CREATE TABLE mint_batch_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mint_batch_id UUID NOT NULL REFERENCES mint_batches(id) ON DELETE CASCADE,
  plugged_well_id UUID NOT NULL REFERENCES plugged_wells(id),
  row_number INTEGER NOT NULL,
  validation_errors JSONB NOT NULL DEFAULT '[]'::jsonb,
  tier_override nft_tier,
  UNIQUE (mint_batch_id, plugged_well_id)
);

CREATE TABLE registry_nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plugged_well_id UUID UNIQUE NOT NULL REFERENCES plugged_wells(id),
  token_id NUMERIC(78,0) UNIQUE,
  contract_address TEXT NOT NULL,
  metadata_uri TEXT NOT NULL,
  minted_at TIMESTAMPTZ
);

CREATE TABLE premium_nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plugged_well_id UUID UNIQUE NOT NULL REFERENCES plugged_wells(id),
  token_id NUMERIC(78,0) UNIQUE,
  contract_address TEXT NOT NULL,
  rarity_tier TEXT NOT NULL DEFAULT 'curated',
  story TEXT,
  metadata_uri TEXT NOT NULL,
  minted_at TIMESTAMPTZ
);

CREATE TABLE genesis_nfts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plugged_well_id UUID UNIQUE REFERENCES plugged_wells(id),
  token_id NUMERIC(78,0) UNIQUE,
  contract_address TEXT NOT NULL,
  edition_name TEXT NOT NULL,
  metadata_uri TEXT NOT NULL,
  minted_at TIMESTAMPTZ
);

CREATE TABLE nft_metadata (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plugged_well_id UUID REFERENCES plugged_wells(id),
  collection_layer TEXT NOT NULL CHECK (collection_layer IN ('registry', 'premium', 'genesis')),
  metadata_json JSONB NOT NULL,
  metadata_uri TEXT,
  immutable_after_mint BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE nft_art_jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plugged_well_id UUID REFERENCES plugged_wells(id),
  provider TEXT NOT NULL,
  prompt TEXT NOT NULL,
  style TEXT NOT NULL,
  provider_job_id TEXT,
  status art_status NOT NULL DEFAULT 'pending',
  image_uri TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE mint_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mint_batch_id UUID REFERENCES mint_batches(id),
  network TEXT NOT NULL CHECK (network IN ('base-sepolia', 'base-mainnet')),
  safe_address TEXT NOT NULL,
  oracle_minter_address TEXT NOT NULL,
  transaction_hash TEXT,
  safe_tx_hash TEXT,
  status mint_status NOT NULL,
  capit_amount NUMERIC(78,0) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_admin_user_id UUID REFERENCES admin_users(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  payload JSONB NOT NULL,
  previous_hash TEXT,
  event_hash TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX plugged_wells_search_idx ON plugged_wells (state, county, nft_tier, plug_date);
CREATE INDEX plugged_wells_methane_idx ON plugged_wells (methane_reduction_estimate_tons_co2e DESC NULLS LAST);
CREATE INDEX audit_logs_entity_idx ON audit_logs (entity_type, entity_id, created_at DESC);
