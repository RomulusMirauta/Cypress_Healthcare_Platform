/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      loginUI(username: string, password: string): Chainable<void>;
      addPatientUI(firstName: string, lastName: string, dob: string, gender: string, address: string): Chainable<void>;
      removePatientByDetailsUI(firstName: string, lastName: string): Chainable<void>;
      addDrugUI(name: string, description: string, dosage: string): Chainable<void>;
      removeDrugByDetailsUI(name: string, description: string, dosage: string): Chainable<void>;
      apiRequest(method: string, url: string, body?: any, creds?: { username: string; password: string }): Chainable<any>;
      dbQuery(query: string, inputs?: any[]): Chainable<any>;
    }
  }
}
export {};
