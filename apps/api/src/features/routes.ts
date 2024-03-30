import { Router } from 'express';
import { authRoutes } from './auth/auth.routes';
import { financesRoutes } from './finances/finances.routes';
import { authenticated } from '../core/middleware/authenticated.middleware';
import { courtReserveRoutes } from './courtreserve/courtreserve.routes';

export const router = Router();

router
  .use('/auth', authRoutes)
  .use('/courtreserve', authenticated, courtReserveRoutes)
  .use('/finances', authenticated, financesRoutes);
