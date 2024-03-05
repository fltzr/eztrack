import { useMutation, useQuery } from '@tanstack/react-query';
import { api } from '@/web/utils';
import type { CourtreserveEvent } from '../components/courtreserve-events-table/config';

export const COURTRESERVE_QUERY_KEY = 'courtreserve-events';
export const COURTRESERVE_EVENTS_API_URL = '/courtreserve/events';

export type CourtreserveEventResponse = {
  events: CourtreserveEvent[];
  total: number;
};

export const useFetchCourtreserveEventsQuery = () =>
  useQuery({
    queryKey: [COURTRESERVE_QUERY_KEY],
    queryFn: async () => {
      const response = await api.get<CourtreserveEventResponse>(
        COURTRESERVE_EVENTS_API_URL,
      );

      return response.data;
    },
    initialData: {
      events: [],
      total: 0,
    } as CourtreserveEventResponse,
    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

export const useAddCourtreserveSubsctiptionMutation = () =>
  useMutation({
    mutationFn: async ({
      eventId,
      notificationType,
    }: {
      eventId: string;
      notificationType: {
        registrationOpens?: boolean;
        spotAvailable?: boolean;
      };
    }) => {
      const response = await api.post(`${COURTRESERVE_EVENTS_API_URL}/watch`, {
        eventId,
        notificationType,
      });

      return response.status;
    },
    retry: false,
  });
