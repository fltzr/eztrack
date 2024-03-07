import type { AxiosError } from 'axios';
import { useAuthStore } from 'libs/web/web-shared-state-management/src';
import { useAuthData } from './use-auth-data';
import { pageload, signin, signout } from '../auth-api';
import { SignInSchemaType } from '../../features/auth/types/index';

export const useAuth = () => {
  const authenticated = Boolean(useAuthStore((s) => s.account));
  const account = useAuthStore((s) => s.account);

  const { signin: userDataSignin, signout: userDataSignout } = useAuthData();

  const pageloadAction = async () => {
    try {
      const { isAuthenticated, user } = await pageload();

      if (isAuthenticated) {
        userDataSignin(user);
      }

      return { isAuthenticated, user };
    } catch (error) {
      console.error('Error in pageloadAction:', error);

      return { isAuthenticated: false, user: null };
    }
  };

  const signinAction = async (data: SignInSchemaType) => {
    try {
      const user = await signin(data);

      userDataSignin(user);

      return user;
    } catch (error) {
      // Get the correct type for this error
      const axiosError = error as AxiosError;

      throw axiosError;
    }
  };

  const signoutAction = async () => {
    try {
      await signout();

      userDataSignout();
    } catch (error) {
      console.error('Error in signoutAction:', error);
    }
  };

  return {
    authenticated,
    account,
    pageload: pageloadAction,
    signin: signinAction,
    signout: signoutAction,
  };
};
