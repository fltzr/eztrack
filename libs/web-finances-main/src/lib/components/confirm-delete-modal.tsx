import Box from '@cloudscape-design/components/box';
import Button from '@cloudscape-design/components/button';
import Header from '@cloudscape-design/components/header';
import Modal from '@cloudscape-design/components/modal';
import SpaceBetween from '@cloudscape-design/components/space-between';
import { useState } from 'react';
import { z } from 'zod';

import { GenericForm, FormInput } from '@/web/form';

const DELETE_CONSENT_TEXT = 'confirm';

const confirmDeleteSchema = z.object({
  confirmDelete: z.string().refine((value) => value === DELETE_CONSENT_TEXT, {
    message: 'Please type "confirm" to delete',
  }),
});

type ConfirmDeleteSchema = z.infer<typeof confirmDeleteSchema>;

type ConfirmDeleteModalProps<T> = {
  resources: T[];
  visible: boolean;
  onDismiss: () => void;
  onConfirmDelete: () => void;
};

export const ConfirmDeleteModal = <T,>({
  resources,
  visible,
  onDismiss,
  onConfirmDelete,
}: ConfirmDeleteModalProps<T>) => {
  const [formKey, setFormKey] = useState(0);

  const resetForm = () => {
    setFormKey((prev) => prev + 1);
  };

  const handleConfirmDelete = (data: ConfirmDeleteSchema) => {
    if (data.confirmDelete !== DELETE_CONSENT_TEXT) {
      return;
    }

    onConfirmDelete();
    resetForm();
  };

  const handleOnDismiss = () => {
    onDismiss();
    resetForm();
  };

  return (
    <Modal
      size='medium'
      visible={visible}
      header={<Header variant='h2'>Theme Settings</Header>}
      footer={
        <Box float='right'>
          <SpaceBetween size='m' direction='horizontal'>
            <Button variant='normal' onClick={handleOnDismiss}>
              Cancel
            </Button>
            <Button variant='primary' form='confirm-delete-budget-item' formAction='submit'>
              Delete
            </Button>
          </SpaceBetween>
        </Box>
      }
      onDismiss={onDismiss}
    >
      <Box margin={{ bottom: 'l' }}>
        <SpaceBetween direction='vertical' size='xl'>
          <GenericForm
            key={formKey}
            formId='confirm-delete-budget-item'
            schema={confirmDeleteSchema}
            onSubmit={handleConfirmDelete}
          >
            <FormInput<ConfirmDeleteSchema>
              name='confirmDelete'
              label={`Type "confirm" to delete the following ${resources.length} resource(s)`}
            />
          </GenericForm>
        </SpaceBetween>
      </Box>
    </Modal>
  );
};
