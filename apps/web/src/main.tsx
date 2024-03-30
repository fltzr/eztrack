import { StrictMode, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Loader } from '@/web/ui';
import { AuthWrapper } from '@/web/auth';
import { router } from './common/router/routes';
import { Providers } from './app/providers';

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
