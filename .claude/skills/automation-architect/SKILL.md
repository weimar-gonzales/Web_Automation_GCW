---
name: automation-architect
description: Orchestrates pom-architect and test-standards to review and safely improve the Playwright TypeScript automation architecture.
---

# Automation Architect

This skill is the hub for the automation architecture. Use it to coordinate `pom-architect` and `test-standards`, detect cross-cutting violations, apply safe mechanical fixes, and report issues needing human judgment. If the request says `check`, `review only`, or `don't fix`, run both reviews without editing and mark fixes `NOT APPLIED (report-only)`.

## Project context

- `src/ui/pages/BasePage.ts` is abstract, has `protected readonly page: Page`, and provides `async navigate(path = '/')`. All Page Objects extend it.
- `tsconfig.json` targets ES2022, implying `useDefineForClassFields: true`. Page Object locators must be `get` properties, lazily evaluated against ready `this.page` and safe from class-field initialization-order problems.
- `baseURL` is in `playwright.config.ts`, sourced from `process.env.BASE_URL` loaded by `dotenv`.
- `src/config/Env.ts` validates required environment variables at startup with descriptive errors.
- `src/data/auth.data.ts` defines `appUser` from `Env` plus site-specific accounts.
- Specs live in `tests/` and are named `*.spec.ts`.
- Path aliases are the only allowed import style. Relative imports are violations except the test-standards rule 1 exceptions.

## Orchestration

1. Identify the requested scope and whether the run is report-only.
2. Run `pom-architect` against Page Objects and UI usage, then run `test-standards` against specs and test support. Inspect shared files once and pass findings between reviews.
3. Resolve ordering conflicts by preserving behavior and the project's existing APIs. Prefer a safe mechanical fix; do not invent abstractions or make product decisions.
4. Apply approved mechanical fixes, then re-run both focused checks on changed files and report remaining findings. If a fix affects both domains, report it once under the owning skill and mention the coordination.
5. Do not alter existing source, config, or test files unless the user requested implementation fixes. Keep secrets out of output.

## Cross-cutting checks

- Page Objects extend `BasePage`, use lazy locator getters, and use inherited navigation.
- Specs use Page Object APIs, configured `baseURL`, `Env`, and `auth.data.ts` rather than selectors, hosts, environment checks, or credentials.
- Specs are in `tests/`, named `*.spec.ts`, use path aliases, and remain isolated.
- Class-field locator initialization and relative imports are violations under the rules above, subject to the test-standards rule 1 exceptions.

## Safe fixing policy

Auto-apply only formatting, unambiguous alias conversion, unused-import cleanup, and direct locator conversion that preserves behavior. Report missing abstractions, uncertain paths, credentials/data choices, isolation changes, and behavior changes as `[MANUAL]`. Never force a rename, move, selector choice, assertion change, or environment decision. In report-only mode, make no edits.

## Required violation format

Every violation must use the exact format below, with the owning skill name in brackets:

```text
[skill-name] SEVERITY — RULE NAME
File:  <path>
Line:  <number>
Issue: <one sentence>
Fix:   <one sentence> [AUTO-APPLIED | MANUAL | NOT APPLIED (report-only)]
```

Use `pom-architect` or `test-standards` as `skill-name`. Use only `ERROR` for architecture-breaking problems and `WARNING` for conventions without functional risk. `[AUTO-APPLIED]` means the safe fix was made, `[MANUAL]` means judgment is required, and `[NOT APPLIED (report-only)]` means the check deliberately made no edit.
