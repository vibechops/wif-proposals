# Pricing framework

How WIF prices partner programs. Internal guidance for `pricing-recommendation.md` and `cost-breakdown.md`.

Reference: `google/cost-breakdown.md`, `google/pricing-recommendation.md` (tiered $100K / $150K model).

---

## Core principle

**Separate production pass-through from WIF margin when possible.**

If the fee must be a single number (cost-inclusive), model gross and net profit explicitly. Option B at ~2x scope should not yield the same net profit as Option A.

---

## Tier structure

| Tier | Purpose |
|---|---|
| Option A | Entry point, smaller scope, lower fee |
| Option B | Full program, higher fee, better value per module |
| Floor | Minimum acceptable fee (negotiation) |
| Anchor | Stretch number to open high |

Always document rationale for the gap between A and B.

---

## FX and tax defaults

- Planning FX: **$1 ≈ ₹85**
- WIF Pvt Ltd tax model: **~25.17%** on gross profit (use in cost-breakdown)
- Present client-facing fees in **USD** unless partner requires INR

---

## Cost build order

1. **Bottoms-up production** (venues, crew, travel, awards show)
2. **Participant access** (credits, subscriptions) if WIF funds them
3. **WIF management fee** (curation, ops, Rabia's team)
4. **Margin check** at Base scenario
5. **Sanity check** against market comparables (top-down)

Use `cost-breakdown.md` for (1)-(4). Use `pricing-recommendation.md` for (5) and negotiation strategy.

---

## Red flags

- Flat fee for two very different scopes
- B-tier net profit equal to A-tier with 2x delivery risk
- Client-facing doc shows internal credit line items partner said they won't fund
- Fee quoted before `event-spec.md` is filled in

---

## Decision log template

Record every internal pricing call in `pricing-recommendation.md`:

| Date | Attendees | Decision |
|---|---|---|
| | Ronak, Rabia, ... | Adopted fee, option scope, flags for Guneet |
