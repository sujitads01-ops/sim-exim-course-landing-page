# SIM EXIM Course Landing Page

A responsive landing page for Skills Institute of Management’s practical Import–Export (EXIM) training course, with course information and an enquiry form.

## Run & Operate

- `pnpm --filter @workspace/sim-exim-course run dev` — run the landing page
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/sim-exim-course/src/App.tsx` — landing page and interactions
- `artifacts/sim-exim-course/src/index.css` — responsive visual styles
- `artifacts/sim-exim-course/INTEGRATION.md` — enquiry form connection requirements

## Architecture decisions

- The enquiry form must not imply that a lead was sent unless a real submission endpoint confirms it.
- Course and trainer claims remain limited to information supplied in the approved brief; unverified details stay marked for confirmation.

## Product

The single-page site introduces the EXIM course, explains its curriculum and practical simulation, answers common questions, and provides an enquiry form that is ready for an approved submission service.

## User preferences

- Build only the EXIM course landing page at this stage; do not create other SIM website pages until this page is reviewed and approved.
- Do not invent placement, salary, success, trainer-experience, contact, schedule, fee, or credential claims.

## Gotchas

- The separate SIM EXIM design-draft PDF referenced in the supplied prompt was not provided; the prompt is the current content and structure source.
- The form’s preferred date and time are counselling preferences, not confirmed appointments.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
