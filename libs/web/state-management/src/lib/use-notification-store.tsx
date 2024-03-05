import { mountStoreDevtool } from 'simple-zustand-devtools';
import { create } from 'zustand';
import type { FlashbarProps } from '@cloudscape-design/components/flashbar';

type Notification = FlashbarProps.MessageDefinition & { autoDismiss?: boolean };

type NotificationStore = {
  // Initial state
  notifications: Notification[];

  // Actions
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  // Initial state
  notifications: [],

  // Actions
  addNotification: (notification) => {
    set((state) => ({ notifications: [...state.notifications, notification] }));
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
}));

if (import.meta.env.DEV) {
  mountStoreDevtool('Notification Store', useNotificationStore);
}
