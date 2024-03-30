import Autosuggest, {
  type AutosuggestProps,
} from '@cloudscape-design/components/autosuggest';
import FormField from '@cloudscape-design/components/form-field';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import {
  Controller,
  useFormContext,
  type FieldValues,
  type Path,
} from 'react-hook-form';
import { useDebounce } from 'react-use';

import { FormBaseProps } from '../form-base-props';

import {
  fetchSuggestions,
  type FetchSuggestionsResponse,
} from './autosuggestions';

/**
 * Type definition for props accepted by the FormAutosuggest component.
 */
type FormAutosuggestProps<T extends FieldValues> = Omit<
  AutosuggestProps,
  'onChange' | 'name' | 'value'
> &
  FormBaseProps<T> & {
    /**
     * The endpoint to fetch suggestions from.
     */
    endpoint: string;
  };

const useFetchSuggestions = <T extends FieldValues>(
  endpoint: string,
  name: Path<T>,
  debouncedSearch: string,
) =>
  useInfiniteQuery<FetchSuggestionsResponse>({
    /**
     * The query key is an array of values that uniquely identify this query.
     */
    queryKey: ['fetchSuggestions', endpoint, name, debouncedSearch],
    queryFn: ({ pageParam = '' }) =>
      fetchSuggestions({
        endpoint,
        search: debouncedSearch,
        cursor: pageParam as string | undefined,
      }),
    initialPageParam: '0',
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

export const FormAutosuggest = <T extends FieldValues>({
  endpoint,
  ...props
}: FormAutosuggestProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  // Local state for handling user input and its debounced value.
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce the search input to avoid making too many requests.
  useDebounce(
    () => {
      setDebouncedSearch(search);
    },
    500,
    [search],
  );

  const { data, fetchNextPage, hasNextPage, isError, isPending, isFetching } =
    useFetchSuggestions(endpoint, props.name, debouncedSearch);

  // Transform the result from all pages into a single array of options.
  const options = useMemo(
    () =>
      data?.pages.flatMap((page) =>
        page.results.map((s) => ({
          label: s.label,
          value: s.value,
        })),
      ) ?? [],
    [data?.pages],
  );

  // Determine the status type of the autosuggest component. This is used
  // by Autosuggest to trigger the next query.
  const getStatusType = useCallback(() => {
    if (isFetching) {
      return 'loading';
    }

    if (isPending) {
      return 'pending';
    }

    if (isError) {
      return 'error';
    }

    return 'finished';
  }, [isError, isFetching, isPending]);

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => (
        <FormField
          label={props.label}
          errorText={errors[props.name]?.message as string | undefined}
        >
          <Autosuggest
            {...field}
            {...props}
            disableBrowserAutocorrect
            filteringType="manual"
            options={options}
            loadingText={`Loading ${props.label?.toString().toLowerCase()}...`}
            finishedText={
              search ? `End of "${search}" results` : 'End of all results'
            }
            empty="No results"
            statusType={getStatusType()}
            onLoadItems={() => {
              hasNextPage && !isPending && fetchNextPage().catch(console.error);
            }}
            onChange={(event) => {
              field.onChange(event.detail.value);
              setSearch(event.detail.value);
            }}
          />
        </FormField>
      )}
    />
  );
};
