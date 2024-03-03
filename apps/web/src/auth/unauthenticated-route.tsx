import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from './auth-store';

export const UnauthenticatedRoute = () => {
  const location = useLocation();
  const authenticated = Boolean(useAuthStore((s) => s.account));

  if (authenticated) {
    return <Navigate replace to='/' state={{ from: location }} />;
  }

  return <Outlet />;
};
