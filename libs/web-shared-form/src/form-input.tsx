import { useState } from 'react';
import { useFormContext, Controller, type FieldValues } from 'react-hook-form';
import Checkbox from '@cloudscape-design/components/checkbox';
import FormField from '@cloudscape-design/components/form-field';
import Input, { type InputProps } from '@cloudscape-design/components/input';
import { FormBaseProps } from './form-base-props';
import { SpaceBetween } from '@cloudscape-design/components';

type FormInputProps<T extends FieldValues> = Omit<InputProps, 'onChange' | 'name' | 'value'> &
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
          errorText={errors[props.name]?.message as string | undefined}
          secondaryControl={props.secondaryControl}
        >
          {props.sensitive ?
            <SpaceBetween direction='vertical' size='m'>
              <Input
                {...field}
                {...props}
                autoComplete={isInputVisible ? 'off' : 'current-password'}
                data-testid={props.testId}
                type={isInputVisible ? 'text' : 'password'}
                onChange={(event) => {
                  field.onChange(event.detail.value);
                }}
              />
              <Checkbox checked={isInputVisible} onChange={() => setIsInputVisible(!isInputVisible)}>
                Show password?
              </Checkbox>
            </SpaceBetween>
          : <Input
              {...field}
              {...props}
              data-testid={props.testId}
              type={props.type}
              onChange={(event) => {
                field.onChange(event.detail.value);
              }}
            />
          }
        </FormField>
      )}
    />
  );
};
