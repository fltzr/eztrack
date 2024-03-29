import { fetchAndDispatchEventSubscriptions } from '../courtreserve/courtreserve.service';
import { logger } from '../../core/utils/winston-logger';
import cron from 'node-cron';

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
