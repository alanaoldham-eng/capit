# SECURITY_NOTES

Cardano OnboardKit v001 is an onboarding UX prototype, not a production custody or transaction service.

## Identity boundaries

- Email is a login identity for the demo experience, not a cryptographic wallet identity.
- A user profile saved by this app does not prove wallet ownership unless the connected wallet explicitly signs or authorizes a future production challenge.

## Key custody

- There is no server-side key custody in v001.
- The app does not create, store, recover, or manage real private keys.
- Do not store seed phrases in `localStorage`, a database, server logs, analytics tools, or support systems.
- Production embedded wallet functionality requires passkey/device-secured encryption, recovery design, threat modeling, monitoring, and an external security review before release.

## Sponsored transactions

- Sponsored transaction UX in v001 is a mock quote only.
- Production sponsored transactions require ADA sponsor wallet controls, UTXO management, rate limits, abuse prevention, transaction simulation, wallet segregation, operational monitoring, and clear user consent.

## Asset claims

- v001 records claims locally in the browser.
- v001 does not mint, send, lock, burn, or manage native Cardano assets.
- Production minting requires policy design, signing controls, metadata validation, transaction building, chain indexing, and failure recovery.

## Service disclaimer

This app does not provide financial, investment, or custody services. It is not a wallet provider, broker, exchange, or regulated financial service.
