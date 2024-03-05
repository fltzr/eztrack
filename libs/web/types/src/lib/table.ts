import type { TableProps } from '@cloudscape-design/components/table';

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
