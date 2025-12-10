# Playwright -> Cypress Converted Tests

This repository contains a converted set of end-to-end tests originally written for Playwright. The tests are ported to Cypress. The converted tests live under `cypress/e2e` and page objects and helpers are under `cypress/support` and `cypress/page-objects`.

Running tests (Windows PowerShell):

1. Install dependencies

```powershell
npm ci
```

2. Run in interactive mode

```powershell
npm run cypress:open
```

3. Or run headless

```powershell
npm run cypress:run
```

Notes
- Database checks use a Cypress 'task' registered in `cypress.config.ts` and rely on `mssql` to connect to the SQL server. Adjust DB credentials via environment variables (`DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_NAME`).
- The `BASE_URL` may be overridden by setting `BASE_URL` env var.
