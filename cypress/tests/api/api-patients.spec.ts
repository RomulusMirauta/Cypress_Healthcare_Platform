import { PatientsService } from '../../support/services/patients.service';

describe('API: Admin patient management', () => {
  const patientData = {
    firstName: 'Test',
    lastName: 'API',
    dob: '2025-10-14',
    gender: 'test',
    address: 'test',
  };

  it('add, check, and remove patient', () => {
    cy.fixture('test-users').then((users) => {
      const admin = users.admin;
      PatientsService.addPatient(patientData, { username: admin.username, password: admin.password }).then((addRes) => {
        expect(addRes.status).to.be.within(200, 299);

        PatientsService.getAllPatients({ username: admin.username, password: admin.password }).then((getRes) => {
          expect(getRes.status).to.be.within(200, 299);
          const allPatients = getRes.body;
          const lastPatient = allPatients[allPatients.length - 1];
          expect(lastPatient).to.be.ok;
          const patientId = lastPatient.patientId || lastPatient.PatientID || lastPatient.id;
          expect(patientId).to.be.ok;
          expect(lastPatient.firstName || lastPatient.FirstName).to.equal(patientData.firstName);
          expect(lastPatient.lastName || lastPatient.LastName).to.equal(patientData.lastName);

          // Delete
          PatientsService.deletePatient(patientId, { username: admin.username, password: admin.password }).then((delRes) => {
            expect(delRes.status).to.be.within(200, 299);
            PatientsService.getAllPatients({ username: admin.username, password: admin.password }).then((getAfterRes) => {
              const patientsAfterDelete = getAfterRes.body ?? [];
              const stillExists = patientsAfterDelete.some((p: any) => (p.patientId || p.PatientID || p.id) === patientId);
              expect(stillExists).to.be.false;
            });
          });
        });
      });
    });
  });
});
