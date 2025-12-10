import { LoginPage } from '../page-objects/LoginPage';

describe('Role-based access control', () => {
  it('admin can access all sections, username and logout are displayed in UI', () => {
    cy.fixture('test-users').then((users) => {
      const admin = users.admin;
      const loginPage = new LoginPage();
      loginPage.visit('/');
      loginPage.login(admin.username, admin.password);
      cy.contains(admin.username).should('be.visible');
      cy.get('.db-label').contains('Patients').should('be.visible');
      cy.get('.db-label').contains('Drugs').should('be.visible');
      cy.get('.db-label').contains('Reports').should('be.visible');
      cy.get('.db-label').contains('Admin').should('be.visible');
      cy.get('.db-label').contains('Logout').should('be.visible');
    });
  });

  it('user_drugs can access drugs, cannot access patients', () => {
    cy.fixture('test-users').then((users) => {
      const userDrugs = users.user_drugs;
      const loginPage = new LoginPage();
      loginPage.visit('/');
      loginPage.login(userDrugs.username, userDrugs.password);
      cy.get('.db-label').contains('Drugs').should('be.visible');
      cy.contains('Logout').should('be.visible');
      cy.contains(userDrugs.username).should('be.visible');
      cy.contains('Patients').should('not.exist');
      cy.contains('Reports').should('not.exist');
      cy.contains('Admin').should('not.exist');
    });
  });

  it('user_patients can access patients, cannot access drugs', () => {
    cy.fixture('test-users').then((users) => {
      const userPatients = users.user_patients;
      const loginPage = new LoginPage();
      loginPage.visit('/');
      loginPage.login(userPatients.username, userPatients.password);
      cy.get('.db-label').contains('Patients').should('be.visible');
      cy.contains('Logout').should('be.visible');
      cy.contains(userPatients.username).should('be.visible');
      cy.contains('Drugs').should('not.exist');
      cy.contains('Reports').should('not.exist');
      cy.contains('Admin').should('not.exist');
    });
  });

  it('non-existent user cannot log in', () => {
    const loginPage = new LoginPage();
    loginPage.visit('/');
    loginPage.login('no_such_user', 'wrong_password');
    cy.contains('401: Unauthorized').should('exist');
  });
});
