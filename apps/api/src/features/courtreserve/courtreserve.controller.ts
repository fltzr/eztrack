import { Request, Response, type NextFunction } from 'express';

import { logger } from '@/api/core';

import { fetchCourtreseveEvents, watchEventService } from './courtreserve.service';
import { CourtreserveEventType } from './courtreserve.types';

export const eventsController = async (request: Request, response: Response) => {
  try {
    const { eventType, eventName, eventId, skillLevel, timeDisplay, dayOfWeek } = request.query;

    logger.info(
      `Received request to fetch courtreserve events with query params: ${JSON.stringify(
        request.query,
      )}`,
    );

    const events = await fetchCourtreseveEvents({
      eventType: eventType as CourtreserveEventType,
      eventName: eventName as string,
      eventId: eventId as string,
      skillLevel: skillLevel as string,
      timeDisplay: timeDisplay as string,
      dayOfWeek: dayOfWeek as string,
    });
    return response.status(200).json(events);
  } catch (error) {
    logger.error(error);
    return response.status(500).json({ error: error.message });
  }
};

export const watchEventController = async (request: Request, response: Response, next: NextFunction) => {
  try {
    const { notificationType, eventId } = request.body as {
      eventId: string;
      notificationType: {
        registrationOpens?: boolean;
        spotAvailable?: boolean;
      };
    };

    await watchEventService({
      userId: request.session.userid,
      eventId,
      notificationType,
    });

    return response.status(200).send();
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
