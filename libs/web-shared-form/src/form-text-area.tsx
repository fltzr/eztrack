import FormField from '@cloudscape-design/components/form-field';
import Textarea, {
  type TextareaProps,
} from '@cloudscape-design/components/textarea';
import { useFormContext, type FieldValues, Controller } from 'react-hook-form';

import { FormBaseProps } from './form-base-props';

type FormTextareaProps<T extends FieldValues> = Omit<
  TextareaProps,
  'onChange' | 'name' | 'value'
> &
  FormBaseProps<T>;

export const FormTextarea = <T extends FieldValues>({
  ...props
}: FormTextareaProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => (
        <FormField
          label={props.label}
          stretch={props.stretch}
          errorText={errors[props.name]?.message as string | undefined}
        >
          <Textarea
            {...field}
            {...props}
            onChange={(event) => {
              field.onChange(event.detail.value);
            }}
          />
        </FormField>
      )}
    />
  );
};
