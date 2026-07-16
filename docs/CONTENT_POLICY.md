# Public Content Policy

## Principle

The portfolio follows **evidence over assertion**. A claim is publishable only
when it is public-approved, accurately scoped, and supported by a link, artifact,
or explicit source record.

The repository is public. Raw Atlas Vault material is never copied wholesale and
the app never reads Atlas at runtime or during CI.

## Allowed profile fields

- Public name: Wildan Syukri Niam.
- Public location: Bandung, Indonesia.
- Public email: `wildanniam4@gmail.com`.
- Public GitHub: `https://github.com/wildanniam`.
- Approved positioning and short biography.
- Public-ready flagship project records.

LinkedIn, resume, publications, phone number, private metrics, internal review
notes, and unpublished competition outcomes are excluded until explicitly
approved.

The credential portrait supplied directly by Wildan is approved for this public
portfolio as a cropped identity image. Only the metadata-free crop is committed.

## Required project fields

Every project record includes:

- slug, title, summary, role, year, and honest status;
- problem and intended audience;
- mechanism/system explanation;
- Wildan's contribution;
- decisions and tradeoffs;
- evidence records;
- limitations;
- public links;
- media state and alt text;
- team attribution where applicable;
- verification date.

## Media states

- `placeholder`: layout-preserving, explicitly labeled, never treated as proof.
- `candidate`: authentic asset awaiting content/visual review.
- `published`: reviewed asset with source, alt text, and dimensions.

## Status vocabulary

Use only explicit, factual statuses such as:

- `live`
- `degraded`
- `offline`
- `active-build`
- `prototype`
- `testnet-beta`

Do not replace these with vague success language.

## Project guardrails

### Fradium

- Use the canonical public role.
- Attribute team awards to the team.
- Do not claim that everything is fully on-chain.
- Do not provide security guarantees.

### PayGate

- Always identify the product as a **Stellar testnet beta**.
- Approved wording: **awarded a $5,000 SCF Instaward**.
- Do not claim disbursed funding, investment, revenue, partnership, mainnet, or
  production status.
- Keep PayGate distinct from AgentPay.

### Nova AI Wallet

- Describe it as a prototype.
- The public prototype may be described as degraded when that remains true.
- Do not claim a public award, production readiness, custodial status, or
  guaranteed estimates.

### SpecHeal

- The demo is offline.
- Only three seeded scenarios may be claimed.
- Do not claim accuracy, time saved, adoption, or a public competition result.

### Quorum

- Describe it as an active build/ongoing competition project when still current.
- It is testnet, not mainnet.
- Do not claim winner, finalist, audit, partnership, or production status.
- Six documented flows may be shown after their verification date is checked.

## Validation failures

Content validation must fail on:

- duplicate or invalid slugs;
- missing required fields;
- missing limitations;
- unknown statuses;
- unsafe URLs;
- published media without alt text/dimensions/source;
- blocked claim phrases;
- evidence IDs outside the Atlas public allowlist or missing from it;
- lifecycle states that diverge from the approved public snapshot;
- evidence without a type, label, or source;
- local absolute paths in public records;
- duplicate project links or records.

## Pre-release review

Before launch:

1. compare every record with its current Atlas public-ready source;
2. verify live/demo/repository links;
3. check project status and verification date;
4. review award/team attribution;
5. review every media asset and provenance caption;
6. remove stale or unsupported claims rather than softening them ambiguously.
