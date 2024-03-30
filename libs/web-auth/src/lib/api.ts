import { api } from '@/web/utils';

import type { AuthApiResponse, SigninSchema, SignupSchema } from './types';

export const checkAuth = async () => {
  const response = await api.post<AuthApiResponse>('/auth/pageload');
  return response.data;
};

export const signin = async (data: SigninSchema) => {
  const response = await api.post<AuthApiResponse>('/auth/signin', data);
  return response.data;
};

export const signup = async (data: SignupSchema) => {
  const response = await api.post<AuthApiResponse>('/auth/signup', data);
  return response.data;
};

export const signout = async () => {
  await api.post('/auth/signout');
};
