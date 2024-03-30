export type CourtreserveEventApiResponse = {
  Data: CourtreserveEvent[] | [];
  Total: number;
  AggregateResults: unknown[] | null;
  Errors: unknown | null;
};

export type CourtreserveEvent = {
  Title: string;
  Start: string;
  End: string;
  ReservationId: number;
  Number: string;
  UqId: string;
  EventType: CourtreserveEventType;
  EventName: string;
  EventId: string;
  MaxMembersOnEvent: number;
  SignedMembers: number;
  IsFull: boolean;
  AllowWaitList: boolean;
  IsMemberOnWaitList: boolean;
  IsMemberRegistered: boolean;
  CanSignUp: boolean;
  IsRegistrationOpen: boolean;
  TimeDisplay: string;
};

export enum CourtreserveEventType {
  PickleballClinic = 'Pickleball Clinic',
  PickleballDropIn = 'Pickleball Drop-in',
  PickleballLeagueAdult = 'Pickleball League (Adult)',
  PickleballSocial = 'Pickleball  Social',
  PlayWithTheProPBDropIn = 'Play with the Pro: PB Drop-in',
  PickleballRoundRobin = 'Pickleball Round Robin',
  TennisAdultSocial = 'Tennis Adult Social',
}

export type CourtreserveEventTransformed = {
  id: string;
  title: string;
  start: string;
  end: string;
  reservationId: number;
  number: string;
  uqId: string;
  eventType: CourtreserveEventType;
  eventName: string;
  eventId: string;
  maxMembersOnEvent: number;
  signedMembers: number;
  isFull: boolean;
  allowWaitList: boolean;
  isMemberOnWaitList: boolean;
  isMemberRegistered: boolean;
  canSignUp: boolean;
  isRegistrationOpen: boolean;
  timeDisplay: string;
};

export type CourtreserveEventResponseTransformed = {
  events: CourtreserveEventTransformed[];
  total: number;
};
