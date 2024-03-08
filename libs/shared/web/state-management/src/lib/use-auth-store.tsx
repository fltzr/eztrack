import { create } from 'zustand';
import { Account } from '@/web/types';

type AuthState = {
  account: null | Account;
};

type AuthActions = {
  setAccount: (account: Account | null) => void;
  updateAccount: (account: Account) => void;
  removeAccount: () => void;
};

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  account: null,
  setAccount: (account) => {
    set({ account });
  },
  updateAccount: (account) => {
    set((state) => {
      if (state.account) {
        state.account = account;
      }

      return {};
    });
  },
  removeAccount: () => {
    set({ account: null });
  },
}));
