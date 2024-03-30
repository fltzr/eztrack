import type { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { api } from '@/web/utils';

import { signout as signoutApi } from '../api';

export const useAuthInterceptor = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          signoutApi();
          navigate('/', {
            state: { from: window.location.pathname, reason: 'unauthorized' },
          });
        }

        return Promise.reject(new Error(error.message || 'An error occurred'));
      },
    );

    return () => {
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);
};
