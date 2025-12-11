import { LoginPage } from '../../page-objects/LoginPage';

describe('Logout', () => {
  it('logout redirects to login page', () => {
    cy.fixture('test-users').then((users) => {
      const admin = users.admin;
      const loginPage = new LoginPage();
      loginPage.visit('/');
      loginPage.login(admin.username, admin.password);
      cy.get('.db-label').contains('Logout').click();
      cy.contains('button', /login/i).should('be.visible');
    });
  });
});
