import {
  useFormContext,
  Controller,
  type FieldValues,
  type Path,
  type PathValue,
} from 'react-hook-form';
import FileUpload, {
  type FileUploadProps,
} from '@cloudscape-design/components/file-upload';
import FormField from '@cloudscape-design/components/form-field';
import { FormBaseProps } from './form-base-props';

type FormFileUploadProps<T extends FieldValues> = Omit<
  FileUploadProps,
  'onChange' | 'name' | 'value' | 'i18nStrings'
> &
  FormBaseProps<T>;

export const FormFileUpload = <T extends FieldValues>({
  ...props
}: FormFileUploadProps<T>) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<T>();

  return (
    <Controller
      name={props.name}
      control={control}
      defaultValue={[] as unknown as PathValue<T, Path<T>>}
      render={({ field }) => (
        <FormField label={props.label}>
          <FileUpload
            {...field}
            {...props}
            showFileLastModified
            showFileSize
            showFileThumbnail
            multiple
            tokenLimit={3}
            errorText={errors[props.name]?.message as string | undefined}
            i18nStrings={{
              uploadButtonText: (e) => (e ? 'Upload files' : 'Upload file'),
              dropzoneText: (e) =>
                e ? 'Drop files to upload' : 'Drop file to upload',
              removeFileAriaLabel: (e) => `Remove file ${e + 1}`,
              limitShowFewer: 'Show fewer files',
              limitShowMore: 'Show more files',
              errorIconAriaLabel: 'Error',
            }}
            onChange={({ detail: { value } }) => {
              field.onChange(value);
            }}
          />
        </FormField>
      )}
    />
  );
};
