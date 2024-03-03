import type { PropertyFilterQuery } from '@cloudscape-design/collection-hooks';

export type BudgetItem = {
  id: string;
  title: string;
  amount: number;
  category: string;
};

export type BudgetItemsResponse = {
  budgetItems: BudgetItem[];
  pagesCount: number;
  currentPageIndex: number;
  totalCount?: number;
};

export type UseBudgetItemsParams = {
  pagination: {
    currentPageIndex: number;
    pageSize: number;
  };
  sorting: {
    sortingColumn: string;
    sortingDescending: boolean;
  };
  filtering: {
    filteringTokens: PropertyFilterQuery;
    filteringOperator: string;
  };
};
