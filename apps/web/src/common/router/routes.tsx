import { type RouteObject, createBrowserRouter } from 'react-router-dom';
import { App } from '../../app';
import { authRoutes, ProtectedRoute, UnprotectedRoute } from '@/web/auth';
import { RouteError } from '@/web/ui';
import { courtreserveRoutes } from '@/web/courtreserve';

const routes: RouteObject[] = [
  {
    element: <App />,
    errorElement: <RouteError />,
    children: [
      {
        element: <ProtectedRoute />,
        errorElement: <RouteError />,
        children: [
          {
            index: true,
            path: '/home',
            lazy: () => import('../../features/home'),
          },
          ...courtreserveRoutes,
          {
            path: '/finances',
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
        element: <UnprotectedRoute />,
        children: [
          {
            path: '/',
            lazy: () => import('../../features/splash'),
            // element: <Navigate replace to='/home' />,
          },
          ...authRoutes,
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
