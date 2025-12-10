export class LoginPage {
  visit(path = '/') {
    cy.visit(path);
    return this;
  }

  login(username: string, password: string) {
    cy.get('[placeholder="Username"]').clear().type(username);
    cy.get('[placeholder="Password"]').clear().type(password);
    cy.contains('button', /login/i).click();
    return this;
  }
}
