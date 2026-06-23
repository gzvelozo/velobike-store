---
name: dashboard-protocol
description: The user's central UI is a single HTML dashboard at the VeloMED repo (sibling project). Update it surgically when significant work completes; never create competing tracking files. This skill defines the protocol for all agents working in the velomedStore repo.
---

# Dashboard Protocol · User's Central UI

**Rule (one line):** The HTML dashboard is the source of truth UI for project state across both repos. When you complete work in velomedStore that affects status, update the VeloMED dashboard. Do not create parallel tracking files.

## Canonical location

The dashboard lives in the **sibling repo** because VeloMED is the primary platform and VELOBIKE (this repo) is the reference merchant:

| Path | Owner |
|---|---|
| `C:\Users\gzvel\OneDrive\Claude\VeloMED\dashboard.html` | VeloMED repo (canonical for both projects) |
| `C:\Users\gzvel\.copilot\session-state\<id>\files\cto-status-report-2026-06-23.html` | Session working copy (kept in sync) |

When updating from a velomedStore session, edit the file in the VeloMED repo path. If you don't have access to that path, ask the user to confirm before creating a separate velomedStore dashboard.

## What the dashboard contains

The dashboard covers BOTH VeloMED platform AND VELOBIKE (this) repo. Sections relevant to velomedStore work:

| Section | When velomedStore work triggers update |
|---|---|
| Title slide pills | When VELOBIKE shipping status changes (e.g., webhook fixed) |
| The Honest Picture | When a missing item is built in VELOBIKE |
| Architecture diagram | Major routing changes in VELOBIKE's `/api/*` |
| Vendor RFP Tracker | N/A (clinical vendors, not VELOBIKE concern) |
| Next 30 Days | When a VELOBIKE task week is complete |
| Bootstrap Backlog | When a VELOBIKE-related backlog item ships |

## Anti-patterns

- ❌ **Don't create a separate velomedStore dashboard.** One dashboard covers both repos.
- ❌ **Don't create parallel tracking files** in velomedStore (no `status.md`, etc.)
- ❌ **Don't forget cross-repo impact** — VELOBIKE changes that affect the VeloMED platform (e.g., handoff seam) should be reflected in the dashboard's architecture slide

## How to update

1. Use `edit` tool with surgical changes on the dashboard file in the VeloMED repo path
2. Preserve existing structure, CSS, Mermaid scripts
3. Commit in the VeloMED repo with `dashboard:` prefix (e.g., `dashboard: VELOBIKE webhook unblocked`)
4. If you cannot reach the VeloMED repo from velomedStore session, leave a note in user-visible output asking them to relay the update

## See also

The full protocol (including read-order at session start, slide-by-slide update triggers, and version distinctions) is documented in the VeloMED repo:
`C:\Users\gzvel\OneDrive\Claude\VeloMED\.copilot\skills\dashboard-protocol\SKILL.md`
