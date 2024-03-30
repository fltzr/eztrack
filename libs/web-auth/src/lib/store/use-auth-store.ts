import { create } from 'zustand';
import { Account } from '@/web/types';
import {
  checkAuth as checkAuthApi,
  signin as signinApi,
  signup as signupApi,
  signout as signoutApi,
} from '../api';
import type { SigninSchema, SignupSchema } from '../types';

type UseAuthStore = {
  authenticated: boolean | null;
  user: Account | null;
  checkAuth: () => Promise<void>;
  signin: (data: SigninSchema) => Promise<void>;
  signup: (data: SignupSchema) => Promise<void>;
  signout: () => Promise<void>;
};

export const useAuthStore = create<UseAuthStore>((set) => ({
  authenticated: null,
  user: null,
  checkAuth: async () => {
    try {
      const { authenticated, user } = await checkAuthApi();

      set({ authenticated, user });
    } catch (error) {
      set({ authenticated: false, user: null });
    }
  },
  signin: async (data) => {
    try {
      const { authenticated, user } = await signinApi(data);

      set({ authenticated, user });
    } catch (error) {
      set({ authenticated: false, user: null });
    }
  },
  signup: async (data) => {
    try {
      const { authenticated, user } = await signupApi(data);

      set({ authenticated, user });
    } catch (error) {
      set({ authenticated: false, user: null });
    }
  },
  signout: async () => {
    try {
      await signoutApi();

      set({ authenticated: false, user: null });
    } catch (error) {
      console.error('Error in signout:', error);
    }
  },
}));
