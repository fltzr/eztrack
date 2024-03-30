import cron from 'node-cron';

import { logger } from '@/api/core';

import { fetchAndDispatchEventSubscriptions } from '../courtreserve/courtreserve.service';

// Run every minute
export const notificationCron = cron.schedule(
  '* * * * *',
  () => {
    logger.info('Running event subscription cron...');

    fetchAndDispatchEventSubscriptions();
  },
  {
    name: 'notification-cron',
    runOnInit: false,
  },
);
