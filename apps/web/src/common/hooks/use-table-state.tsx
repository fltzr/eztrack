import { useCollection } from '@cloudscape-design/collection-hooks';
import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import type { TableProps } from '@cloudscape-design/components/table';
import { TableEmptyState, TableNoMatchState } from '../components/table/common/table-states';
import { createDefaultPreferences, createFilteringProperties, TableColumnDefinition } from '../utils/table-utils';
import { useColumnWidths } from './use-column-widths';
import { useLocalStorage } from './use-local-storage';

type UseTableStateProps<T> = Pick<
  TableProps,
  'variant' | 'stickyHeader' | 'selectionType'
> & {
  localstorageKeyPrefix: string;
  resource: string;
  columnDefinitions: TableColumnDefinition<T>[];
  items: T[];
  loading?: boolean;
  loadingText?: string;
  disableFilter?: boolean;
  onInfoClick?: () => void;
  onViewClick?: (id: string) => void;
  onEditClick?: (id: string) => void;
  onDeleteClick?: (ids: string[]) => void;
  onCreateClick?: () => void;
};

export const useTableState = <T extends { id: string }>({
  localstorageKeyPrefix,
  resource,
  ...props
}: UseTableStateProps<T>) => {
  const tableWidthsStorageKey = `React-${localstorageKeyPrefix}-Table-Widths`;
  const tablePreferencesStorageKey = `React-${localstorageKeyPrefix}-Table-Preferences`;

  const [columnDefinitions, saveWidths] = useColumnWidths({
    localstorageKey: tableWidthsStorageKey,
    columnDefinitions: props.columnDefinitions,
  });

  const [preferences, setPreferences] =
    useLocalStorage<CollectionPreferencesProps.Preferences>({
      localstorageKey: tablePreferencesStorageKey,
      initialValue: createDefaultPreferences(columnDefinitions),
    });

  const filteringProperties = createFilteringProperties(columnDefinitions);

  const {
    items,
    actions,
    filteredItemsCount,
    collectionProps,
    propertyFilterProps,
    paginationProps,
  } = useCollection(props.items, {
    propertyFiltering: {
      filteringProperties,
      empty: <TableEmptyState resource={resource.toLowerCase()} />,
      noMatch: (
        <TableNoMatchState
          onClearFilter={() => {
            actions.setFiltering('');
          }}
        />
      ),
    },
    pagination: { pageSize: preferences.pageSize ?? 10 },
    sorting: { defaultState: { sortingColumn: columnDefinitions[0] } },
    selection: {},
  });

  return {
    items,
    columnDefinitions,
    preferences,
    setPreferences,
    saveWidths,
    actions,
    filteredItemsCount,
    collectionProps,
    propertyFilterProps,
    paginationProps,
  };
};
