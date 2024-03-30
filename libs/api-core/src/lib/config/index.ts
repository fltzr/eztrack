import { config } from 'dotenv';
import { cleanEnv, bool, port, str, url } from 'envalid';
import { resolve } from 'path';
import { cwd } from 'process';

config({ path: resolve(cwd(), '.env.local') });

export const env = cleanEnv(process.env, {
  // General configuration
  NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
  PORT: port({ devDefault: 5174 }),
  SESSION_SECRET: str(),
  LOG_FORMAT: str({ choices: ['combined', 'dev', 'simple'] }),
  LOG_DIR: str({ devDefault: '../../../logs' }),
  ORIGIN: url(),
  CREDENTIALS: bool({ default: true }),

  // PostgreSQL configuration
  POSTGRESQL_DATABASE_URL: url(),

  // OIDC configuration
  OIDC_ISSUER: url(),
  OIDC_CLIENT_ID: str(),
  OIDC_CLIENT_SECRET: str(),
  OIDC_REDIRECT_URI: url({ devDefault: 'http://192.168.1.168:4000/' }),
  OIDC_SCOPE: str(),
  OIDC_RESPONSE_TYPE: str(),
  OIDC_RESPONSE_MODE: str(),
  OIDC_GRANT_TYPE: str(),
  OIDC_USE_PKCE: bool(),

  // Email service configuration
  EMAIL_HOST: str(),
  EMAIL_PORT: str(),
  EMAIL_IAM_USERNAME: str(),
  EMAIL_USERNAME: str(),
  EMAIL_PASSWORD: str(),

  // Courtreserve API configuration
  COURTRESERVE_API_URI: url(),
  COURTRESERVE_API_COOKIE: str(),
  COURTRESERVE_API_BODY: str(),
  COURTRESERVE_API_NEWRELIC: str(),
  'COURTRESERVE_API_X-NEWRELIC-ID': str(),
});
