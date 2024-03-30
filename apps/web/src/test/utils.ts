import { cleanup, render } from '@testing-library/react';
import type { ReactElement } from 'react';

afterEach(() => {
  cleanup();
});

type CustomRenderParams = {
  ui: ReactElement;
  options?: Record<string, unknown>;
};

const customRender = ({ ui, options }: CustomRenderParams) =>
  render(ui, {
    wrapper: ({ children }) => children,
    ...options,
  });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
export { customRender as render };
