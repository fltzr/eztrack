export const save = <T>(key: string, value: T): void => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const remove = (key: string): void => {
  localStorage.removeItem(key);
};

export const load = <T>(key: string): T | null => {
  const value = localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return JSON.parse(value) as T;
};
