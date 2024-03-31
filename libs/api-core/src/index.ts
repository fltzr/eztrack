// Env
export { env } from './lib/config';

// Database
export {
  initializeDrizzleInstance,
  PostgresqlPool,
  DrizzleInstance,
  closeDrizzleInstance,
} from './lib/database/drizzle';
export { users, SelectUser, InsertUser } from './lib/database/schema/user';
export { notifications, InsertNotification } from './lib/database/schema/notification';
export {
  budgetItems,
  SelectBudgetItem,
  InsertBudgetItem,
} from './lib/database/schema/finances-budget-item';
export {
  courtreserveEventSubscriptions,
  SelectCourtreserveEventSubscription,
  InsertCourtreserveEventSubscription,
} from './lib/database/schema/courtreserve-event-subscription';

// Exceptions
export { HttpException } from './lib/exceptions/http-exception';

// Middleware
export { authenticated } from './lib/middleware/authenticated.middleware';
export { errorMiddleware } from './lib/middleware/error.middleware';
export { morganMiddleware } from './lib/middleware/logger.middleware';
export { validate } from './lib/middleware/validation.middleware';

// Utils
export { fetchWithTypes } from './lib/utils/fetch';
export { sendEmail } from './lib/utils/node-mailer';
export { initializeOpenIDConnectClient } from './lib/utils/oidc-client';
export { logger, stream } from './lib/utils/winston-logger';
