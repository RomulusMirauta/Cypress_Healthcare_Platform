import { LoginPage } from '../../page-objects/LoginPage';

describe('Login tests', () => {
  it('login with valid credentials', () => {
    cy.fixture('test-users').then((users) => {
      const admin = users.admin;
      const loginPage = new LoginPage();
      loginPage.visit('/');
      loginPage.login(admin.username, admin.password);
      cy.contains(admin.username).should('be.visible');
    });
  });

  it('login with invalid credentials', () => {
    const loginPage = new LoginPage();
    loginPage.visit('/');
    loginPage.login('admin1', 'wrong_password');
    // Expect an unauthorized message to appear
    cy.contains('401: Unauthorized').should('exist');
  });
});
