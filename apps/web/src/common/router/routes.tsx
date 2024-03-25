import { type RouteObject, createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from '../../app';
import { AuthenticatedRoute } from '../../auth/authenticated-route';
import { UnauthenticatedRoute } from '../../auth/unauthenticated-route';
import { RouteError } from '@/web/ui';
import { courtreserveRoutes } from '@/web/courtreserve/feature-main';
import { authenticationRoutes } from '@/auth-web-feature-main';

const routes: RouteObject[] = [
  {
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        path: '/',
        element: <Navigate replace to='/home' />,
      },
      {
        element: <AuthenticatedRoute />,
        errorElement: <RouteError />,
        children: [
          {
            index: true,
            path: 'home',
            lazy: () => import('../../features/home'),
          },
          ...courtreserveRoutes,
          {
            path: 'finances',
            children: [
              {
                path: 'budget-items',
                children: [
                  {
                    index: true,
                    lazy: () => import('../../features/finances/pages/budget-items'),
                  },
                  {
                    path: 'create',
                    lazy: () => import('../../features/finances/pages/create-budget-item'),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        element: <UnauthenticatedRoute />,
        children: [...authenticationRoutes],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
