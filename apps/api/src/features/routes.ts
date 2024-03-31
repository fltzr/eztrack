import { Router } from 'express';

import { authenticated } from '@/api/core';

import { authRoutes } from '../features/auth/auth.routes';

import { courtReserveRoutes } from './courtreserve/courtreserve.routes';
import { financesRoutes } from './finances/finances.routes';

export const router = Router();

router
  .use('/auth', authRoutes)
  .use('/courtreserve', authenticated, courtReserveRoutes)
  .use('/finances', authenticated, financesRoutes);
