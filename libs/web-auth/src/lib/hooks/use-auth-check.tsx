import { useEffect } from 'react';

import { useAuthStore } from '../store/use-auth-store';

export const useAuthCheck = () => {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    const response = async () => {
      await checkAuth();
    };

    response();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
