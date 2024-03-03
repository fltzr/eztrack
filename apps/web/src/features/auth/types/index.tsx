import { z } from 'zod';

export const signInSchema = z.object({
  username: z.string().min(4, 'Not a valid username.'),
  password: z.string().min(5, 'Not a valid password.'),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
