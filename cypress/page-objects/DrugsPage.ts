export class DrugsPage {
  goto() {
    cy.get('.db-label').contains('Drugs').click();
    return this;
  }

  addDrug(name: string, description: string, dosage: string) {
    cy.get('[placeholder="Drug Name"]').type(name);
    cy.get('[placeholder="Description"]').type(description);
    cy.get('[placeholder="Dosage"]').type(dosage);
    cy.contains('button', /add drug/i).click();
    return this;
  }

  findDrugCardsByName(name: string): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get('.drugs-list .drug-card').filter(`:contains("${name}")`);
  }

  removeDrugByDetails(name: string, description: string, dosage: string) {
    cy.on('window:confirm', () => true);
    this.findDrugCardsByName(name).each((card) => {
      cy.wrap(card).then(($el) => {
        const text = $el.text();
        if (text.includes(description) && text.includes(dosage)) {
          cy.wrap($el).contains('button', 'Remove').click();
        }
      });
    });
    return this;
  }
}
