import { fetchWithTypes } from '../../core/utils/typesafe-fetch';
import { CourtreserveEventApiResponse, CourtreserveEventType } from './courtreserve.types';
import {
  filterEventsByDayOfWeek,
  filterEventsByEventId,
  filterEventsByEventName,
  filterEventsByEventType,
  filterEventsBySkillLevel,
  filterEventsByTimeDisplay,
  transformApiResponse,
} from './courtreserve.utils';
import { DrizzleInstance } from '../../core/database/drizzle';
import {
  courtreserveEventSubscriptions,
  InsertCourtreserveEventSubscription,
} from '../../core/database/schema/courtreserve-event-subscription';
import { DateTime } from 'luxon';
import { logger } from '../../core/utils/winston-logger';
import { sendEmail } from '../../core/utils/node-mailer';
import { users } from '../../core/database/schema/user';
import { eq } from 'drizzle-orm';
import { notifications, InsertNotification } from '../../core/database/schema/notification';

export const fetchCourtreseveEvents = async (
  filters: {
    eventType?: CourtreserveEventType;
    eventName?: string;
    eventId?: string;
    skillLevel?: string;
    timeDisplay?: string;
    dayOfWeek?: string;
  } = {},
) => {
  const response = await fetchWithTypes<CourtreserveEventApiResponse>(
    'https://app.courtreserve.com/Online/Calendar/ReadCalendarEvents/6943?hidePastEventsOnEventCalendar=True',
    {
      headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        newrelic:
          'eyJ2IjpbMCwxXSwiZCI6eyJ0eSI6IkJyb3dzZXIiLCJhYyI6IjM1NDgyMDQiLCJhcCI6IjExMDMxOTQ4ODUiLCJpZCI6IjQ4YTY1NjBkODlhYjJiOTUiLCJ0ciI6Ijg0YzA4M2Q1Mzg2N2M3MjRhODU0ODg5ZTdlNTgxMjg5IiwidGkiOjE3MDg3MTk5MzA4MTl9fQ==',
        pragma: 'no-cache',
        'sec-ch-ua': '"Not A(Brand";v="99", "Google Chrome";v="121", "Chromium";v="121"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        traceparent: '00-84c083d53867c724a854889e7e581289-48a6560d89ab2b95-01',
        tracestate: '3548204@nr=0-1-3548204-1103194885-48a6560d89ab2b95----1708719930819',
        'x-newrelic-id': 'VwMDWVRTDBABVFRSBAcDUlMD',
        'x-requested-with': 'XMLHttpRequest',
        cookie:
          'ASP.NET_SessionId=fyifmtsjhty3osnztjyppz1l; __stripe_mid=2f0b4633-171b-4887-a751-957de568b41b5e9973; .AspNet.ApplicationCookie=QiJmUiGttjeTYCMQm3RsuZ4z6mtkAPl_CCdAyts52naIlwxPR8NyomSnItHsy0bnBsaQtnHHpJxHOJaaForG_LLtSWQqJXqXePEhZnkVf57VK247MtXBonrkIFO_5rndIGZMfkIXsYp0aKxpWN7xBTk3l14rnck4f0slHxL1yfxxJ1nxgnsEdow2Hw8apYxedK5CmEtg725MspCK8k2a1Qew6Clo00YWX6h4Q3FpPkRni7qOwCFR5ySbkPpaKgSZNIntmYyqHxkD9Kz-_4_3B_ygyDTi7voaQawYRFacwAeBcyrmbiJPt0qI-y5TWUBPfGWS0zHQzlbawXZkgUQFyvvfXr2ksi76BTmx2TC0KHHSTQCUyqFKwG9RgKPuho_dSbanPAAZEDe-q9Vtcc9-sXczTIecysGZ0ScK35fBuSvX8lrOINriXNQlfRb3MRdoZX030MKQ12tf4Rg0MMt6L4mrDkv6SJlvYrbIo-dB38PNox3VKqPB8TGGk0q1EIegVMZSWsv8c3RnbvZGEx8XHVmPFzyNWhNWTB-a4CEhX_CqaTKv; EventsCalendarViewType=Month; __stripe_sid=bd0d8b0e-1c64-4d80-a41a-3864c9c5864b9e1bca; IsPayNowVisible=false',
        Referer: 'https://app.courtreserve.com/Online/Calendar/Events/6943/Month',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
      },
      body: 'sort=&group=&filter=&jsonData=%7B%22startDate%22%3A%222024-01-28T05%3A00%3A00.000Z%22%2C%22end%22%3A%222024-03-09T05%3A00%3A00.000Z%22%2C%22Date%22%3A%22Sun%2C+28+Jan+2024+05%3A00%3A00+GMT%22%2C%22orgId%22%3A%226943%22%2C%22TimeZone%22%3A%22America%2FNew_York%22%2C%22KendoStart%22%3A%7B%22Year%22%3A2024%2C%22Month%22%3A1%2C%22Day%22%3A28%7D%2C%22KendoEnd%22%3A%7B%22Year%22%3A2024%2C%22Month%22%3A3%2C%22Day%22%3A9%7D%2C%22Categories%22%3A%5B%5D%2C%22CostTypeId%22%3A%2289704%22%2C%22MemberId%22%3A%222023983%22%2C%22FamilyId%22%3A%22871040%22%2C%22FamilyMemberIds%22%3A%222023983%22%2C%22EventSessionIds%22%3A%5B%5D%7D',
      method: 'POST',
    },
  );

  const transformedResponse = transformApiResponse(response);

  if (filters.eventType) {
    transformedResponse.events = filterEventsByEventType(transformedResponse.events, filters.eventType);
  }

  if (filters.eventName) {
    transformedResponse.events = filterEventsByEventName(transformedResponse.events, filters.eventName);
  }

  if (filters.eventId) {
    transformedResponse.events = filterEventsByEventId(transformedResponse.events, filters.eventId);
  }

  if (filters.timeDisplay) {
    transformedResponse.events = filterEventsByTimeDisplay(
      transformedResponse.events,
      filters.timeDisplay,
    );
  }

  if (filters.skillLevel) {
    transformedResponse.events = filterEventsBySkillLevel(
      transformedResponse.events,
      filters.skillLevel,
    );
  }

  if (filters.dayOfWeek) {
    transformedResponse.events = filterEventsByDayOfWeek(transformedResponse.events, filters.dayOfWeek);
  }

  transformedResponse.total = transformedResponse.events.length;

  return transformedResponse;
};

export const watchEventService = async (params: {
  userId: string;
  eventId: string;
  notificationType: {
    registrationOpens?: boolean;
    spotAvailable?: boolean;
  };
}) => {
  const db = DrizzleInstance();

  const subscription: InsertCourtreserveEventSubscription = {
    userId: params.userId,
    eventId: params.eventId,
    notify_on_registration_open: params.notificationType.registrationOpens,
    notify_on_spot_available: params.notificationType.spotAvailable,
  };

  await db.insert(courtreserveEventSubscriptions).values(subscription);
};

export const fetchAndDispatchEventSubscriptions = async () => {
  const db = DrizzleInstance();
  const date = DateTime.now();

  // Fetch all event subscriptions
  const subscriptions = await db.select().from(courtreserveEventSubscriptions).execute();

  // Fetch all events
  const { events } = await fetchCourtreseveEvents();

  logger.info(`Fetched ${events.length} events and ${subscriptions.length} subscriptions`);

  events.forEach((event) => {
    // For each event, filter out subscriptions that match the event
    const potentialEventNotifications = subscriptions.filter((sub) => {
      logger.info(`Checking subscription ${sub.id} for event ${event.id}`);
      logger.info(sub.eventId === event.id);

      return sub.eventId === event.id;
    });

    // For each subscription, send a notification if it matches the event
    potentialEventNotifications.forEach(async (subscription) => {
      const user = await db.query.users.findFirst({
        where: eq(users.id, subscription.userId),
      });

      if (!user.email) {
        logger.error(`User ${user.id} does not have an email address. Skipping...`);
        return;
      }

      logger.info(`Preparing to send notification for user ${user.id}`);

      // Calculate the time difference between now and the event start
      const eventStart = DateTime.fromISO(event.start);
      const registrationOpens = eventStart.minus({ days: 3, hours: 1 });
      const timeDiffMinutes = registrationOpens.diff(date).as('minutes');

      // If the event is full, send a notification to the user
      if (subscription.notify_on_registration_open) {
        logger.info(`Sending registration open notification for event ${event.eventId}`);

        sendEmail({
          to: user.email,
          subject: `Registration opens for ${event.title} in ${timeDiffMinutes} minutes!`,
          text: `Registration for ${event.title} opens in ${timeDiffMinutes} minutes!`,
        })
          .then(() => {
            const notification: InsertNotification = {
              subscriptionId: subscription.id,
              notificationType: 'registration_open',
              message: `Registration for ${event.title} opens in ${timeDiffMinutes} minutes!`,
              sentAt: DateTime.now().toJSDate(),
              status: 'sent',
            };

            db.insert(notifications).values(notification).execute();
            db.delete(courtreserveEventSubscriptions)
              .where(eq(courtreserveEventSubscriptions.id, subscription.id))
              .execute();
          })
          .catch((error) => {
            logger.error(`Error sending email: ${error}`);
            const notification: InsertNotification = {
              subscriptionId: subscription.id,
              notificationType: 'registration_open',
              message: `Error sending email: ${error}`,
              sentAt: DateTime.now().toJSDate(),
              status: 'failed',
            };

            db.insert(notifications).values(notification).execute();
          });
      }

      if (subscription.notify_on_spot_available && !event.isMemberRegistered && !event.isFull) {
        logger.info(`Sending spot available notification for event ${event.eventId}`);

        sendEmail({
          to: user.email,
          subject: `Spot available for ${event.title}!`,
          text: `A spot has become available for ${event.title}!`,
        })
          .then(() => {
            const notification: InsertNotification = {
              subscriptionId: subscription.id,
              notificationType: 'spot_available',
              message: `A spot has become available for ${event.title}!`,
              sentAt: DateTime.now().toJSDate(),
              status: 'sent',
            };

            db.insert(notifications).values(notification).execute();
          })
          .catch((error) => {
            const notification: InsertNotification = {
              subscriptionId: subscription.id,
              notificationType: 'registration_open',
              message: `Error sending email`,
              sentAt: DateTime.now().toJSDate(),
              status: 'failed',
            };

            db.insert(notifications).values(notification).execute();

            logger.error(`Error sending email: ${error}`);
          });
      }
    });
  });
};
