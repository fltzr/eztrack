import { logger } from '../utils/winston-logger';
import { Request, Response, NextFunction } from 'express';

export const authenticated = (request: Request, response: Response, next: NextFunction) => {
  if (request.session.userid) {
    logger.info(`User ${request.session.userid} is authenticated`);
    return next();
  } else {
    return response.status(401).json({
      message: 'Unauthorized',
    });
  }
};
