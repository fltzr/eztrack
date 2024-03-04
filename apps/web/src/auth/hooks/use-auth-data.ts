import { useCallback } from 'react';
import { Account } from '../../common/types/user';
import { useAuthStore } from '../auth-store';

export const useAuthData = () => {
  const authenticated = Boolean(useAuthStore((s) => s.account));
  const account = useAuthStore((s) => s.account);
  const setAccount = useAuthStore((s) => s.setAccount);
  const removeAccount = useAuthStore((s) => s.removeAccount);

  const signin = useCallback(
    (userInfo: Account | null) => {
      setAccount(userInfo);

      return account;
    },
    [account, setAccount],
  );

  const signout = useCallback(() => {
    removeAccount();
  }, [removeAccount]);

  return {
    authenticated,
    account,
    signin,
    signout,
  };
};
