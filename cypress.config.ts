import { defineConfig } from 'cypress';
import sql from 'mssql';

// Default DB config; can be overridden with environment variables
const DB_CONFIG = {
  user: process.env.DB_USER || 'sa',
  password: process.env.DB_PASSWORD || 'sa57843hFL^%*#',
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME || 'HealthcareDB',
  options: {
    trustServerCertificate: true,
  },
};

export default defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3001/',
    specPattern: 'cypress/tests/**/*.spec.ts',
    supportFile: 'cypress/support/support.ts',
    setupNodeEvents(on, config) {
      // Register tasks for DB queries
      on('task', {
        async 'db:query'({ query, inputs }: { query: string; inputs?: any[] }) {
          const conn = await sql.connect(DB_CONFIG as any);
          try {
            const req = conn.request();
            (inputs || []).forEach((value, idx) => req.input(`param${idx + 1}`, value));
            const result = await req.query(query);
            return { recordset: result.recordset };
          } finally {
            await conn.close();
          }
        },
      });

      return config;
    },
  },
});
