import { Router } from 'express';

import { validate } from '@/api/core';

import {
  pageloadController,
  signinController,
  signupController,
  signoutController,
  userinfoController,
} from './auth.controller';
import { signinSchema, signupSchema } from './auth.zschema';

export const authRoutes: Router = Router();

authRoutes
  .post('/pageload', pageloadController)
  .post('/signin', validate(signinSchema), signinController)
  .post('/signup', validate(signupSchema), signupController)
  .post('/signout', signoutController)
  .get('/userinfo', userinfoController);
