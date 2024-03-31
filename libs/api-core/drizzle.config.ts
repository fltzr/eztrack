import { defineConfig } from 'drizzle-kit';

import { env } from './src/lib/config';

export default defineConfig({
  schema: 'apps/api/src/core/database/schema/*',
  out: 'drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: env.POSTGRESQL_DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
