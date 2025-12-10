export const PatientsService = {
  baseUrl() {
    return Cypress.config('baseUrl') as string;
  },
  addPatient(patient: Record<string, any>, creds: { username: string; password: string }) {
    return cy.request('POST', `${this.baseUrl()}api/patients`, { ...patient, username: creds.username, password: creds.password });
  },
  getAllPatients(creds: { username: string; password: string }) {
    return cy.request('GET', `${this.baseUrl()}api/patients?username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`);
  },
  deletePatient(id: string | number, creds: { username: string; password: string }) {
    return cy.request('DELETE', `${this.baseUrl()}api/patients/${id}?username=${encodeURIComponent(creds.username)}&password=${encodeURIComponent(creds.password)}`);
  },
};
