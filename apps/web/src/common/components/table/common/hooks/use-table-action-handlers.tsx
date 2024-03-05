import { createContext, useContext } from 'react';

export type ActionHandlers = {
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onCreate?: () => void;
};

export const ActionHandlersContext = createContext<ActionHandlers>({});

export const useActionHandlers = () => useContext(ActionHandlersContext);
