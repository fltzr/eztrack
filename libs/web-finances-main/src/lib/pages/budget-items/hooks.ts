import { useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/web/utils';

import type { BudgetItem, BudgetItemsResponse } from '../../types';

import type { BudgetItemSchema } from '../create-budget-item';

export const BUDGET_ITEMS_QUERY_KEY = 'budget-items';
export const BUDGET_ITEMS_API_URL = '/finances/budget-items';

export const useFetchBudgetItemsQuery = () =>
  useQuery({
    queryKey: ['budget-items'],
    queryFn: async () => {
      const response = await api.get<BudgetItemsResponse>(BUDGET_ITEMS_API_URL);

      return response.data;
    },
    initialData: {
      budgetItems: [{}],
      pagesCount: 0,
      currentPageIndex: 0,
      totalCount: 0,
    } as BudgetItemsResponse,
    retry: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

export const useCreateBudgetItemMutation = () =>
  useMutation({
    mutationFn: async (budgetItem: BudgetItemSchema) => {
      const response = await api.post(BUDGET_ITEMS_API_URL, budgetItem);

      return response.status;
    },
    retry: false,
  });

export const useUpdateBudgetItemMutation = () =>
  useMutation({
    mutationFn: async (budgetItem: BudgetItem) => {
      const response = await api.put(
        `${BUDGET_ITEMS_API_URL}/${budgetItem.id}`,
        budgetItem,
      );

      return response.status;
    },
    retry: false,
  });

export const useDeleteBudgetItemsMutation = () =>
  useMutation({
    mutationFn: async (ids: string[]) => {
      const response = await api.patch(BUDGET_ITEMS_API_URL, { data: ids });

      return response.status;
    },
    retry: false,
  });
