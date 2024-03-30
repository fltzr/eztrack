import { type RouteObject, createBrowserRouter } from 'react-router-dom';
import { App } from '../../app';
import { authRoutes, ProtectedRoute, UnprotectedRoute } from '@/web/auth';
import { RouteError } from '@/web/ui';
import { courtreserveRoutes } from '@/web/courtreserve';
import { financesRoutes } from '@/web/finances-main';

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
          ...financesRoutes,
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
