# WIF proposal agent workflow

You are helping build WIF India partner proposals. Follow this pipeline.

## Before writing

1. Read `_shared/playbooks/` (program shapes, pricing, deck conventions)
2. Read `_shared/rabia-intake.md` when processing intake
3. Use `google/` as the reference completed proposal (structure, tone, tiered options)
4. Use `_shared/templates/` for blank file shapes

## Active client scope

Unless the user says otherwise, **only edit files inside the active client folder** (e.g. `dell/`). Read `google/` and `_shared/` for reference; do not modify them without explicit ask.

## Update order (after Rabia intake)

1. `{client}/00-intake/rabia-notes.md` - raw paste only
2. `{client}/01-brief/project.md` - synthesized brief, confirmed vs open items
3. `{client}/04-specs/program-flow.md` and `event-spec.md`
4. `{client}/03-budget/budget-outlook.md`, then `cost-breakdown.md`, then `pricing-recommendation.md`
5. `{client}/02-deck/deck-outline.md`, then `a4-pdf-outline.md`
6. `{client}/05-research/` for partner-specific research
7. `{client}/06-deliverables/` for final exports only

## Conventions

- **Modular programs:** 4 modules, Option A vs Option B, mermaid flowchart on slide 3
- **Pricing:** USD fees, ₹85/$, ~25.17% tax in internal cost models
- **Cross-links:** Use relative paths between files in the same client folder
- **Intake vs brief:** Keep raw Rabia notes separate from `project.md`
- **Internal vs client-facing:** Credit line items and margin analysis stay in `03-budget/`, not deck slides

## Starting a new client

1. Copy the `dell/` folder structure to `{client}/`
2. Replace "Dell" with partner name in `01-brief/project.md`
3. Clear TBD sections
4. Wait for Rabia intake before inventing scope

## Google layout note

`google/` files live at the folder root (legacy). New clients use numbered subfolders. When referencing Google, use paths like `google/project.md`, not `google/01-brief/project.md`.
