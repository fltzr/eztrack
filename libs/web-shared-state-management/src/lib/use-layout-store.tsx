import type { BreadcrumbGroupProps } from '@cloudscape-design/components/breadcrumb-group';
import { create } from 'zustand';

type LayoutStore = {
  domainTitle: string;
  activeHref: string;
  breadcrumbs: BreadcrumbGroupProps.Item[];
  navigationHidden: boolean;
  navigationOpen: boolean;
  toolsHidden: boolean;
  toolsOpen: boolean;

  // Action
  setState: (state: Partial<LayoutStore>) => void;
};

export const useLayoutStore = create<LayoutStore>((set) => ({
  // Initial state
  domainTitle: '',
  activeHref: '/',
  breadcrumbs: [],
  navigationHidden: false,
  navigationOpen: false,
  toolsHidden: false,
  toolsOpen: false,

  // Action
  setState: (newState) => {
    set((state) => ({ ...state, ...newState }));
  },
}));
