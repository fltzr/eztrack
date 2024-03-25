import { RouteObject } from 'react-router-dom';

export const authenticationRoutes: RouteObject[] = [
  {
    path: 'signin',
    lazy: () => import('./pages/signin'),
  },
  {
    path: 'signup',
    lazy: () => import('./pages/signup'),
  },
];
