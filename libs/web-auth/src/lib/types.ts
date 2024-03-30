import { z } from 'zod';

import { Account } from '@/web/types';

export type AuthApiResponse =
  | {
      authenticated: true;
      user: Account;
    }
  | {
      authenticated: false;
      user: null;
    };

export const signinSchema = z.object({
  username: z.string({ required_error: 'Enter a username or email.' }).min(3),
  password: z
    .string({ required_error: 'Wrong password. Try again or click Forgot something to reset it.' })
    .min(3),
});

export type SigninSchema = z.infer<typeof signinSchema>;

export const signupSchema = z
  .object({
    username: z.string().min(3),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
    email: z.string().email(),
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    birthDate: z.string().min(3),
    gender: z.string().min(3),
    zipCode: z.string().min(3),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupSchema = z.infer<typeof signupSchema>;
