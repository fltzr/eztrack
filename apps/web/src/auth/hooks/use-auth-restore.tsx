import { useAsync } from 'react-use';
import { useAuth } from './use-auth';

let hasinit = false;

export const useAuthRestore = () => {
  const { pageload } = useAuth();

  const result = useAsync(async () => {
    if (hasinit) {
      return;
    }

    await pageload().finally(() => {
      hasinit = true;
    });
  }, []);

  return result;
};
