import type { Path } from 'react-hook-form';
import type { FormFieldProps } from '@cloudscape-design/components/form-field';

export type FormBaseProps<T> = {
  name: Path<T>;
  label?: FormFieldProps['label'];
  description?: FormFieldProps['description'];
  info?: FormFieldProps['info'];
  constraintText?: FormFieldProps['constraintText'];
  i18nString?: FormFieldProps['i18nStrings'];
  stretch?: FormFieldProps['stretch'];
};
