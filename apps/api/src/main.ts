import { env, logger } from '@/api/core';

import { createApplicaton } from './app';
import { closeDrizzleInstance } from './database/drizzle';

const startServer = async () => {
  try {
    const app = await createApplicaton();

    app.listen(env.PORT, () => {
      logger.info(`🚀 Server listening @ port ${env.PORT}.`);
    });
  } catch (error) {
    console.error(`❌ Error starting server: ${error}`);

    // Clean up database connections, etc.
    await closeDrizzleInstance();

    console.debug('❗ Closed existing database connectins');
  }
};

startServer();
