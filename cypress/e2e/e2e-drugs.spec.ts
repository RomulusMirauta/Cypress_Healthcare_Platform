import { LoginPage } from '../page-objects/LoginPage';
import { DrugsPage } from '../page-objects/DrugsPage';

describe('E2E: Drugs (UI + DB validation)', () => {
  it('add and remove drug and verify DB', () => {
    cy.fixture('test-users').then((users) => {
      const admin = users.admin;
      const login = new LoginPage();
      const drugs = new DrugsPage();
      const drugData = {
        name: `E2E TestDrug ${Date.now()}`,
        description: 'E2E Test Drug Description',
        dosage: '123mg',
      };

      login.visit('/');
      login.login(admin.username, admin.password);
      drugs.goto();
      drugs.addDrug(drugData.name, drugData.description, drugData.dosage);
      cy.get('.drugs-list .drug-card .drug-name').contains(drugData.name).first().should('be.visible');
      drugs.removeDrugByDetails(drugData.name, drugData.description, drugData.dosage);
      cy.get('.drugs-list .drug-card .drug-name').contains(drugData.name).should('not.exist');
      const q = `SELECT * FROM Drugs WHERE Name = '${drugData.name.replace("'", "''")}'`;
      cy.task('db:query', { query: q }).then((res) => {
        expect((res as any).recordset.length).to.equal(0);
      });
    });
  });
});
