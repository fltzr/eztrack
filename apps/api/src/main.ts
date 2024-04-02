import fs from 'fs';
import https from 'https';
import path from 'path';

import { env, logger, closeDrizzleInstance } from '@/api/core';

import { createApplicaton } from './app';

const startServer = async () => {
  try {
    const app = await createApplicaton();

    const certPath = path.join(__dirname, env.SSL_CERT_PATH);
    const keyPath = path.join(__dirname, env.SSL_KEY_PATH);

    logger.info(`🔐 Using SSL certificate: ${certPath}`);
    logger.info(`🔐 Using SSL key: ${keyPath}`);

    const credentials = {
      cert: fs.readFileSync(certPath, 'utf-8'),
      key: fs.readFileSync(keyPath, 'utf-8'),
    };

    const httpsServer = https.createServer(credentials, app);

    httpsServer.listen(env.PORT, '0.0.0.0', () => {
      logger.info(`🚀 Server listening over HTTPS @ 0.0.0.0:3000`);
    });
  } catch (error) {
    console.error(`❌ Error starting server: ${error}`);

    // Clean up database connections, etc.
    await closeDrizzleInstance();

    console.debug('❗ Closed existing database connectins');
  }
};

startServer();
