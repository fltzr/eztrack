import { api } from '@/web/utils';

export type Suggestion = {
  label: string;
  value: string;
};

export type FetchSuggestionsResponse = {
  results: Suggestion[];
  nextCursor: string;
};

type FetchSuggestionsProps = {
  endpoint: string;
  search?: string;
  cursor?: string;
};

export const fetchSuggestions = async ({
  endpoint,
  search,
  cursor,
}: FetchSuggestionsProps) => {
  const response = await api.get<FetchSuggestionsResponse>(endpoint, {
    params: {
      search,
      cursor,
    },
  });

  return response.data;
};
