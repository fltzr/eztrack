/* eslint-disable @typescript-eslint/no-explicit-any */
import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../../../auth/hooks/use-auth';
import { useNotificationStore } from '@/web/state-management';
import { Component as SignInPage } from '.';

vi.mock('../../../../auth/hooks/use-auth');
vi.mock('@/web/state-management');

describe('SignInPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the sign-in form correctly', () => {
    vi.mocked(useAuth).mockReturnValue({
      signin: vi.fn(),
    } as any);

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole('heading', { name: 'Sign in' }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Signin' })).toBeInTheDocument();
  });

  it('calls the signin function on form submission', async () => {
    const signinMock = vi.fn().mockResolvedValue(null);
    vi.mocked(useAuth).mockReturnValue({
      signin: signinMock,
    } as any);

    const addNotificationMock = vi.fn();
    vi.mocked(useNotificationStore).mockReturnValue({
      addNotification: addNotificationMock,
    } as any);

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>,
    );

    userEvent.type(screen.getByLabelText('Username'), 'testuser');
    userEvent.type(screen.getByLabelText('Password'), 'testpassword');
    userEvent.click(screen.getByRole('button', { name: 'Signin' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Signin' })).toBeDisabled();
    });

    expect(signinMock).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'testpassword',
    });

    await waitFor(() => {
      expect(addNotificationMock).toHaveBeenCalledWith({
        type: 'success',
        id: expect.stringContaining('notification-signin-success'),
        header: 'Successfully signed in',
        dismissible: true,
        autoDismiss: true,
      });
    });
  });

  it('displays an error notification on signin failure', async () => {
    const signinMock = vi
      .fn()
      .mockRejectedValue({ message: 'Invalid credentials' });
    vi.mocked(useAuth).mockReturnValue({
      signin: signinMock,
    } as any);

    const addNotificationMock = vi.fn();
    vi.mocked(useNotificationStore).mockReturnValue({
      addNotification: addNotificationMock,
    } as any);

    render(
      <MemoryRouter>
        <SignInPage />
      </MemoryRouter>,
    );

    userEvent.type(screen.getByLabelText('Username'), 'testuser');
    userEvent.type(screen.getByLabelText('Password'), 'wrongpassword');
    userEvent.click(screen.getByRole('button', { name: 'Signin' }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Signin' })).toBeDisabled();
    });

    expect(signinMock).toHaveBeenCalledWith({
      username: 'testuser',
      password: 'wrongpassword',
    });

    await waitFor(() => {
      expect(addNotificationMock).toHaveBeenCalledWith({
        type: 'error',
        id: expect.stringContaining('notification-signin-error'),
        header: 'Invalid credentials',
        dismissible: true,
      });
    });
  });
});
