---
name: pom-architect
description: Enforces Page Object Model rules, detects violations, safely fixes mechanical issues, and reports judgment calls.
---

# POM Architect

Use this skill when reviewing or changing Page Objects. Inspect the relevant files, identify every applicable violation, and apply only mechanical, safe fixes. Preserve existing behavior. If the request says `check`, `review only`, or `don't fix`, do not edit files; use the report-only status below.

## Project context

- `src/ui/pages/BasePage.ts` contains the abstract `BasePage`, with `protected readonly page: Page` and `async navigate(path = '/')`. Every Page Object extends it.
- `tsconfig.json` targets ES2022, which implies `useDefineForClassFields: true`.
- Page Object locators must be `get` properties. They are lazy, always evaluated against a ready `this.page`, and avoid class-field initialization-order problems.
- `baseURL` is configured in `playwright.config.ts` from `process.env.BASE_URL`, loaded by `dotenv`.
- `src/config/Env.ts` validates required environment variables at startup with descriptive errors.
- `src/data/auth.data.ts` defines `appUser` from `Env` plus site-specific accounts.
- Specs live in `tests/` and are named `*.spec.ts`.
- Path aliases are the only allowed import style. Relative imports are violations, except for the test-standards rule 1 exceptions.

## Rules

### POM-1: Extend the base page
- Every Page Object under the UI page area must extend `BasePage`.
- A class representing a page or page fragment must not create its own browser `Page` or duplicate base navigation setup.
- A missing `extends BasePage` is `ERROR`; an unnecessary duplicate setup is `ERROR`.
- Adding the extension and required import is auto-applicable only when the class's constructor and dependencies make the change unambiguous. Otherwise report `[MANUAL]`.

### POM-2: Use lazy locator getters
- Locators on Page Objects must be declared as `get locatorName()` properties and evaluated from `this.page`.
- Class fields that initialize locators, cached locators, or selectors are `ERROR` because class-field initialization can run before the page dependency is ready.
- A direct mechanical conversion that preserves the expression and type is `[AUTO-APPLIED]`; cached or behavior-changing conversions are `[MANUAL]`.

### POM-3: Reuse configured navigation
- Use inherited `navigate(path = '/')` for navigation and the configured Playwright `baseURL`; do not hard-code environment-specific hosts or duplicate `page.goto` setup.
- Hard-coded hosts are `ERROR`; duplicated but equivalent navigation is `WARNING` unless it changes behavior.
- Replacing a literal host with the inherited navigation is auto-applied only when the intended path is clear. Otherwise report `[MANUAL]`.

### POM-4: Keep environment and credentials out of Page Objects
- Page Objects must not validate environment variables or embed credentials. Use `Env` and `src/data/auth.data.ts`, including `appUser` and site-specific accounts.
- Credential or environment loading in a Page Object is `ERROR` and requires `[MANUAL]` unless the move is an unambiguous mechanical extraction.

### POM-5: Keep UI behavior in the Page Object
- Specs should call meaningful Page Object methods rather than repeat selectors and low-level UI sequences.
- Repeated selector logic in a spec is `WARNING`; extraction requires human judgment about the public method contract and is `[MANUAL]`.

## Detection and fixing procedure

1. Find Page Object classes, their imports, constructors, locator declarations, navigation, and environment access.
2. Trace aliases and inheritance before deciding that an import or base class is missing.
3. Apply only safe mechanical fixes. Do not invent method names, alter selectors, move credentials, or change test behavior.
4. Re-scan changed files and report all remaining findings.
5. In report-only mode, make no edits and mark every proposed fix `NOT APPLIED (report-only)`.

## Required violation format

Output each violation exactly as follows:

```text
[pom-architect] SEVERITY — RULE NAME
File:  <path>
Line:  <number>
Issue: <one sentence>
Fix:   <one sentence> [AUTO-APPLIED | MANUAL | NOT APPLIED (report-only)]
```

Use only `ERROR` for architecture-breaking rules and `WARNING` for conventions without functional risk. Use `[MANUAL]` for human judgment, `[AUTO-APPLIED]` for a completed safe mechanical fix, and `[NOT APPLIED (report-only)]` when the request forbids edits.
