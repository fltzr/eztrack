import { useFormContext, Controller, type FieldValues } from 'react-hook-form';
import FormField from '@cloudscape-design/components/form-field';
import Tiles, { type TilesProps } from '@cloudscape-design/components/tiles';
import { FormBaseProps } from './form-base-props';

type FormTilesProps<T extends FieldValues> = Omit<
  TilesProps,
  'onChange' | 'name' | 'value'
> &
  FormBaseProps<T>;

export const FormTiles = <T extends FieldValues>({
  ...props
}: FormTilesProps<T>) => {
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
          <Tiles
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
