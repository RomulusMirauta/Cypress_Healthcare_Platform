import { LoginPage } from '../../page-objects/LoginPage';
import { PatientsPage } from '../../page-objects/PatientsPage';

describe('Patients UI tests', () => {
  it('add and remove patient via UI', () => {
    cy.fixture('test-users').then((users) => {
      const admin = users.admin;
      const login = new LoginPage();
      const patients = new PatientsPage();

      const firstName = `ui-patient-${Date.now()}`;
      const lastName = 'Spec';
      const dob = '1990-01-01';
      const gender = 'Other';
      const address = '123 Test St';

      login.visit('/');
      login.login(admin.username, admin.password);

      patients.goto();
      patients.addPatient(firstName, lastName, dob, gender, address);

      const name = `${firstName} ${lastName}`;
      cy.contains('.patient-name', name).first().should('be.visible');

      // Cleanup
      patients.removePatientByDetails(firstName, lastName);
      cy.contains('.patient-name', name).should('not.exist');
    });
  });
});
