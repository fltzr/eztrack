import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import { HttpException } from '../exceptions/http-exception';
import { logger } from '../utils/winston-logger';

export const validate =
  (schema: z.ZodSchema) => (request: Request, response: Response, next: NextFunction) => {
    try {
      schema.parse(request.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.error(error);
        next(new HttpException(400, 'Validation failed'));
      }
    }
  };
