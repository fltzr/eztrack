import { ReusableTable, type ReusableTableEventHandlers } from '@/web/ui';

import type { BudgetItem } from '../../types';

import { budgetItemColumnDefinitions } from './config';

type BudgetItemsTableProps = {
  loading: boolean;
  budgetItems: BudgetItem[];
  selectedItems: BudgetItem[];
} & ReusableTableEventHandlers<BudgetItem>;

export const BudgetItemsTable = ({
  loading,
  budgetItems,
  selectedItems,
  ...clickHandlers
}: BudgetItemsTableProps) => (
  <ReusableTable<BudgetItem>
    stickyHeader
    variant="stacked"
    localstorageKeyPrefix="Budget-Items"
    resource="Budget Item"
    columnDefinitions={budgetItemColumnDefinitions}
    items={budgetItems}
    selectedItems={selectedItems}
    loading={loading}
    loadingText="Loading resources..."
    selectionType="multi"
    {...clickHandlers}
  />
);
