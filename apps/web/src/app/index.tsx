import { Outlet } from 'react-router-dom';
import { useAuthInterceptor } from '@/web/auth';
import Layout from '../common/components/layout';
import { useUserPreferencesEffects } from '../common/hooks/use-user-preferences-effects';

export const App = () => {
  useAuthInterceptor();
  useUserPreferencesEffects();

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
