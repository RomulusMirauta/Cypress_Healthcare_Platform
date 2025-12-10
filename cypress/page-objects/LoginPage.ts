export class LoginPage {
  visit(path = '/') {
    cy.visit(path);
    // returning Cypress chainable is more expressive if the caller wants to assert after navigation
    return cy.wrap(null);
  }

  login(username: string, password: string) {
    cy.get('[placeholder="Username"]').clear().type(username);
    cy.get('[placeholder="Password"]').clear().type(password);
    cy.contains('button', /login/i).click();
    return cy.wrap(null);
  }
}
