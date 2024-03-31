import { Account } from '@/web/types';

export type AuthApiResponse =
  | {
      authenticated: true;
      user: Partial<Account>;
    }
  | {
      authenticated: false;
      user: null;
      message?: string;
    };
