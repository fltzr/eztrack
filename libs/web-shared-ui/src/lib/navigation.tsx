import { useNavigate } from 'react-router-dom';
import SideNavigation from '@cloudscape-design/components/side-navigation';
import { useLayoutStore } from '@/web/state-management';

export const Navigation = () => {
  const navigate = useNavigate();
  const { activeHref } = useLayoutStore((state) => ({
    activeHref: state.activeHref,
  }));
  const { title } = useLayoutStore((state) => ({ title: state.domainTitle }));

  return (
    <SideNavigation
      activeHref={activeHref}
      header={title ? { href: '/', text: title } : undefined}
      items={[
        {
          type: 'section-group',
          title: 'Courtreserve',
          items: [
            {
              type: 'link',
              text: 'Events',
              href: '/courtreserve',
            },
          ],
        },
        {
          type: 'section-group',
          title: 'Finances',
          items: [
            {
              type: 'link',
              text: 'Budget',
              href: '/finances/budget-items',
            },
          ],
        },
      ]}
      onFollow={(event) => {
        if (event.detail.external) {
          return;
        }

        event.preventDefault();
        navigate(event.detail.href, { replace: true });
      }}
    />
  );
};
