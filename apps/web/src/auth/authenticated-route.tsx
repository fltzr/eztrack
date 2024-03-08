import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/web/state-management';

export const AuthenticatedRoute = () => {
  const authenticated = Boolean(useAuthStore((s) => s.account));

  if (!authenticated) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};
