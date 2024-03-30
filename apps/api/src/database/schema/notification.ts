import { relations } from 'drizzle-orm';
import { foreignKey, index, pgEnum, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';

import { courtreserveEventSubscriptions } from './courtreserve-event-subscription';

export const notificationStatusEnum = pgEnum('notification_status', ['sent', 'failed']);

export const notifications = pgTable(
  'notifications',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    subscriptionId: uuid('subscription_id')
      .references(() => courtreserveEventSubscriptions.id)
      .notNull(),
    notificationType: varchar('notification_type', { length: 50 }).notNull(),
    message: text('message').notNull(),
    sentAt: timestamp('sent_at', { withTimezone: true }).notNull(),
    status: notificationStatusEnum('status'),
  },
  (table) => ({
    subscriptionIdx: index('subscription_idx').on(table.subscriptionId),
    subscriptionFk: foreignKey({
      columns: [table.subscriptionId],
      foreignColumns: [courtreserveEventSubscriptions.id],
    }),
  }),
);

export const notificationRelations = relations(notifications, ({ one }) => ({
  subscription: one(courtreserveEventSubscriptions, {
    fields: [notifications.subscriptionId],
    references: [courtreserveEventSubscriptions.id],
  }),
}));

export type InsertNotification = typeof notifications.$inferInsert;
