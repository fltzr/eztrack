import type { FormFieldProps } from '@cloudscape-design/components/form-field';
import type { Path } from 'react-hook-form';

export type FormBaseProps<T> = {
  name: Path<T>;
  testId?: string;
  label?: FormFieldProps['label'];
  description?: FormFieldProps['description'];
  info?: FormFieldProps['info'];
  constraintText?: FormFieldProps['constraintText'];
  i18nString?: FormFieldProps['i18nStrings'];
  stretch?: FormFieldProps['stretch'];
  control?: FormFieldProps['children'];
  secondaryControl?: FormFieldProps['secondaryControl'];
};
