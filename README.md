# cardano-onboardkit-v001

Cardano OnboardKit v001 is a deployable Next.js prototype for Cardano-native onboarding. It demonstrates how a dApp can start with email, invite users to connect an existing Cardano wallet, show claim links, and explain sponsored transaction UX without pretending unfinished custody, gas, or minting systems are production-ready.

The product has two identities:

- **Cardano OnboardKit**: the developer/platform layer for Cardano dApps.
- **Cardano Passport**: the consumer-facing demo app that proves the onboarding flow.

## What v001 includes

- Email-first onboarding profile stored in `localStorage`.
- Native Cardano browser wallet connection through CIP-30 using Mesh SDK.
- Claim pages that record local demo claims.
- Native Cardano badge/pass/reward concepts represented as local records.
- Sponsored transaction UX scaffolding with mock fee quotes.
- Project dashboard for creating local demo campaigns and exporting local claim CSVs.
- Static mock data and API routes that deploy cleanly to Vercel without a database.

## What v001 does not include

- No production embedded wallets.
- No server-side key custody.
- No seed phrase storage.
- No Supabase or database.
- No smart contracts or Aiken code.
- No native asset minting or transfer.
- No real sponsored transaction submission.
- No Thirdweb, Ethereum, EVM, Solidity, ERC contracts, or Milkomeda dependencies.

## Local setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For a production check:

```bash
npm run build
npm run start
```

## Environment variables

Copy `.env.example` to `.env.local` for local development.

```bash
NEXT_PUBLIC_CARDANO_NETWORK=preprod
NEXT_PUBLIC_BLOCKFROST_PROJECT_ID=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Only `NEXT_PUBLIC_` variables are used client-side. Do not expose server secrets to the browser.

## Vercel deployment steps

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Create a new Vercel project from the repository.
3. Use the default Next.js framework settings.
4. Add environment variables from `.env.example` in Vercel Project Settings.
5. Set `NEXT_PUBLIC_APP_URL` to the production URL after the first deploy.
6. Deploy. No database provisioning is required for v001.

## Known limitations

- Browser data is stored locally and is lost when users clear site data or switch browsers.
- Claim records are local-only and are not synced across devices.
- Wallet connection depends on a CIP-30 compatible browser wallet extension.
- Sponsored transaction quotes are mock data only.
- Production minting, custody, project authentication, API keys, and abuse prevention are not implemented.

## v002 priorities

- Real backend database.
- Passkey-based embedded wallet research/prototype.
- Blockfrost or Maestro integration.
- Preprod native asset minting.
- Claim QR codes.
- Project auth.
- Abuse prevention.
