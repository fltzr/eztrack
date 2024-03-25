import { defineConfig } from 'drizzle-kit';
import { env } from './src/core/config';

export default defineConfig({
  schema: 'apps/api/src/core/database/schema/*',
  out: 'drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.POSTGRESQL_DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
