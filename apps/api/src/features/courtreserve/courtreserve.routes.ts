import { Router } from 'express';
import { query } from 'express-validator';

import { eventsController, watchEventController } from './courtreserve.controller';

export const courtReserveRoutes = Router();

courtReserveRoutes
  .get(
    '/events',
    [
      query('eventType').optional().isString(),
      query('eventName').optional().isString(),
      query('eventId').optional().isString(),
      query('skillLevel').optional().isString(),
      query('timeDisplay').optional().isString(),
      query('dayOfWeek').optional().isString(),
    ],
    eventsController,
  )
  .post('/events/watch', watchEventController);
