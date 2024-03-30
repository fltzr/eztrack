import { useState } from 'react';

import { useNotificationStore } from '@/web/state-management';

import { CourtreserveEventTable } from '../components/courtreserve-events-table';
import type { CourtreserveEvent } from '../components/courtreserve-events-table/config';

import {
  useAddCourtreserveSubsctiptionMutation,
  useFetchCourtreserveEventsQuery,
} from './hooks';

export const CourtreserveEventsPage = () => {
  const [selectedItems, setSelectedItems] = useState<CourtreserveEvent[]>([]);
  const addNotification = useNotificationStore((s) => s.addNotification);

  const fetchCourtreserveEvents = useFetchCourtreserveEventsQuery();
  const addCourtreserveSubsctiptionMutation =
    useAddCourtreserveSubsctiptionMutation();

  const handleRefreshClick = () => {
    fetchCourtreserveEvents.refetch().catch((error) => {
      console.error(error);
    });
  };

  const handleAddSubscriptionsClick = () => {
    addCourtreserveSubsctiptionMutation
      .mutateAsync({
        eventId: selectedItems[0].id,
        notificationType: {
          registrationOpens: true,
          spotAvailable: false,
        },
      })
      .then(() => {
        addNotification({
          id: 'notification-courtreserve-subscription-added',
          type: 'success',
          header: 'Subscription added',
          content: 'You will now receive notifications for this event',
          autoDismiss: true,
          dismissible: true,
        });
      })
      .catch(() => {
        addNotification({
          id: 'notification-courtreserve-subscription-error',
          type: 'error',
          header: 'Error adding subscription',
          content:
            'Try adding the subscription again or refresh the page. If the problem persists, contact support.',
          autoDismiss: false,
          dismissible: true,
        });
      });
  };

  return (
    <CourtreserveEventTable
      events={fetchCourtreserveEvents.data.events}
      selectedItems={selectedItems}
      setSelectedItems={setSelectedItems}
      loading={
        fetchCourtreserveEvents.isFetching ||
        fetchCourtreserveEvents.isRefetching
      }
      miscButtonLabel="Watch"
      onRefreshClick={handleRefreshClick}
      onMiscClick={handleAddSubscriptionsClick}
    />
  );
};

export const Component = CourtreserveEventsPage;
