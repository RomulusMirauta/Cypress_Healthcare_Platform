export const DrugsService = {
  baseUrl() {
    return Cypress.config('baseUrl') as string;
  },
  addDrug(drug: Record<string, any>, creds: { username: string; password: string }) {
    return cy.request('POST', `${this.baseUrl()}api/drugs`, { ...drug, username: creds.username, password: creds.password });
  },
  getAllDrugs(creds: { username: string; password: string }) {
    return cy.request('GET', `${this.baseUrl()}api/drugs?username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`);
  },
  deleteDrug(id: string | number, creds: { username: string; password: string }) {
    return cy.request('DELETE', `${this.baseUrl()}api/drugs/${id}?username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`);
  },
};
