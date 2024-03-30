import { useCallback, useEffect } from 'react';
import Flashbar from '@cloudscape-design/components/flashbar';
import { useNotificationStore } from '@/web/state-management';

export const Notification = () => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore(
    (state) => state.removeNotification,
  );

  const handleDismiss = useCallback(
    (id: string) => {
      removeNotification(id);
    },
    [removeNotification],
  );

  useEffect(() => {
    const timers = notifications
      .filter((n) => n.autoDismiss)
      .map((n) =>
        setTimeout(() => {
          handleDismiss(n.id ?? '');
        }, 5000),
      );

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [notifications, handleDismiss]);

  return (
    <Flashbar
      stackItems
      items={notifications.map((notification) => ({
        ...notification,
        onDismiss: () => {
          handleDismiss(notification.id ?? '');
        },
      }))}
    />
  );
};
