import type { TableColumnDefinition } from '@/web/types';

import type { BudgetItem } from '../../types';

export const budgetItemColumnDefinitions: TableColumnDefinition<
  BudgetItem & { id: string }
>[] = [
  {
    id: 'id',
    sortingField: 'id',
    header: 'ID',
    cell: (item) => item.id,
    width: 260,
  },
  {
    id: 'title',
    sortingField: 'title',
    header: 'Title',
    cell: (item) => item.title,
    width: 120,
  },
  {
    id: 'amount',
    sortingField: 'amount',
    header: 'Amount',
    cell: (item) => item.amount,
    width: 120,
  },
  {
    id: 'category',
    sortingField: 'category',
    header: 'Category',
    cell: (item) => item.category,
    width: 120,
  },
];
