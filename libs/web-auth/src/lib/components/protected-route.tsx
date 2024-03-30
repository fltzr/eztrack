import { Loader } from '@/web/ui';
import { useAuthStore } from '../store/use-auth-store';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  console.log('ProtectedRoute');
  const authenticated = useAuthStore((s) => s.authenticated);

  if (authenticated === null) {
    return <Loader />;
  }

  if (!authenticated) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};
