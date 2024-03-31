import { relations } from 'drizzle-orm';
import { boolean, foreignKey, index, pgTable, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { notifications } from './notification';
import { users } from './user';

export const courtreserveEventSubscriptions = pgTable(
  'courtreserve_event_subscriptions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .references(() => users.id)
      .notNull(),
    eventId: varchar('event_id', { length: 255 }).notNull(),
    notify_on_registration_open: boolean('notify_on_registration_open').notNull(),
    notify_on_spot_available: boolean('notify_on_spot_available').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    userSubscriptionIdx: index('user_subscription_idx').on(table.userId),
    userSubscriptionFk: foreignKey({
      columns: [table.userId],
      foreignColumns: [users.id],
    }),
  }),
);

export const courtreserveEventSubscriptionRelations = relations(
  courtreserveEventSubscriptions,
  ({ one, many }) => ({
    user: one(users, {
      fields: [courtreserveEventSubscriptions.userId],
      references: [users.id],
    }),
    notifications: many(notifications),
  }),
);

export type InsertCourtreserveEventSubscription = typeof courtreserveEventSubscriptions.$inferInsert;
export type SelectCourtreserveEventSubscription = typeof courtreserveEventSubscriptions.$inferSelect;
