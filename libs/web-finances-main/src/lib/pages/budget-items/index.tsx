import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useNotificationStore } from '@/web/state-management';

import { ConfirmDeleteModal } from '../../components/confirm-delete-modal';
import { BudgetItemsTable } from '../../components/table';
import type { BudgetItem } from '../../types';

import {
  BUDGET_ITEMS_QUERY_KEY,
  useFetchBudgetItemsQuery,
  useUpdateBudgetItemMutation,
  useDeleteBudgetItemsMutation,
} from './hooks';

const BudgetItems = () => {
  const navigate = useNavigate();
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState<BudgetItem[]>([]);

  const queryClient = useQueryClient();

  const fetchBudgetItemsQuery = useFetchBudgetItemsQuery();
  const updateBudgetItemMutation = useUpdateBudgetItemMutation();
  const deleteBudgetItemsMutation = useDeleteBudgetItemsMutation();

  const addNotification = useNotificationStore((s) => s.addNotification);

  const invalidateQueries = useCallback(() => {
    queryClient
      .invalidateQueries({ queryKey: [BUDGET_ITEMS_QUERY_KEY] })
      .catch((error) => {
        console.error(error);
      });
  }, [queryClient]);

  const handleRefreshClick = useCallback(() => {
    fetchBudgetItemsQuery.refetch().catch((error) => {
      console.error(error);
    });
  }, [fetchBudgetItemsQuery]);

  const handleSubmitEdit = useCallback(
    (budgetItem: BudgetItem) => {
      updateBudgetItemMutation.mutate(budgetItem, {
        onSuccess: () => {
          addNotification({
            type: 'success',
            id: 'notification-budget-item-updated-successfully',
            header: 'Budget item updated successfully',
            dismissible: true,
          });

          invalidateQueries();
        },

        onError: (error) => {
          addNotification({
            type: 'error',
            id: 'notification-budget-item-updated-error',
            header: 'Error updating budget item',
            content: error.message,
            dismissible: true,
          });
        },
      });
    },
    [updateBudgetItemMutation, addNotification, invalidateQueries],
  );

  const handleCreateInit = useCallback(() => {
    navigate('create', { relative: 'path' });
  }, [navigate]);

  const handleDeleteInit = useCallback(() => {
    setShowConfirmDeleteModal(true);
  }, []);

  const handleDeleteCancel = useCallback(() => {
    setShowConfirmDeleteModal(false);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    const selectedIds = selectedItems.map((item) => item.id);

    deleteBudgetItemsMutation.mutate(selectedIds, {
      onSuccess: () => {
        addNotification({
          type: 'success',
          id: 'notification-budget-items-deleted-successfully',
          header: 'Budget items deleted successfully',
          dismissible: true,
          autoDismiss: true,
        });

        setShowConfirmDeleteModal(false);
        invalidateQueries();
      },

      onError: (error) => {
        addNotification({
          type: 'error',
          id: 'notification-budget-items-deleted-error',
          header: 'Error deleting budget items',
          content: error.message,
          dismissible: true,
        });
      },

      onSettled: () => {
        setSelectedItems([]);
      },
    });
  }, [
    addNotification,
    deleteBudgetItemsMutation,
    invalidateQueries,
    selectedItems,
  ]);

  return (
    <>
      <SpaceBetween direction="vertical" size="m">
        <BudgetItemsTable
          budgetItems={fetchBudgetItemsQuery.data.budgetItems}
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          loading={
            fetchBudgetItemsQuery.isFetching ||
            fetchBudgetItemsQuery.isRefetching
          }
          onRefreshClick={handleRefreshClick}
          onCreateClick={handleCreateInit}
          onSubmitEdit={handleSubmitEdit}
          onDeleteClick={handleDeleteInit}
        />
        <SpaceBetween direction="horizontal" size="s">
          <Container header="Total">
            {/* Get the toal money from budget items */}
            {fetchBudgetItemsQuery.data.budgetItems.reduce(
              (acc, item) => acc + (item.amount + 0),
              0,
            )}
          </Container>
          <Container header="Total">
            {/* Get the toal money from budget items */}
            {fetchBudgetItemsQuery.data.budgetItems.reduce(
              (acc, item) => acc + (item.amount + 0),
              0,
            )}
          </Container>
        </SpaceBetween>
      </SpaceBetween>

      <ConfirmDeleteModal
        resources={selectedItems}
        visible={showConfirmDeleteModal}
        onDismiss={handleDeleteCancel}
        onConfirmDelete={handleDeleteConfirm}
      />
    </>
  );
};

export const Component = BudgetItems;
