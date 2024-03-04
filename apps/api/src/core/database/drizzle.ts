import { Pool } from 'pg';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';

import { env } from '../config/index';

import { users } from './schema/user';
import { budgetItems } from './schema/finances-budget-item';
import { courtreserveEventSubscriptions } from './schema/courtreserve-event-subscription';
import { notifications } from './schema/notification';

let pool: Pool;
let db: NodePgDatabase<{
  users: typeof users;
  notifications: typeof notifications;
  budgetItems: typeof budgetItems;
  courtreserveEventSubscriptions: typeof courtreserveEventSubscriptions;
}>;

export const initializeDrizzleInstance = async () => {
  if (!db) {
    pool = new Pool({
      connectionString: env.POSTGRESQL_DATABASE_URL,
    });

    db = drizzle(pool, {
      schema: {
        users,
        notifications,
        budgetItems,
        courtreserveEventSubscriptions,
      },
      logger: true,
    });
  }

  return db;
};

export const PostgresqlPool = () => {
  if (!pool) {
    throw new Error(
      'PostgreSQL pool not initialized. Call initializeDrizzleInstance() first.',
    );
  }

  return pool;
};

export const DrizzleInstance = () => {
  if (!db) {
    throw new Error(
      'Drizzle ORM instance not initialized. Call initializeDrizzleInstance() first.',
    );
  }

  return db;
};

export const closeDrizzleInstance = async () => {
  if (pool) {
    await pool.end();
  }
};
