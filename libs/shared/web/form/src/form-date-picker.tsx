import { useFormContext, Controller, type FieldValues } from 'react-hook-form';
import DatePicker, {
  type DatePickerProps,
} from '@cloudscape-design/components/date-picker';
import FormField from '@cloudscape-design/components/form-field';
import { FormBaseProps } from './form-base-props';

type FormDatePickerProps<T extends FieldValues> = Omit<
  DatePickerProps,
  'onChange' | 'name' | 'value'
> &
  FormBaseProps<T>;

export const FormDatePicker = <T extends FieldValues>({
  ...props
}: FormDatePickerProps<T>) => {
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
          errorText={errors[props.name]?.message as string | undefined}
        >
          <DatePicker
            {...field}
            {...props}
            value={field.value}
            onChange={(event) => {
              field.onChange(event.detail.value);
            }}
          />
        </FormField>
      )}
    />
  );
};
