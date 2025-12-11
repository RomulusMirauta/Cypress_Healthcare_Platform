import { LoginPage } from '../../page-objects/LoginPage';
import { PatientsPage } from '../../page-objects/PatientsPage';

describe('E2E: Patients (UI + DB validation)', () => {
  it('add and remove patient and verify DB', () => {
    cy.fixture('test-users').then((users) => {
      const admin = users.admin;
      const login = new LoginPage();
      const patients = new PatientsPage();
      const patientData = {
        firstName: 'E2E',
        lastName: `TestPatient${Date.now()}`,
        dob: '2000-01-01',
        gender: 'Other',
        address: 'E2E Test Address',
      };

      login.visit('/');
      login.login(admin.username, admin.password);
      patients.goto();
      patients.addPatient(patientData.firstName, patientData.lastName, patientData.dob, patientData.gender, patientData.address);
      const matchingName = `${patientData.firstName} ${patientData.lastName}`;
      cy.contains('.patient-name', matchingName).first().should('be.visible');
      // remove
      patients.removePatientByDetails(patientData.firstName, patientData.lastName);
      cy.contains('.patient-name', matchingName).should('not.exist');
      // DB check
      const q = `SELECT * FROM Patients WHERE FirstName = '${patientData.firstName.replace("'", "''")}' AND LastName = '${patientData.lastName.replace("'", "''")}'`;
      cy.task('db:query', { query: q }).then((res) => {
        expect((res as any).recordset.length).to.equal(0);
      });
    });
  });
});
