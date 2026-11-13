---
name: test-standards
description: Enforces Playwright test writing and organisation standards, with safe automatic fixes and precise violation reports.
---

# Test Standards

Use this skill when reviewing or changing tests and specs. Detect violations, apply fixes only when mechanical and safe, and preserve test intent. If the request says `check`, `review only`, or `don't fix`, do not modify files and use the report-only status.

## Project context

- `src/ui/pages/BasePage.ts` contains the abstract `BasePage`, with `protected readonly page: Page` and `async navigate(path = '/')`. Every Page Object extends it.
- `tsconfig.json` targets ES2022, implying `useDefineForClassFields: true`; Page Object locators are `get` properties for lazy evaluation against ready `this.page` and to avoid class-field initialization-order problems.
- `baseURL` is configured in `playwright.config.ts` from `process.env.BASE_URL`, loaded by `dotenv`.
- `src/config/Env.ts` validates required environment variables at startup with descriptive errors.
- `src/data/auth.data.ts` defines `appUser` from `Env` plus site-specific accounts.
- Specs live in `tests/` and are named `*.spec.ts`.
- Path aliases are the only allowed import style. Relative paths are always violations except the rule 1 exceptions below.

## Rules

### Rule 1: Use path aliases
- Imports in tests and test-support code must use the project's configured path aliases.
- Relative imports are `ERROR`, except a relative import used by a colocated `index` barrel when the repository's alias configuration cannot represent that barrel, or a framework-required test fixture import explicitly documented by the project.
- Convert a relative import mechanically when the matching alias and target are unambiguous. Otherwise report `[MANUAL]`.

### Rule 2: Keep specs in the test tree
- Executable specs belong in `tests/` and use the `*.spec.ts` filename pattern.
- A spec outside that location or with another extension is `ERROR` when it is an executable test; generated or framework-owned files require human judgment.
- A simple rename or move is `[MANUAL]` unless the request explicitly authorizes file moves.

### Rule 3: Use Page Objects for UI interaction
- Specs must use Page Object methods and properties rather than duplicate selectors, navigation, or low-level UI workflows.
- Direct selector use in a spec is `WARNING` when an applicable Page Object exists and `ERROR` when it bypasses a required Page Object boundary.
- Replacing an unambiguous selector with an existing Page Object member is `[AUTO-APPLIED]`; creating a new abstraction is `[MANUAL]`.

### Rule 4: Use shared configuration and data
- Do not hard-code a host, environment variable validation, or credentials in a spec. Use configured `baseURL`, `src/config/Env.ts`, and `src/data/auth.data.ts`, including `appUser` and site-specific accounts.
- Hard-coded credentials or hosts are `ERROR`; duplicated environment checks are `WARNING` when they do not change behavior.
- An unambiguous replacement with an existing configuration or data member is `[AUTO-APPLIED]`; choosing a data source or changing test setup is `[MANUAL]`.

### Rule 5: Make test intent and isolation clear
- Tests should have a meaningful title, explicit setup, and independent state. Avoid order dependence, shared mutable state, arbitrary waits, and assertions unrelated to the scenario.
- Order dependence and arbitrary waits are `ERROR`; unclear titles or unrelated assertions are `WARNING`.
- Formatting, import ordering, and removal of an unused import are auto-applicable when supported by project conventions. Isolation and assertion changes are `[MANUAL]`.

## Detection and fixing procedure

1. Inspect spec paths, names, imports, fixtures, selectors, waits, data, and test dependencies.
2. Check aliases and existing Page Object APIs before proposing a fix.
3. Apply safe mechanical fixes only. Never invent a locator, account, alias, assertion, or test boundary.
4. Re-scan changed files and report unresolved findings.
5. In report-only mode, make no edits and mark every proposed fix `NOT APPLIED (report-only)`.

## Required violation format

Output each violation exactly as follows:

```text
[test-standards] SEVERITY — RULE NAME
File:  <path>
Line:  <number>
Issue: <one sentence>
Fix:   <one sentence> [AUTO-APPLIED | MANUAL | NOT APPLIED (report-only)]
```

Use only `ERROR` and `WARNING`. Use `[MANUAL]` for human judgment, `[AUTO-APPLIED]` for a completed safe mechanical fix, and `[NOT APPLIED (report-only)]` when edits are disabled.
