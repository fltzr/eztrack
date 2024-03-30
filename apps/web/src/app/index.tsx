import { Outlet } from 'react-router-dom';
import { useAuthInterceptor, useAuthStore } from '@/web/auth';
import { Layout } from '@/web/ui';
import { useUserPreferencesEffects } from '../common/hooks/use-user-preferences-effects';
import { signout } from '@/web/auth';

export const App = () => {
  useAuthInterceptor();
  useUserPreferencesEffects();

  const user = useAuthStore((s) => s.user);

  return (
    <Layout user={user} signoutFn={signout}>
      <Outlet />
    </Layout>
  );
};
