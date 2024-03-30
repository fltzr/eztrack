import {
  PropertyFilterProperty,
  useCollection,
} from '@cloudscape-design/collection-hooks';
import type { CollectionPreferencesProps } from '@cloudscape-design/components/collection-preferences';
import type { TableProps } from '@cloudscape-design/components/table';

import { TableColumnDefinition } from '@/web/types';
import { useLocalStorage } from '@/web/utils';

import {
  DateTimeForm,
  formatDateTime,
} from '../components/table-date-time-form';
import { TableEmptyState, TableNoMatchState } from '../components/table-states';

import { useColumnWidths } from './use-column-widths';


const createDefaultPreferences = <T,>(
  columnDefinitions: TableColumnDefinition<T>[],
): CollectionPreferencesProps.Preferences => ({
  pageSize: 10,
  contentDisplay: columnDefinitions.map((columnDefinition) => ({
    id: columnDefinition.id,
    visible: columnDefinition.isVisible ?? true,
  })),
  wrapLines: false,
  stripedRows: false,
  contentDensity: 'comfortable',
  stickyColumns: { first: 0, last: 1 },
});

const createFilteringProperties = <T,>(
  columnDefinitions: TableColumnDefinition<T>[],
): PropertyFilterProperty[] =>
  columnDefinitions.map((columnDefinition) => ({
    key: columnDefinition.id,
    propertyLabel: columnDefinition.header?.toString() ?? '',
    groupValuesLabel: `${columnDefinition.header?.toString() ?? ''} values`,
    operators: columnDefinition.isDateTime
      ? ['<', '<=', '>', '>='].map((operator) => ({
          operator,
          form: DateTimeForm,
          format: formatDateTime,
          match: 'datetime',
        }))
      : [':', '!:', '=', '!=', '^'],
  }));

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
