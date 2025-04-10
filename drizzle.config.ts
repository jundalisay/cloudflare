import { defineConfig } from 'drizzle-kit';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL is not set');

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',

  dbCredentials: {
    url: process.env.DATABASE_URL,
    authToken: process.env.DATABASE_AUTH_TOKEN
  },

  verbose: true,
  strict: true,
  dialect: 'turso'
});


// export default {
//   schema: './src/lib/server/schema.ts',
//   out: './drizzle',
//   driver: 'libsql',
//   dbCredentials: {
//     url: process.env.TURSO_DB_URL || 'file:./local.db'
//   }
// } satisfies Config;