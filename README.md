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

CI (GitHub Actions)
- A sample GitHub Actions workflow `cypress.yml` runs the Cypress suite using a SQL Server container and will attempt to start the app with `npm start` if the `start` script exists. The action runs a DB setup SQL script `ci/create-healthcare-db.sql` and runs the tests with Chrome. 
- Environment variables used in CI can be modified in the workflow (not recommended to store plain credentials; use GitHub Secrets in a real project).
