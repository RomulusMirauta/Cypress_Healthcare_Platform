describe('API: Admin drug management', () => {
  const baseUrl = Cypress.config('baseUrl') as string;
  const drugData = {
    name: 'TestDrug_API',
    description: 'Test drug description',
    dosage: '10mg',
  };

  it('add, check, and remove drug', () => {
    cy.fixture('test-users').then((users) => {
      const admin = users.admin;
      const addUrl = `${baseUrl}api/drugs`;
      cy.request('POST', addUrl, { ...drugData, username: admin.username, password: admin.password }).then((addRes) => {
        expect(addRes.status).to.be.within(200, 299);

        const getUrl = `${baseUrl}api/drugs?username=${encodeURIComponent(admin.username)}&password=${encodeURIComponent(admin.password)}`;
        cy.request('GET', getUrl).then((getRes) => {
          expect(getRes.status).to.be.within(200, 299);
          const allDrugs = getRes.body;
          const lastDrug = allDrugs[allDrugs.length - 1];
          expect(lastDrug).to.be.ok;
          const drugId = lastDrug.drugId || lastDrug.DrugID || lastDrug.id;
          expect(drugId).to.be.ok;
          expect(lastDrug.name || lastDrug.Name).to.equal(drugData.name);
          expect(lastDrug.description || lastDrug.Description).to.equal(drugData.description);
          expect(lastDrug.dosage || lastDrug.Dosage).to.equal(drugData.dosage);

          // Delete
          const delUrl = `${baseUrl}api/drugs/${drugId}?username=${encodeURIComponent(admin.username)}&password=${encodeURIComponent(admin.password)}`;
          cy.request('DELETE', delUrl).then((delRes) => {
            expect(delRes.status).to.be.within(200, 299);
            cy.request('GET', getUrl).then((getAfter) => {
              const drugsAfterDelete = getAfter.body ?? [];
              const stillExists = drugsAfterDelete.some((d: any) => (d.drugId || d.DrugID || d.id) === drugId);
              expect(stillExists).to.be.false;
            });
          });
        });
      });
    });
  });
});
