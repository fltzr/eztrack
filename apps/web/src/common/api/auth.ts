import { SignInSchemaType } from '../../features/auth/types/index';
import { Account } from '../types/user';
import { api } from '../utils/axios';

type PageloadResponse = {
  isAuthenticated: boolean;
  user: Account | null;
};

export const pageload = async (): Promise<{
  isAuthenticated: boolean;
  user: Account | null;
}> => {
  try {
    const response = await api.post<PageloadResponse>('/pageload', {
      pageUrl: window.location.href,
    });

    return response.data;
  } catch (error) {
    console.error('Error in pageload:', error);
    throw error; // Rethrow the error or handle it as per your error handling strategy
  }
};

export const signin = async (data: SignInSchemaType): Promise<Account> => {
  try {
    const response = await api.post<Account>(`/signin`, data);

    return response.data;
  } catch (error) {
    console.error('Error in signin:', error);
    throw error;
  }
};

export const signout = async (): Promise<void> => {
  try {
    await api.post(`/signout`);
  } catch (error) {
    console.error('Error in signout:', error);
    throw error;
  }
};
