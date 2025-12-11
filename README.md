# Cypress Tests

This repository contains a set of tests written for Cypress. The converted tests live under `cypress` and page objects and helpers are under `cypress/support` and `cypress/page-objects`.

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

1. A sample GitHub Actions workflow `cypress.yml` runs the Cypress suite using a SQL Server container and will attempt to start the app with `npm start` if the `start` script exists. The action runs a DB setup SQL script `ci/create-healthcare-db.sql` and runs the tests across multiple Node/browser matrices via `workflow_dispatch` as a manual trigger.

2. CI Secrets

Make sure you add the following repository secrets to GitHub for CI:

- `SA_PASSWORD` (SQL Server SA password for the service container)
- `DB_USER` (DB username used by tests, typically `sa` *(by default)*)
- `DB_PASSWORD` (DB password used by tests)
- `DB_SERVER` (usually `localhost` in the CI but override as needed)
- `DB_NAME` (like `HealthcareDB`)
- `BASE_URL` (the base URL for the app under test)

Use the GitHub repository settings > Secrets to add these secrets to avoid storing plain credentials in the workflow definition.

## Useful Docker Commands

### Build Docker Image

    ```
    docker build -t my-app .
    ```

Builds an image named `my-app` from the Dockerfile in the current directory.

### Run Docker Container

    ```
    docker run -p 3000:3000 my-app
    ```

Runs the `my-app` image and maps port 3000 of the container to port 3000 on your machine.

### List Docker Images

    ```
    docker images
    ```

Shows all images on your system.

### Remove Docker Image

    ```
    docker rmi my-app
    ```

Removes the image named `my-app`.

### Docker Compose: Build and Start Services

    ```
    docker-compose up --build
    ```

Builds images and starts all services defined in `docker-compose.yml`.

### Docker Compose: Stop and Remove Services

    ```
    docker-compose down
    ```

Stops and removes containers, networks, and volumes created by `docker-compose up`.

### Docker Compose: View Logs

    ```
    docker-compose logs
    ```

Shows logs for all services managed by Docker Compose.

### Docker Compose: Run a One-off Command

    ```
    docker-compose run <service> <command>
    ```

Runs a command in a new container for the specified service.
