import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { AuthWrapper } from '@/web/auth';
import { Loader } from '@/web/ui';

import { Providers } from './app/providers';
import { router } from './common/router/routes';

import '@cloudscape-design/global-styles/index.css';
import './index.css';
import './normalize.scss';

const container: HTMLElement | null = document.querySelector('#c');

if (container) {
  createRoot(container).render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <AuthWrapper>
          <Providers>
            <RouterProvider router={router} fallbackElement={<Loader />} />
          </Providers>
        </AuthWrapper>
      </Suspense>
    </StrictMode>,
  );
}
