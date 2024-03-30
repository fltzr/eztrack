import { Request, Response, NextFunction } from 'express';
import { compare, hash } from 'bcrypt';
import { eq } from 'drizzle-orm';
import { AuthApiResponse } from '@/shared/api-types';
import { DrizzleInstance } from '../../core/database/drizzle';
import { users } from '../../core/database/schema/user';
import { logger } from '../../core/utils/winston-logger';

export const pageloadController = async (
  request: Request,
  response: Response<AuthApiResponse>,
  next: NextFunction,
) => {
  try {
    const db = DrizzleInstance();

    const { userid } = request.session;

    if (!userid) {
      return response.status(200).json({
        authenticated: false,
        user: null,
        message: 'No user id found in session',
      });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, userid),
    });

    if (!user) {
      return response.status(200).json({
        authenticated: false,
        user: null,
        message: 'User not found',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;

    return response.status(200).json({
      authenticated: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const signinController = async (
  request: Request,
  response: Response<AuthApiResponse>,
  next: NextFunction,
) => {
  try {
    const { username, password } = request.body;

    const db = DrizzleInstance();
    const userWithPassword = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (!userWithPassword) {
      return response.status(400).json({
        authenticated: false,
        user: null,
        message: 'User not found',
      });
    }

    const doesPasswordMatch = await compare(password, userWithPassword.password);

    if (!doesPasswordMatch) {
      return response.status(400).json({
        authenticated: false,
        user: null,
        message: 'Incorrect password',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = userWithPassword;

    request.session.userid = userWithoutPassword.id;
    request.session.authenticated = true;

    return response.status(200).json({
      authenticated: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    logger.error(error);

    return next(error);
  }
};

export const signupController = async (
  request: Request,
  response: Response<AuthApiResponse>,
  next: NextFunction,
) => {
  try {
    const db = DrizzleInstance();
    const { username, email, password, firstName, lastName, birthDate, gender, zipCode } = request.body;

    const user = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    if (user) {
      return response.status(200).json({
        authenticated: false,
        user: null,
        message: 'User already exists',
      });
    }

    const hashedPassword = await hash(password, 10);
    const formattedBirthDate = new Date(birthDate).toLocaleDateString();

    await db.insert(users).values({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      birthDate: formattedBirthDate,
      gender,
      zipCode,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = await db.query.users.findFirst({
      where: eq(users.username, username),
    });

    return response.status(201).json({
      authenticated: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    logger.error(error);

    // Duploicate key value violates unique constraint
    if (error?.code === '23505') {
      return response.status(409).json({
        authenticated: false,
        user: null,
        message: 'User already exists',
      });
    }

    return next(error);
  }
};

export const signoutController = async (
  request: Request,
  response: Response<AuthApiResponse>,
  next: NextFunction,
) => {
  try {
    request.session.destroy((error) => {
      if (error) {
        return response.status(400).json({
          authenticated: false,
          user: null,
          message: 'Unable to sign out. Please try again later.',
        });
      }

      response.clearCookie('connect.sid', {
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
      });

      return response.status(200).json({
        authenticated: false,
        user: null,
      });
    });
  } catch (error) {
    return next(error);
  }
};

export const userinfoController = async (
  request: Request,
  response: Response<AuthApiResponse>,
  next: NextFunction,
) => {
  try {
    const uid = request.session.userid;

    const db = DrizzleInstance();

    const user = await db.query.users.findFirst({
      where: eq(users.id, uid),
    });

    if (!user) {
      return response.status(400).json({
        authenticated: false,
        user: null,
        message: 'User not found',
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = user;
    return response.status(200).json({
      authenticated: true,
      user: userWithoutPassword,
    });
  } catch (error) {
    return next(error);
  }
};
