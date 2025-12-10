/// <reference types="cypress" />
// Custom commands for domain-specific actions
(Cypress.Commands as any).add('loginUI', (username: string, password: string) => {
  cy.visit('/');
  cy.get('[placeholder="Username"]').clear().type(username);
  cy.get('[placeholder="Password"]').clear().type(password);
  cy.contains('button', /login/i).click();
});

// Add a patient via the UI
// Use any on Commands for typings
(Cypress.Commands as any).add(
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
(Cypress.Commands as any).add('removePatientByDetailsUI', (firstName: string, lastName: string) => {
  const name = `${firstName} ${lastName}`;
  // Accept confirm dialogs
  cy.on('window:confirm', () => true);
  cy.get('.patients-list .patient-card').filter(`:contains("${name}")`).then((cards) => {
    // Remove each card that matches
    Cypress.$(cards).each((_, el) => {
      cy.wrap(el).contains('button', 'Remove').click();
    });
  });
});

// Add a drug via the UI
(Cypress.Commands as any).add('addDrugUI', (name: string, description: string, dosage: string) => {
  cy.get('.db-label').contains('Drugs').click();
  cy.get('[placeholder="Drug Name"]').type(name);
  cy.get('[placeholder="Description"]').type(description);
  cy.get('[placeholder="Dosage"]').type(dosage);
  cy.contains('button', /add drug/i).click();
});

// Remove drug by details
(Cypress.Commands as any).add('removeDrugByDetailsUI', (name: string, description: string, dosage: string) => {
  cy.on('window:confirm', () => true);
  cy.get('.drugs-list .drug-card').filter(`:contains("${name}")`).then((cards) => {
    Cypress.$(cards).each((_, el) => {
      const text = Cypress.$(el).text();
      if (text.includes(description) && text.includes(dosage)) {
        cy.wrap(el).contains('button', 'Remove').click();
      }
    });
  });
});

// API helper using cy.request, optional credentials
(Cypress.Commands as any).add('apiRequest', (method: string, url: string, body?: any, creds?: { username: string; password: string }) => {
  const options: any = { method: method as any, url, body, failOnStatusCode: false };
  if (creds) {
    const q = `?username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`;
    options.url = url + q;
    options.headers = { 'content-type': 'application/json' };
  }
  return cy.request(options);
});

// DB task wrapper
// Use any on Commands to bypass typings for the moment
(Cypress.Commands as any).add('dbQuery', (query: string, inputs?: any[]) => {
  return cy.task('db:query', { query, inputs });
});

export {};
