import { LoginPage } from '../page-objects/LoginPage';
import { DrugsPage } from '../page-objects/DrugsPage';

describe('Drugs UI tests', () => {
  it('add and remove drug via UI', () => {
    cy.fixture('test-users').then((users) => {
      const admin = users.admin;
      const login = new LoginPage();
      const drugs = new DrugsPage();

      const name = `ui-test-${Date.now()}`;
      const description = 'Automated test drug';
      const dosage = '10mg';

      login.visit('/');
      login.login(admin.username, admin.password);

      drugs.goto();
      drugs.addDrug(name, description, dosage);

      cy.get('.drugs-list .drug-card .drug-name').contains(name).first().should('be.visible');

      // Cleanup
      drugs.removeDrugByDetails(name, description, dosage);
      cy.get('.drugs-list .drug-card .drug-name').contains(name).should('not.exist');
    });
  });
});
