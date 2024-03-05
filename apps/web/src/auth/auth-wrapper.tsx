import type { PropsWithChildren } from 'react';
import { Loader, RouteError } from '@/web/ui';
import { useAuthRestore } from './hooks/use-auth-restore';

export const AuthWrapper = ({ children }: PropsWithChildren) => {
  const status = useAuthRestore();

  if (status.loading) {
    return <Loader />;
  }

  if (status.error) {
    return <RouteError />;
  }

  return children;
};
