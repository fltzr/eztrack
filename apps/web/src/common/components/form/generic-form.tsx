import type { PropsWithChildren } from 'react';
import { FormProvider, useForm, type FieldValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import Form, { type FormProps } from '@cloudscape-design/components/form';

type GenericFormProps<Schema> = {
  schema: z.ZodType<Schema>;
  formId?: string;
  onSubmit: (data: Schema) => void | Promise<void>;
} & FormProps &
  PropsWithChildren;

export const GenericForm = <Schema extends FieldValues>({
  schema,
  formId,
  onSubmit,
  children,
  ...formProps
}: GenericFormProps<Schema>) => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <Form {...formProps}>
        <form
          id={formId}
          onSubmit={(event) => {
            void methods.handleSubmit(onSubmit)(event);
          }}>
          {children}
        </form>
      </Form>
    </FormProvider>
  );
};
