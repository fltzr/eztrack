import { useMemo } from 'react';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';
import type { TableProps } from '@cloudscape-design/components/table';
import { useLocalStorage } from '@/web/utils';
import type { TableColumnDefinition, TableColumnWidth } from '@/web/types';

type AddWidthToColumnDefinitionsParams<T> = {
  columnDefinitions: TableColumnDefinition<T>[];
  columnWidthsArray: TableColumnWidth[];
};

/**
 * Adds width to column definitions based on the provided column widths array.
 *
 * @template T - The type of data in the column definitions.
 * @param {AddWidthToColumnDefinitionsParams<T>} params - The parameters for adding width to column definitions.
 * @returns {TableColumnDefinition<T>[]} - The updated column definitions with width.
 */
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

/**
 * Maps column widths with column definition IDs.
 *
 * @template T - The type of the column definitions.
 * @param {MapWidthWithColumnDefinitionIdsParams<T>} params - The parameters for mapping column widths.
 * @returns {TableColumnWidth[]} - The array of column widths mapped with column definition IDs.
 */
export const mapWidthWithColumnDefinitionIds = <T>({
  columnDefinitions,
  widths,
}: MapWidthWithColumnDefinitionIdsParams<T>): TableColumnWidth[] =>
  columnDefinitions.map((column, index) => ({
    id: column.id,
    width: widths[index],
  }));

type UseColumnWidthsParams<T> = {
  localstorageKey: string;
  columnDefinitions: TableColumnDefinition<T>[];
};

/**
 * Custom hook for managing column widths in a table.
 *
 * @template T - The type of data in the table.
 * @param {UseColumnWidthsParams<T>} options - The options for the hook.
 * @param {string} options.localstorageKey - The key to use for storing the column widths in local storage.
 * @param {TableProps.ColumnDefinition[]} options.columnDefinitions - The definitions of the columns in the table.
 * @returns {[TableProps.ColumnDefinition[], (event: NonCancelableCustomEvent<TableProps.ColumnWidthsChangeDetail>) => void]} - An array containing the memoized column definitions and the event handler for width changes.
 */
export const useColumnWidths = <T>({
  localstorageKey,
  columnDefinitions,
}: UseColumnWidthsParams<T>) => {
  const [widths, saveWidths] = useLocalStorage<TableColumnWidth[]>({
    localstorageKey,
    initialValue: [] as TableColumnWidth[],
  });

  const handleWidthChange = (
    event: NonCancelableCustomEvent<TableProps.ColumnWidthsChangeDetail>,
  ) => {
    saveWidths(
      mapWidthWithColumnDefinitionIds({
        columnDefinitions,
        widths: event.detail.widths,
      }),
    );
  };

  const memoColumnDefinitions = useMemo(
    () =>
      addWidthToColumnDefinitions<T>({
        columnDefinitions,
        columnWidthsArray: widths,
      }),
    [columnDefinitions, widths],
  );

  return [memoColumnDefinitions, handleWidthChange] as const;
};
