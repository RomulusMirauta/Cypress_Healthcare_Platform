/// <reference types="cypress" />
import './commands';

// Optional global test setup
beforeEach(() => {
  // Optionally control confirm dialogs to auto accept by default if tests need it
  cy.on('window:confirm', () => true);
});
