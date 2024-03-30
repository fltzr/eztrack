import { RouteObject } from 'react-router-dom';

export const financesRoutes: RouteObject[] = [
  {
    path: '/finances',
    children: [
      {
        path: 'budget-items',
        children: [
          {
            index: true,
            lazy: () => import('./pages/budget-items'),
          },
          {
            path: 'create',
            lazy: () => import('./pages/create-budget-item'),
          },
        ],
      },
    ],
  },
];
