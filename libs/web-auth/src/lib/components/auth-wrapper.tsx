import { PropsWithChildren } from 'react';
import { Loader } from '@/web/ui';
import { useAuthCheck } from '../hooks/use-auth-check';
import { useAuthStore } from '../store/use-auth-store';

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const authenticated = useAuthStore((s) => s.authenticated);

  useAuthCheck();

  if (authenticated === null) {
    return <Loader />;
  }

  return children;
};
