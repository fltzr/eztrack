import { NextFunction, Request, Response } from 'express';

export const requireHttps = (request: Request, response: Response, next: NextFunction) => {
  if (!request.secure && request.get('x-forwarded-proto') !== 'https') {
    return response.redirect(`https://${request.get('host')}${request.url}`);
  }

  return next();
};
