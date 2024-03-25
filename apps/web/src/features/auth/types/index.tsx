import { z } from 'zod';

export const signinSchema = z.object({
  username: z.string().min(4, 'Not a valid username.'),
  password: z.string().min(5, 'Not a valid password.'),
});

export type SigninSchemaType = z.infer<typeof signinSchema>;

export const signupSchema = z.object({
  username: z.string().min(4, 'Not a valid username.'),
  email: z.string().email('Not a valid email.'),
  password: z.string().min(5, 'Not a valid password.'),
  firstName: z.string().min(2, 'Not a valid first name.'),
  lastName: z.string().min(2, 'Not a valid last name.'),
  birthDate: z.string().min(10, 'Not a valid birth date.'),
  gender: z.string(),
  zipCode: z.string().min(5, 'Not a valid zip code.'),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;
