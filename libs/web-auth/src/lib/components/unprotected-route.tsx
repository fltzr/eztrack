import { Navigate, Outlet } from 'react-router-dom';

import { Loader } from '@/web/ui';

import { useAuthStore } from '../store/use-auth-store';

export const UnprotectedRoute = () => {
  const authenticated = useAuthStore((s) => s.authenticated);

  if (authenticated === null) {
    return <Loader />;
  }

  if (authenticated) {
    return <Navigate to='/home' />;
  }

  return <Outlet />;
};
