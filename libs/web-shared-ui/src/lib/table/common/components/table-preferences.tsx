import {
  CollectionPreferences,
  type CollectionPreferencesProps,
} from '@cloudscape-design/components';
import capitalize from 'lodash-es/capitalize';

import { useNotificationStore } from '@/web/state-management';
import type { TableColumnDefinition } from '@/web/types';

// table-preferences
export const createPageSizeOptions = (resource: string) => [
  { value: 10, label: `10 ${capitalize(resource)}s` },
  { value: 15, label: `15 ${capitalize(resource)}s` },
  { value: 20, label: `20 ${capitalize(resource)}s` },
];

// table-preferences
export const createContentDisplayOptions = (
  columnDefinitions: TableColumnDefinition<unknown>[],
): CollectionPreferencesProps.ContentDisplayOption[] =>
  columnDefinitions.map((columnDefinition) => ({
    id: columnDefinition.id,
    label: columnDefinition.header?.toString() ?? '',
    alwaysVisible: columnDefinition.id === 'id',
  }));

type PreferencesProps = {
  resource: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: TableColumnDefinition<any>[];
  preferences: CollectionPreferencesProps.Preferences;
  setPreferences: CollectionPreferencesProps['onConfirm'];
  disabled?: boolean;
};
export const Preferences = ({ ...props }: PreferencesProps) => {
  const contentDisplayOptions = createContentDisplayOptions(props.items);
  const pageSizeOptions = createPageSizeOptions(props.resource);

  const addNotification = useNotificationStore(
    (state) => state.addNotification,
  );

  return (
    <CollectionPreferences
      disabled={props.disabled}
      confirmLabel="Apply"
      cancelLabel="Cancel"
      preferences={props.preferences}
      contentDisplayPreference={{ options: contentDisplayOptions }}
      pageSizePreference={{ options: pageSizeOptions }}
      wrapLinesPreference={{}}
      stripedRowsPreference={{}}
      contentDensityPreference={{}}
      stickyColumnsPreference={{
        firstColumns: {
          title: 'Stick first column(s)',
          description:
            'Keep the first column(s) visible while scrolling horizontally',
          options: [
            { label: 'None', value: 0 },
            { label: 'First column', value: 1 },
            { label: 'First two columns', value: 2 },
          ],
        },
        lastColumns: {
          title: 'Stick last column',
          description:
            'Keep the last column visible while scrolling horizontally',
          options: [
            { label: 'None', value: 0 },
            { label: 'Last column', value: 1 },
          ],
        },
      }}
      onConfirm={(event) => {
        if (props.setPreferences) {
          props.setPreferences(event);
        } else {
          addNotification({
            type: 'warning',
            content: 'Unable to save preferences. Please try again.',
          });
        }
      }}
    />
  );
};
