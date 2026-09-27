# Photon Dark Public Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an administrator-selectable Photon Dark frontend for `/` and `/pricing` while preserving the current frontend as the default and rollback path.

**Architecture:** Store a new `ui.public_variant` option with the closed values `legacy` and `photon`; publish the resolved value in `/api/status`. The React routes select between existing legacy components and new Photon components. Photon pages use an isolated, fixed-dark public shell and reuse the existing pricing data/filter logic so billing, model metadata, performance metrics, details, copy, table view, and pagination remain behaviorally unchanged.

**Tech Stack:** Go, Gin, GORM, React 19, TypeScript, TanStack Query/Router, Tailwind CSS, i18next, Vitest-compatible frontend tests, Bun.

## Global Constraints

- Default to `legacy`; invalid or missing values resolve to `legacy`.
- Phase 1 changes only `/` and `/pricing`; authenticated pages and the management console retain the existing frontend.
- Photon pages are always dark and do not show the light/dark switch.
- Preserve the existing frontend implementation rather than restyling it in place.
- Pricing sidebar order is provider, group, model tags; pricing-type and endpoint-type filters are not visible in Photon.
- Preserve model-card icon, name, input/output/cache or request pricing, details, copy, description, primary group, billing mode, endpoint/tag/unit metadata, hidden-count marker, latency, throughput, status, view controls, and pagination.
- Use the approved Photon tokens: `#13111C`, `#1a1a2e`, `#0f0f1a`, `#7F77DD`, `#5DCAA5`, `#D85A30`, `#e0dcf0`, `#9e98b8`; card and control radius is 8px.
- All new user-facing text uses i18n.
- Do not modify protected project identity or attribution.

---

### Task 1: Public variant option contract

**Files:**
- Modify: `model/option.go`
- Modify: `controller/option.go`
- Modify: `controller/misc.go`
- Test: `controller/public_frontend_variant_test.go`

**Interfaces:**
- Produces option `ui.public_variant` with values `legacy | photon`.
- Produces `/api/status.data.public_frontend_variant` with a safe `legacy` fallback.

- [ ] Write controller tests proving the default, Photon publication, accepted writes, and invalid-value rejection.
- [ ] Run the focused Go test and confirm it fails because the contract is absent.
- [ ] Add the option default, validation, and status publication.
- [ ] Run the focused Go test and confirm it passes.

### Task 2: Frontend resolver and administrator control

**Files:**
- Create: `web/src/lib/public-frontend-variant.ts`
- Create: `web/src/lib/__tests__/public-frontend-variant/selection.test.ts`
- Create: `web/src/features/system-settings/general/public-frontend-section.tsx`
- Modify: `web/src/features/system-settings/site/section-registry.tsx`
- Modify: `web/src/features/system-settings/site/index.tsx`
- Modify: `web/src/features/system-settings/types.ts`

**Interfaces:**
- Produces `type PublicFrontendVariant = 'legacy' | 'photon'`.
- Produces `resolvePublicFrontendVariant(value: unknown): PublicFrontendVariant`.
- Administrator UI writes `ui.public_variant` through the existing option mutation.

- [ ] Write resolver tests for `legacy`, `photon`, missing, and invalid inputs.
- [ ] Run the focused frontend test and confirm it fails because the resolver is absent.
- [ ] Implement the resolver and register the typed option in site settings.
- [ ] Add a two-choice accessible admin section with descriptive preview tokens and save behavior.
- [ ] Run the focused test and typecheck.

### Task 3: Photon shell and homepage

**Files:**
- Create: `web/src/components/layout/components/photon-public-layout.tsx`
- Create: `web/src/features/home/components/photon-home.tsx`
- Create: `web/src/features/home/components/photon-logo-mark.tsx`
- Modify: `web/src/features/home/index.tsx`
- Modify: `web/src/styles/index.css`

**Interfaces:**
- `PhotonPublicLayout` supplies fixed-dark navigation/footer and accepts `children`.
- `PhotonHome` consumes authentication state and uses existing route destinations.

- [ ] Add a route-selection regression test proving legacy remains default and Photon is selected only by the published option.
- [ ] Run it and confirm the missing Photon branch fails.
- [ ] Implement the isolated Photon shell and approved home hierarchy/copy.
- [ ] Keep custom homepage content behavior unchanged and higher priority than built-in variants.
- [ ] Run the focused test and typecheck.

### Task 4: Photon pricing page

**Files:**
- Create: `web/src/features/pricing/components/photon-pricing.tsx`
- Create: `web/src/features/pricing/components/photon-model-card.tsx`
- Create: `web/src/features/pricing/components/photon-pricing-sidebar.tsx`
- Modify: `web/src/features/pricing/index.tsx`

**Interfaces:**
- Photon pricing consumes the existing `usePricingData` and `useFilters` results.
- Photon card accepts the same pricing and performance inputs as the legacy card.

- [ ] Add tests for visible filter order and absence of pricing-type/endpoint-type controls.
- [ ] Add tests protecting the complete card information contract.
- [ ] Run the tests and confirm both fail against the absent Photon components.
- [ ] Implement the full Photon page while reusing existing pricing helpers and detail drawer.
- [ ] Preserve card/table view, standard/recharge toggle, token unit, sort, details, copy, and pagination.
- [ ] Run focused tests and typecheck.

### Task 5: Verification

**Files:**
- Modify translations and static keys only for strings introduced by Tasks 2–4.

- [ ] Run affected Go tests.
- [ ] Run affected frontend tests.
- [ ] Run `bun run typecheck` from `web/`.
- [ ] Run lint on the changed frontend files.
- [ ] Run `bun run format:check` from `web/`.
- [ ] Run `bun run build` from `web/`.
- [ ] Inspect `git diff --check` and the explicit changed-file diff; do not stage or commit without separate authorization.
