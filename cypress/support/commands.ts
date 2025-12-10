/// <reference types="cypress" />
// Custom commands for domain-specific actions
Cypress.Commands.add('loginUI', (username: string, password: string) => {
  cy.visit('/');
  cy.get('[placeholder="Username"]').clear().type(username);
  cy.get('[placeholder="Password"]').clear().type(password);
  cy.contains('button', /login/i).click();
});

// Add a patient via the UI
// Custom command to add a patient via UI
Cypress.Commands.add(
  'addPatientUI', (firstName: string, lastName: string, dob: string, gender: string, address: string) => {
    cy.get('.db-label').contains('Patients').click();
    cy.get('[placeholder="First Name"]').type(firstName);
    cy.get('[placeholder="Last Name"]').type(lastName);
    // If there's a date field or button to fill today's date, we won't rely on that - use placeholder if available
    cy.get('[placeholder="Gender"]').type(gender);
    cy.get('[placeholder="Address"]').type(address);
    cy.contains('button', /add patient/i).click();
  }
);

// Remove patient by full name elements in the list and accept confirm dialogs
Cypress.Commands.add('removePatientByDetailsUI', (firstName: string, lastName: string) => {
  const name = `${firstName} ${lastName}`;
  // Accept confirm dialogs
  const confirmHandler = () => true;
  cy.on('window:confirm', confirmHandler);
  cy.get('.patients-list .patient-card').filter(`:contains("${name}")`).each((card) => {
    cy.wrap(card).contains('button', 'Remove').click();
  });
  // Unregister handler to avoid leaking state between tests
  cy.on('window:confirm', () => true);
});

// Add a drug via the UI
Cypress.Commands.add('addDrugUI', (name: string, description: string, dosage: string) => {
  cy.get('.db-label').contains('Drugs').click();
  cy.get('[placeholder="Drug Name"]').type(name);
  cy.get('[placeholder="Description"]').type(description);
  cy.get('[placeholder="Dosage"]').type(dosage);
  cy.contains('button', /add drug/i).click();
});

// Remove drug by details
Cypress.Commands.add('removeDrugByDetailsUI', (name: string, description: string, dosage: string) => {
  const confirmHandler = () => true;
  cy.on('window:confirm', confirmHandler);
  cy.get('.drugs-list .drug-card').filter(`:contains("${name}")`).each((card) => {
    cy.wrap(card).then(($el) => {
      const text = $el.text();
      if (text.includes(description) && text.includes(dosage)) {
        cy.wrap($el).contains('button', 'Remove').click();
      }
    });
  });
  cy.on('window:confirm', () => true);
});

// API helper using cy.request, optional credentials
Cypress.Commands.add('apiRequest', (method: string, url: string, body?: any, creds?: { username: string; password: string }) => {
  const options: Partial<Cypress.RequestOptions> = { method: method as any, url, body, failOnStatusCode: false };
  if (creds) {
    const q = `?username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`;
    options.url = url + q;
    options.headers = { 'content-type': 'application/json' };
  }
  return cy.request(options);
});

// DB task wrapper
// DB task wrapper
Cypress.Commands.add('dbQuery', (query: string, inputs?: any[]) => {
  return cy.task('db:query', { query, inputs });
});

export {};
