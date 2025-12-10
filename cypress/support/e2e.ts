/// <reference types="cypress" />
import './commands';

// Optional global test setup
beforeEach(() => {
  // Optionally control confirm dialogs to auto accept by default if tests need it
  cy.on('window:confirm', () => true);
});

// Prevent uncaught exceptions in the application from failing tests (opt-in)
Cypress.on('uncaught:exception', (err, runnable) => {
  // Returning false here prevents Cypress from failing the test
  return false;
});
