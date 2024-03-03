import type { PropsWithChildren } from 'react';
import { Loader } from '../common/components/loader/index';
import { RouteError } from '../common/components/route-error';
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
