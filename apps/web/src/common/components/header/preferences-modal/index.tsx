import Box from '@cloudscape-design/components/box';
import FormField from '@cloudscape-design/components/form-field';
import Header from '@cloudscape-design/components/header';
import Modal from '@cloudscape-design/components/modal';
import Select, { type SelectProps } from '@cloudscape-design/components/select';
import SpaceBetween from '@cloudscape-design/components/space-between';
import Tiles from '@cloudscape-design/components/tiles';
import { Density, Mode as Theme } from '@cloudscape-design/global-styles';

import { usePreferencesStore } from '@/web/state-management';

import comfortableDensity from './images/comfortable-density';
import compactDensity from './images/compact-density';

const themeOptions: SelectProps.Option[] = [
  { value: Theme.Light, label: 'Light' },
  { value: Theme.Dark, label: 'Dark' },
];

type UserPreferencesModalProps = {
  visible: boolean;
  onDismiss: () => void;
};
export const UserPreferencesModal = ({
  visible,
  onDismiss,
}: UserPreferencesModalProps) => {
  const { theme, setTheme } = usePreferencesStore((s) => ({
    theme: s.theme,
    setTheme: s.setTheme,
  }));
  const { density, setDensity } = usePreferencesStore((s) => ({
    density: s.density,
    setDensity: s.setDensity,
  }));

  return (
    <Modal
      size="medium"
      visible={visible}
      header={<Header variant="h2">Theme Settings</Header>}
      onDismiss={onDismiss}
    >
      <Box margin={{ bottom: 'l' }}>
        <SpaceBetween size="m" direction="vertical">
          <FormField label="Theme">
            <Select
              options={themeOptions}
              selectedOption={
                themeOptions.find((opt) => opt.value === theme) ?? null
              }
              onChange={(event) => {
                setTheme(event.detail.selectedOption.value as Theme);
              }}
            />
          </FormField>
          <FormField label="Density">
            <Tiles
              value={density}
              items={[
                {
                  value: Density.Comfortable,
                  label: 'Comfortable',
                  image: comfortableDensity,
                },
                {
                  value: Density.Compact,
                  label: 'Compact',
                  image: compactDensity,
                },
              ]}
              onChange={({ detail }) => {
                setDensity(detail.value as Density);
              }}
            />
          </FormField>
        </SpaceBetween>
      </Box>
    </Modal>
  );
};

export const Component = UserPreferencesModal;
