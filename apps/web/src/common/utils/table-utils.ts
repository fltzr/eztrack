import type { PropertyFilterProperty } from '@cloudscape-design/collection-hooks';
import type { CollectionPreferencesProps } from '@cloudscape-design/components';
import { capitalize, isEmpty } from 'lodash-es';
import type { TableProps } from '@cloudscape-design/components/table';
import {
  DateTimeForm,
  formatDateTime,
} from '../components/table/common/table-date-time-form/index';

export type TableColumnWidth = { id: string; width: number };
export type TableColumnDefinition<T> = Omit<
  TableProps.ColumnDefinition<T>,
  'id' | 'width'
> &
  TableColumnWidth & {
    isVisible?: boolean;
    isDateOnly?: boolean;
    isDateTime?: boolean;
  };

type AddWidthToColumnDefinitionsParams<T> = {
  columnDefinitions: TableColumnDefinition<T>[];
  columnWidthsArray: TableColumnWidth[];
};

export const addWidthToColumnDefinitions = <T>({
  columnDefinitions,
  columnWidthsArray,
}: AddWidthToColumnDefinitionsParams<T>): TableColumnDefinition<T>[] =>
  columnDefinitions.map((columnDefinition) => {
    const column = columnWidthsArray.find(
      (col) => col.id === columnDefinition.id,
    );

    return {
      ...columnDefinition,
      width: column?.width ?? columnDefinition.width,
    };
  });

type MapWidthWithColumnDefinitionIdsParams<T> = {
  columnDefinitions: TableColumnDefinition<T>[];
  widths: readonly number[];
};

export const mapWidthWithColumnDefinitionIds = <T>({
  columnDefinitions,
  widths,
}: MapWidthWithColumnDefinitionIdsParams<T>): TableColumnWidth[] =>
  columnDefinitions.map((column, index) => ({
    id: column.id,
    width: widths[index],
  }));

export const getTextFilterCounterText = ({ count }: { count?: number }) =>
  `${count ?? 0} ${count === 1 ? 'match' : 'matches'}`;

type GetHeaderCounterTextParams = {
  items: readonly unknown[];
  selectedItems?: readonly unknown[];
  totalItems: number;
};
export const getHeaderCounterText = ({
  selectedItems,
  totalItems,
}: GetHeaderCounterTextParams) =>
  selectedItems && !isEmpty(selectedItems)
    ? `(${selectedItems.length}/${totalItems})`
    : `(${totalItems})`;

export const createPageSizeOptions = (resource: string) => [
  { value: 10, label: `10 ${capitalize(resource)}s` },
  { value: 15, label: `15 ${capitalize(resource)}s` },
  { value: 20, label: `20 ${capitalize(resource)}s` },
];

export const createFilteringProperties = <T>(
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

export const createContentDisplayOptions = (
  columnDefinitions: TableColumnDefinition<unknown>[],
): CollectionPreferencesProps.ContentDisplayOption[] =>
  columnDefinitions.map((columnDefinition) => ({
    id: columnDefinition.id,
    label: columnDefinition.header?.toString() ?? '',
    alwaysVisible: columnDefinition.id === 'id',
  }));

export const createDefaultPreferences = <T>(
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
