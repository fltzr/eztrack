import Badge from '@cloudscape-design/components/badge';
import Box from '@cloudscape-design/components/box';
import Link from '@cloudscape-design/components/link';
import { DateTime } from 'luxon';

import { TableColumnDefinition } from '@/web/types';
import { formatISODate } from '@/web/utils';

import { Countdown } from '../countdown';

export type CourtreserveEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  reservationId: number;
  number: string;
  uqId: string;
  eventType: CourtreserveEventType;
  eventName: string;
  eventId: number;
  maxMembersOnEvent: number;
  signedMembers: number;
  isFull: boolean;
  allowWaitList: boolean;
  isMemberOnWaitList: boolean;
  isMemberRegistered: boolean;
  canSignUp: boolean;
  isRegistrationOpen: boolean;
  timeDisplay: string;

  // Derived fields
  registrationOpensIn?: string;
  duration?: string;
};

export enum CourtreserveEventType {
  PickleballClinic = 'Pickleball Clinic',
  PickleballDropIn = 'Pickleball Drop-In',
  PickleballLeagueAdult = 'Pickleball League (Adult)',
  PickleballSocial = 'Pickleball  Social',
  PlayWithTheProPBDropIn = 'Play with the Pro: PB Drop-In',
  TennisAdultSocial = 'Tennis Adult Social',
}

export const courtreserveEventDefinition: TableColumnDefinition<CourtreserveEvent>[] = [
  {
    id: 'isFull',
    sortingField: 'isFull',
    header: 'Status',
    cell: ({ isFull }) => (
      <Box textAlign='center'>
        <Badge color={isFull ? 'red' : 'green'}>{isFull ? 'Full' : 'Not full'}</Badge>
      </Box>
    ),
    width: 120,
  },
  {
    id: 'title',
    sortingField: 'title',
    header: 'Title',
    cell: (item) => (
      <Link
        external
        variant='primary'
        href={`https://app.courtreserve.com/Online/Events/Details/6943/${item.reservationId}?resId=${item.reservationId}`}
      >
        {item.title}
      </Link>
    ),
    width: 120,
  },
  {
    id: 'registrationOpensIn',
    sortingField: 'registrationOpensIn',
    header: 'Registration Opens In',
    cell: ({ start }) => {
      const eventStart = DateTime.fromISO(start);
      const registrationOpenDate = eventStart.minus({ days: 3, hours: 1 }).toISO() ?? '';
      const formattedTime = formatISODate(registrationOpenDate);

      // Check to see if the event is within 3 days and 1 hour
      if (eventStart < DateTime.now().plus({ days: 3, hours: 1 })) {
        return <Box variant='span'>-</Box>;
      }

      // Courtdown if the registration opens within 1 hour
      if (formattedTime.includes('seconds')) {
        return <Countdown isoDateTime={start} />;
      }

      return <Box variant='span'>{formattedTime}</Box>;
    },
    width: 120,
    isDateTime: true,
  },
  {
    id: 'start',
    sortingField: 'start',
    header: 'Start',
    cell: ({ start }) => {
      const formattedTime = formatISODate(start);

      if (formattedTime.includes('seconds')) {
        return <Countdown isoDateTime={start} />;
      }

      return <Box variant='span'>{formattedTime}</Box>;
    },
    width: 120,
    isDateTime: true,
  },
  {
    id: 'duration',
    sortingField: 'duration',
    header: 'Duration',
    cell: (item) => {
      const eventStart = DateTime.fromISO(item.start);
      const eventEnd = DateTime.fromISO(item.end);
      const duration = eventEnd.diff(eventStart, ['hours', 'minutes']).toObject();

      return <Box variant='span'>{`${duration.hours} hours`}</Box>;
    },
    width: 120,
    isDateTime: true,
  },
  {
    id: 'eventType',
    sortingField: 'eventType',
    header: 'Event Type',
    cell: (item) => item.eventType,
    width: 120,
  },
  {
    id: 'eventName',
    sortingField: 'eventName',
    header: 'Event Name',
    cell: (item) => item.eventName,
    width: 120,
  },
  {
    id: 'maxMembersOnEvent',
    sortingField: 'maxMembersOnEvent',
    header: 'Max',
    cell: (item) => item.maxMembersOnEvent,
    width: 120,
  },
  {
    id: 'signedMembers',
    sortingField: 'signedMembers',
    header: 'Registered',
    cell: (item) => item.signedMembers,
    width: 120,
  },
  {
    id: 'isMemberOnWaitList',
    sortingField: 'isMemberOnWaitList',
    header: 'On Wait List?',
    cell: (item) => (item.isMemberOnWaitList ? 'Yes' : 'No'),
    width: 120,
  },
  {
    id: 'isMemberRegistered',
    sortingField: 'isMemberRegistered',
    header: 'Registered?',
    cell: ({ isMemberRegistered }) => (
      <Box textAlign='center'>
        <Badge color={isMemberRegistered ? 'blue' : 'grey'}>
          {isMemberRegistered ? 'Registered' : 'Not registered'}
        </Badge>
      </Box>
    ),
    width: 140,
    minWidth: 140,
  },
];
