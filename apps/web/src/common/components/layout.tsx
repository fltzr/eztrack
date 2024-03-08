import type { PropsWithChildren } from 'react';
import AppLayout from '@cloudscape-design/components/app-layout';
import { useAuthStore, useLayoutStore } from '@/web/state-management';
import { Header } from './header/index';
import { Navigation } from './navigation';
import { Notification } from './notification';

const Layout = ({ children }: PropsWithChildren) => {
  const account = useAuthStore((s) => s.account);
  const { navigationHidden, navigationOpen, toolsHidden, toolsOpen, setState } =
    useLayoutStore((s) => ({
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
        headerSelector="#h"
        notifications={<Notification />}
        navigationWidth={250}
        navigationHide={account ? navigationHidden : true}
        navigationOpen={account ? navigationOpen : false}
        navigation={<Navigation />}
        toolsHide={account ? toolsHidden : true}
        toolsOpen={account ? toolsOpen : false}
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
