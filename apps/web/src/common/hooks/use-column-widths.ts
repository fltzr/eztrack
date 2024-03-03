import { useMemo } from 'react';
import type { NonCancelableCustomEvent } from '@cloudscape-design/components';
import type { TableProps } from '@cloudscape-design/components/table';
import {
  type TableColumnWidth,
  type TableColumnDefinition,
  mapWidthWithColumnDefinitionIds,
  addWidthToColumnDefinitions,
} from '../utils/table-utils';
import { useLocalStorage } from './use-local-storage';

type UseColumnWidthsParams<T> = {
  localstorageKey: string;
  columnDefinitions: TableColumnDefinition<T>[];
};

export const useColumnWidths = <T>({
  localstorageKey,
  columnDefinitions,
}: UseColumnWidthsParams<T>) => {
  const [widths, saveWidths] = useLocalStorage<TableColumnWidth[]>({
    localstorageKey,
    initialValue: [] as TableColumnWidth[],
  });

  const handleWidthChange = (
    event: NonCancelableCustomEvent<TableProps.ColumnWidthsChangeDetail>
  ) => {
    saveWidths(
      mapWidthWithColumnDefinitionIds({
        columnDefinitions,
        widths: event.detail.widths,
      })
    );
  };

  const memoColumnDefinitions = useMemo(
    () =>
      addWidthToColumnDefinitions<T>({
        columnDefinitions,
        columnWidthsArray: widths,
      }),
    [columnDefinitions, widths]
  );

  return [memoColumnDefinitions, handleWidthChange] as const;
};
