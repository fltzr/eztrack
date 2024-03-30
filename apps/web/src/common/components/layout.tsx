import type { PropsWithChildren } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import { useAuthStore } from '@/web/auth';
import { useLayoutStore } from '@/web/state-management';
import { Header } from './header/index';
import { Navigation } from './navigation';
import { Notification } from './notification';

const Layout = ({ children }: PropsWithChildren) => {
  const user = useAuthStore((s) => s.user);
  const { navigationHidden, navigationOpen, toolsHidden, toolsOpen, setState } = useLayoutStore((s) => ({
    navigationHidden: s.navigationHidden,
    navigationOpen: s.navigationOpen,
    toolsHidden: s.toolsHidden,
    toolsOpen: s.toolsOpen,
    setState: s.setState,
  }));

  return (
    <>
      <Header />
      <AppLayout
        content={children}
        headerSelector='#h'
        notifications={<Notification />}
        navigationWidth={250}
        navigationHide={user ? navigationHidden : true}
        navigationOpen={user ? navigationOpen : false}
        navigation={<Navigation />}
        toolsHide={user ? toolsHidden : true}
        toolsOpen={user ? toolsOpen : false}
        onNavigationChange={(event) => {
          setState({ navigationOpen: event.detail.open });
        }}
        onToolsChange={(event) => {
          setState({ toolsOpen: event.detail.open });
        }}
      />
    </>
  );
};

export default Layout;
