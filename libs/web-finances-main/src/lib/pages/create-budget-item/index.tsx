import Button from '@cloudscape-design/components/button';
import Container from '@cloudscape-design/components/container';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { GenericForm, FormInput, FormAutosuggest } from '@/web/form';
import { useNotificationStore } from '@/web/state-management';

import { useCreateBudgetItemMutation } from '../budget-items/hooks';

const budgetItemSchema = z.object({
  title: z.string(),
  amount: z.string().refine((val) => !isNaN(parseFloat(val)), {
    message: 'Amount must be a valid number',
  }), // Validates as number, without transforming
  category: z.string(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Date must be a valid date',
  }), // Validates as date, without transforming
  description: z.string(),
});

export type BudgetItemSchema = z.infer<typeof budgetItemSchema>;

const CreateBudgetItemModal = () => {
  const navigate = useNavigate();
  const addNotification = useNotificationStore((s) => s.addNotification);

  const [formKey, setFormKey] = useState(0);

  const createBudgetItemMutation = useCreateBudgetItemMutation();

  const resetForm = () => {
    setFormKey((prev) => prev + 1);
  };

  const handleCreateConfirm = useCallback(
    (data: BudgetItemSchema) => {
      createBudgetItemMutation.mutate(data, {
        onSuccess: () => {
          addNotification({
            type: 'success',
            id: 'notification-budget-item-created-successfully',
            header: 'Budget item created successfully',
            dismissible: true,
          });

          navigate(-1);
        },

        onError: (error) => {
          addNotification({
            type: 'error',
            id: 'notification-budget-item-created-error',
            header: 'Error creating budget item',
            content: error.message,
            dismissible: true,
          });
        },
      });
    },
    [createBudgetItemMutation, addNotification, navigate],
  );

  const handleOnDismiss = () => {
    resetForm();
    navigate(-1);
  };

  return (
    <GenericForm
      key={formKey}
      schema={budgetItemSchema}
      formId='create-budget-item-form'
      actions={
        <SpaceBetween direction='horizontal' size='xs'>
          <Button variant='normal' onClick={handleOnDismiss}>
            Cancel
          </Button>
          <Button form='create-budget-item-form' formAction='submit' variant='primary'>
            Create
          </Button>
        </SpaceBetween>
      }
      onSubmit={handleCreateConfirm}
    >
      <Container>
        <SpaceBetween direction='vertical' size='m'>
          <FormInput<BudgetItemSchema>
            name='title'
            label='Name'
            placeholder='Enter the name of the budget item'
          />
          <FormInput<BudgetItemSchema>
            type='number'
            inputMode='numeric'
            label='Amount'
            name='amount'
            placeholder='Enter the amount of the budget item'
          />
          <FormAutosuggest<BudgetItemSchema>
            name='category'
            label='Category'
            placeholder='Enter the category of the budget item'
            endpoint='/finances/categories'
          />
          <FormInput<BudgetItemSchema>
            label='Date'
            name='date'
            placeholder='Enter the date of the budget item'
          />
          <FormInput<BudgetItemSchema>
            label='Description'
            name='description'
            placeholder='Enter the description of the budget item'
          />
        </SpaceBetween>
      </Container>
    </GenericForm>
  );
};

export const Component = CreateBudgetItemModal;
