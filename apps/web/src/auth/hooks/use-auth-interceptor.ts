import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { api } from '@/web/utils';
import { useAuthData } from './use-auth-data';

export const useAuthInterceptor = () => {
  const navigate = useNavigate();
  const { signout } = useAuthData();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          signout();
          navigate('/signin', {
            state: { from: window.location.pathname, reason: 'unauthorized' },
          });
        }

        return Promise.reject(new Error(error.message || 'An error occurred'));
      },
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate, signout]);
};
