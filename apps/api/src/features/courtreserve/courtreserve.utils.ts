import { DateTime } from 'luxon';

import {
  CourtreserveEvent,
  CourtreserveEventTransformed,
  CourtreserveEventType,
  type CourtreserveEventResponseTransformed,
  type CourtreserveEventApiResponse,
} from './courtreserve.types';

const parseDotNetDate = (date: string) => {
  const match = date.match(/\/Date\((\d+)\)\//);
  if (!match) {
    return null;
  }

  return DateTime.fromSeconds(parseInt(match[1]) / 1000)
    .setZone('America/New_York')
    .toISO();
};

export const transformApiResponse = (
  response: CourtreserveEventApiResponse,
): CourtreserveEventResponseTransformed => {
  const transformedData = response.Data?.map((event: CourtreserveEvent) => ({
    id: event.UqId.toString(),
    title: event.Title,
    start: parseDotNetDate(event.Start),
    end: parseDotNetDate(event.End),
    reservationId: event.ReservationId,
    number: event.Number,
    uqId: event.UqId,
    eventType: event.EventType,
    eventName: event.EventName,
    eventId: event.EventId,
    maxMembersOnEvent: event.MaxMembersOnEvent,
    signedMembers: event.SignedMembers,
    isFull: event.IsFull,
    allowWaitList: event.AllowWaitList,
    isMemberOnWaitList: event.IsMemberOnWaitList,
    isMemberRegistered: event.IsMemberRegistered,
    canSignUp: event.CanSignUp,
    isRegistrationOpen: event.IsRegistrationOpen,
    timeDisplay: event.TimeDisplay,
  })).sort((a, b) => DateTime.fromISO(b.start).diff(DateTime.fromISO(a.start)).milliseconds);

  console.log(`Returning ${transformedData.length} events`);

  return {
    events: transformedData,
    total: response.Total,
  };
};

export const filterEventsByEventType = (
  events: CourtreserveEventTransformed[],
  eventType: CourtreserveEventType,
) => events?.filter((event) => event.eventType === eventType);

export const filterEventsByEventName = (events: CourtreserveEventTransformed[], eventName: string) =>
  events?.filter((event) => event.eventName === eventName);

export const filterEventsByEventId = (events: CourtreserveEventTransformed[], eventId: string) =>
  events?.filter((event) => event.eventId === eventId);

export const filterEventsBySkillLevel = (events: CourtreserveEventTransformed[], skillLevel: string) =>
  events?.filter((event) => event.title.includes(skillLevel));

export const filterEventsByTimeDisplay = (events: CourtreserveEventTransformed[], timeDisplay: string) =>
  events?.filter((event) => event.timeDisplay === timeDisplay);

export const filterEventsByDayOfWeek = (events: CourtreserveEventTransformed[], dayOfWeek: string) =>
  events?.filter((event) => event.title.includes(dayOfWeek));
