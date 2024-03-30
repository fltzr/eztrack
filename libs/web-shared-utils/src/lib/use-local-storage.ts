import { useState } from 'react';
import { load, save } from './local-storage';

type UseLocalStorageProps<T> = {
  localstorageKey: string;
  initialValue: T;
};

export const useLocalStorage = <T>({
  localstorageKey,
  initialValue,
}: UseLocalStorageProps<T>) => {
  const [value, setValue] = useState<T>(
    () => load(localstorageKey) ?? initialValue,
  );

  const handleValueChange = (newValue: T) => {
    setValue(newValue);
    save(localstorageKey, newValue);
  };

  return [value, handleValueChange] as const;
};
