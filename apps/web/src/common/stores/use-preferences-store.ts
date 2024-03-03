import { Mode as Theme, Density } from '@cloudscape-design/global-styles';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type PreferencesState = {
  theme: Theme;
  density: Density;
};

type PreferencesActions = {
  setTheme: (theme: Theme) => void;
  setDensity: (density: Density) => void;
};

export const usePreferencesStore = create<
  PreferencesState & PreferencesActions
>()(
  persist(
    (set) => ({
      theme: Theme.Light,
      density: Density.Comfortable,
      setTheme: (theme) => {
        set({ theme });
      },
      setDensity: (density) => {
        set({ density });
      },
    }),
    {
      name: '__MW::user-preferences',
    }
  )
);
