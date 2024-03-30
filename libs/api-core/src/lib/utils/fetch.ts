export const fetchWithTypes = async <T>(url: string, extra?: RequestInit) => {
  const response = await fetch(url, extra);
  const data: T = (await response.json()) as T;

  return data;
};
