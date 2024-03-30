/* eslint-disable react/no-multi-comp */
import { useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import TopNavigation, { TopNavigationProps } from '@cloudscape-design/components/top-navigation';
import { useAuthStore } from '@/web/auth';
import { useNotificationStore } from '@/web/state-management';
import { UserPreferencesModal } from './preferences-modal/index';
import { api } from '@/web/utils';
import styles from './styles.module.css';

const HeaderPortal = ({ children }: PropsWithChildren) => {
  const dom = document.querySelector('#h');

  if (!dom) {
    return null;
  }

  return createPortal(children, dom);
};

export const Header = () => {
  const navigate = useNavigate();

  const authenticated = Boolean(useAuthStore((s) => s.user));
  const user = useAuthStore((s) => s.user);
  const signout = useAuthStore((s) => s.signout);

  const addNotification = useNotificationStore((state) => state.addNotification);

  const [userPreferencesModalOpen, setUserPreferencesModalOpen] = useState(false);

  const utilityItems: TopNavigationProps['utilities'] =
    authenticated ?
      [
        {
          type: 'button',
          iconName: 'settings',
          onClick: () => {
            setUserPreferencesModalOpen(!userPreferencesModalOpen);
          },
          ariaLabel: 'User preferences',
        },
        {
          type: 'menu-dropdown',
          text: `Hello, ${user?.firstName}!`,
          description: user?.email,
          items: [
            {
              text: 'Sign out',
              id: 'user-sign-out',
              externalIconAriaLabel: 'Sign out',
            },
          ],
          onItemClick: (event) => {
            if (event.detail.id !== 'user-sign-out') {
              console.log(event.detail.id);
            }
            (async () => {
              await signout();

              navigate('/signin', {
                replace: true,
              });

              addNotification({
                type: 'success',
                id: `notification-user-sign-out-${Date.now()}`,
                header: 'Successfully signed out.',
                autoDismiss: true,
              });
            })().catch((error) => {
              console.error(error);
            });
          },
        },
      ]
    : [
        {
          type: 'button',
          iconName: 'settings',
          onClick: () => {
            setUserPreferencesModalOpen(!userPreferencesModalOpen);
          },
          ariaLabel: 'User preferences',
        },
        {
          type: 'button',
          variant: 'primary-button',
          text: 'Sign in',
          ariaLabel: 'Sign in',
          badge: true,
          iconName: 'user-profile',
          onClick: (event) => {
            event.preventDefault();
            navigate('/signin');
          },
        },
      ];

  return (
    <>
      <HeaderPortal>
        <div className={styles.header}>
          <TopNavigation
            identity={{
              href: '/',
              logo: {
                src: '/eztrack.svg',
                alt: 'ez app',
              },
              title: 'ez',
              onFollow: (event) => {
                event.preventDefault();
                navigate('/');
              },
            }}
            utilities={utilityItems}
          />
        </div>
      </HeaderPortal>
      <UserPreferencesModal
        visible={userPreferencesModalOpen}
        onDismiss={() => {
          setUserPreferencesModalOpen(false);
        }}
      />
    </>
  );
};
