import { useQuery } from '@tanstack/react-query';

import { api } from '@/web/utils';

import type { BudgetItemsResponse } from '../types';

export const BUDGET_ITEM_KEY = 'budget-item';

const fetchBudgetItems = async () => {
  const response = await api.get<BudgetItemsResponse>('/finances/budget-items');

  return response.data;
};

export const useFetchBudgetItemsQuery = () =>
  useQuery({
    queryKey: [`fetch-${BUDGET_ITEM_KEY}`],
    queryFn: () => fetchBudgetItems(),
    initialData: {
      budgetItems: [{}],
      pagesCount: 0,
      currentPageIndex: 0,
      totalCount: 0,
    } as BudgetItemsResponse,
  });
