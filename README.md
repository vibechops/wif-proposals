# WIF Proposals

Repository for WIF India partner proposals. One folder per client, shared templates and playbooks at `_shared/`.

## Structure

```
wif-proposals/
├── _shared/           Templates, playbooks, Rabia intake checklist
├── google/            Reference proposal (completed; flat file layout)
├── dell/              Active proposal (numbered subfolders)
├── AGENTS.md          Cursor workflow
└── README.md
```

## New proposal workflow

1. Copy `dell/` or scaffold from `_shared/templates/`
2. Paste Rabia context into `{client}/00-intake/rabia-notes.md`
3. Update `{client}/01-brief/project.md` first
4. Fill `{client}/04-specs/event-spec.md`
5. Draft budget files in `{client}/03-budget/`
6. Draft deck in `{client}/02-deck/`
7. Export finals to `{client}/06-deliverables/`

## Reference proposal

**Google x WIF India** (`google/`) is the gold standard for modular programs, tiered pricing, and deck structure. New proposals should mirror its patterns using the numbered folder layout in `dell/`.

Note: `google/` uses a flat layout from an earlier pass. New clients use numbered subfolders (`00-intake/`, `01-brief/`, etc.).

## Deploy (Vercel)

**Live site:** [wif-proposals.vercel.app](https://wif-proposals.vercel.app)

| Path | Content |
|---|---|
| `/` | Proposal hub |
| `/google` | Google Flow interactive viewer |
| `/dell` | Dell interactive viewer |

Deploy root is `site/` (see root `vercel.json`). Viewer sources live in `{client}/viewer/`; sync before deploy:

```bash
./scripts/sync-site.sh
vercel --prod
```

For local preview, serve from `site/` so the `/google` and `/dell` base paths resolve:

```bash
cd site && python3 -m http.server 8080
# http://localhost:8080/google/  and  http://localhost:8080/dell/
```

**Legacy:** `google-wif` repo and project are archived. This monorepo replaces them.

## Scoping Cursor to one client

Open only the client folder as workspace, or add to `.cursorignore`:

```gitignore
google/**
```

when working on `dell/`.
