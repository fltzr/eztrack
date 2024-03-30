import type * as zustand from 'zustand';

const { create: actualCreate } =
  await vi.importActual<typeof zustand>('zustand');

// Holds reset functions for all stores
export const storeResetFns = new Set<() => void>();

export const create = (<T>() => {
  console.log('Zustand create mock');

  return (stateCreator: zustand.StateCreator<T>) => {
    const store = actualCreate(stateCreator);
    const initialState = store.getState();

    storeResetFns.add(() => {
      store.setState(initialState, true);
    });

    return store;
  };
}) as typeof zustand.create;
