import express, { Application, json, urlencoded } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import hpp from 'hpp';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

import { env } from './core/config/index';
import { logger, stream } from '@/api/core';
import { initializeOpenIDConnectClient } from './core/utils/oidc-client';
import { PostgresqlPool, initializeDrizzleInstance } from './core/database/drizzle';
import { router } from './features/routes';
// import { notificationCron } from '@features/notifications/notification.service';

export const createApplicaton = async () => {
  const app = express();

  // Initialize OpenID Connect client
  await initializeOpenIDConnectClient().catch((error) =>
    logger.error(`❌ Error while initializing OpenID Client: ${error} `),
  );

  // Initialize Drizzle instance
  await initializeDrizzleInstance().catch((error) => {
    logger.error(`❌ Error while initializing Drizzle: ${error}`);
  });

  // Initialize Express middleware
  initializeMiddleware(app);

  // Initialize session store
  initializeSessionStore(app);

  // Initialize Express routes
  initializeRoutes(app);

  // Start notification cron
  // notificationCron.start();

  logger.info('✅ Application initialized.');
  return app;
};

const initializeMiddleware = (app: Application) => {
  app.use(morgan('dev', { stream }));
  app.use(
    cors({
      origin: env.ORIGIN,
      credentials: true,
    }),
  );
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(json());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
};

const initializeSessionStore = (app: Application) => {
  const pgSession = connectPgSimple(session);
  const pgSessionStore = new pgSession({
    pool: PostgresqlPool(),
    createTableIfMissing: true,
    schemaName: 'public',
    tableName: 'session',
    ttl: 60000,
    pruneSessionInterval: 30000,
    errorLog: logger.error.bind(logger),
  });

  app.use(
    session({
      secret: env.SESSION_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: true,
        maxAge: 1000 * 60 * 30,
      },
      store: pgSessionStore,
    }),
  );
};

const initializeRoutes = (app: Application) => {
  console.log('Initializing routes');
  app.use('/', router);
};
