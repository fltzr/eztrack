import { Navigate, Outlet } from 'react-router-dom';

import { Loader } from '@/web/ui';

import { useAuthStore } from '../store/use-auth-store';

export const ProtectedRoute = () => {
  console.log('ProtectedRoute');
  const { authenticated, user } = useAuthStore();

  if (authenticated === null) {
    return <Loader />;
  }

  if (!authenticated && !user) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};
