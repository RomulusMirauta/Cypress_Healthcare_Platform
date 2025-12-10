export class PatientsPage {
  goto() {
    cy.get('.db-label').contains('Patients').click();
    return this;
  }

  addPatient(firstName: string, lastName: string, dob: string, gender: string, address: string) {
    cy.get('[placeholder="First Name"]').type(firstName);
    cy.get('[placeholder="Last Name"]').type(lastName);
    // If there's an action to fill today's date via title, attempt to press it
    cy.get('[title="Fill today"]').click({ force: true }).should('exist');
    cy.get('[placeholder="Gender"]').type(gender);
    cy.get('[placeholder="Address"]').type(address);
    cy.contains('button', /add patient/i).click();
    return this;
  }

  findPatientCardsByName(name: string) {
    return cy.get('.patients-list .patient-card').filter(`:contains("${name}")`);
  }

  removePatientByDetails(firstName: string, lastName: string) {
    const name = `${firstName} ${lastName}`;
    cy.on('window:confirm', () => true);
    this.findPatientCardsByName(name).then((cards) => {
      Cypress.$(cards).each((_, el) => {
        cy.wrap(el).contains('button', 'Remove').click();
      });
    });
    return this;
  }
}
