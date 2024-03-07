/* eslint-disable react/no-multi-comp */
import { useState, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import TopNavigation from '@cloudscape-design/components/top-navigation';
import {
  useAuthStore,
  useNotificationStore,
} from 'libs/web/web-shared-state-management/src';
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

  const authenticated = Boolean(useAuthStore((s) => s.account));
  const user = useAuthStore((s) => s.account);
  const setUser = useAuthStore((s) => s.setAccount);

  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  const [userPreferencesModalOpen, setUserPreferencesModalOpen] =
    useState(false);

  return (
    <>
      <HeaderPortal>
        <div className={styles.header}>
          <TopNavigation
            identity={{
              title: 'ez app',
              href: '/',
              onFollow: (event) => {
                event.preventDefault();
                navigate('/');
              },
            }}
            utilities={
              authenticated
                ? [
                    {
                      type: 'button',
                      iconName: 'settings',
                      onClick: () => {
                        setUserPreferencesModalOpen(!userPreferencesModalOpen);
                      },
                    },
                    {
                      type: 'menu-dropdown',
                      text: `Hello, ${user?.firstName}!`,

                      description: user?.email,
                      items: [
                        {
                          text: 'Sign out',
                          id: 'user-sign-out',
                        },
                      ],
                      onItemClick: (event) => {
                        if (event.detail.id !== 'user-sign-out') {
                          console.log(event.detail.id);
                        }
                        (async () => {
                          const { status } = await api.post('/signout');

                          if (status === 200) {
                            setUser(null);

                            navigate('/signin', {
                              replace: true,
                            });

                            addNotification({
                              type: 'success',
                              id: `notification-user-sign-out-${Date.now()}`,
                              header: 'Successfully signed out.',
                              autoDismiss: true,
                            });
                          } else {
                            addNotification({
                              type: 'error',
                              id: `notification-user-sign-out-error-${Date.now()}`,
                              header: 'Unable to signout. Please try again.',
                              dismissible: true,
                            });
                          }
                        })().catch((error) => {
                          console.error(error);
                        });
                      },
                    },
                  ]
                : undefined
            }
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
