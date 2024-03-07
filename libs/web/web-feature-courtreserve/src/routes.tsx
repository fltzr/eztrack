import { constant } from 'lodash-es';
import { RouteObject } from 'react-router-dom';

export const courtreserveRoutes: RouteObject[] = [
  {
    path: '/courtreserve',
    lazy: () => import('./pages/events'),
    handle: {
      crumb: constant('Courtreserve'),
    },
  },
];
