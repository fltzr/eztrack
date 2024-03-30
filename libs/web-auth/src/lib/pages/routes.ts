import { RouteObject } from 'react-router-dom';

export const authRoutes: RouteObject[] = [
  {
    path: '/signin',
    lazy: () => import('./signin'),
  },
  {
    path: '/signup',
    lazy: () => import('./signup'),
  },
  {
    path: '/forgot',
    // lazy: () => import('./forgot-password'),
  },
  {
    path: '/reset-password',
    // lazy: () => import('./reset-password'),
  },
];
