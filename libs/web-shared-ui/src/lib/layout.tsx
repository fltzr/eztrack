import AppLayout from '@cloudscape-design/components/app-layout';
import type { PropsWithChildren } from 'react';

import { useLayoutStore } from '@/web/state-management';
import { Account } from '@/web/types';

import { Header } from './header/index';
import { Navigation } from './navigation';
import { Notification } from './notification';

type LayoutProps = {
  user: Account | null;
  signoutFn: () => Promise<void>;
} & PropsWithChildren;

export const Layout = ({ user, signoutFn, children }: LayoutProps) => {
  const { navigationHidden, navigationOpen, toolsHidden, toolsOpen, setState } = useLayoutStore((s) => ({
    navigationHidden: s.navigationHidden,
    navigationOpen: s.navigationOpen,
    toolsHidden: s.toolsHidden,
    toolsOpen: s.toolsOpen,
    setState: s.setState,
  }));

  return (
    <>
      <Header user={user} signoutFn={signoutFn} />
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
