import { useState } from 'react';
import { useFormContext, Controller, type FieldValues } from 'react-hook-form';
import Button from '@cloudscape-design/components/button';
import FormField from '@cloudscape-design/components/form-field';
import Grid from '@cloudscape-design/components/grid';
import Input, { type InputProps } from '@cloudscape-design/components/input';
import { FormBaseProps } from '../../types/form-base-props';

type FormInputProps<T extends FieldValues> = Omit<
  InputProps,
  'onChange' | 'name' | 'value'
> &
  FormBaseProps<T> & { sensitive?: boolean };

export const FormInput = <T extends FieldValues>({ ...props }: FormInputProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  const [isInputVisible, setIsInputVisible] = useState(false);

  return (
    <Controller
      name={props.name}
      control={control}
      render={({ field }) => (
        <FormField
          label={props.label}
          stretch={props.stretch}
          errorText={errors[props.name]?.message as string | undefined}>
          {props.sensitive ? (
            <Grid disableGutters gridDefinition={[{ colspan: 11 }, { colspan: 1 }]}>
              <Input
                {...field}
                {...props}
                type={isInputVisible ? 'text' : 'password'}
                onChange={(event) => {
                  field.onChange(event.detail.value);
                }}
              />
              <Button
                variant='icon'
                formAction='none'
                iconName={isInputVisible ? 'lock-private' : 'unlocked'}
                onClick={() => {
                  setIsInputVisible((prev) => !prev);
                }}
              />
            </Grid>
          ) : (
            <Input
              {...field}
              {...props}
              type={props.type}
              onChange={(event) => {
                field.onChange(event.detail.value);
              }}
            />
          )}
        </FormField>
      )}
    />
  );
};
