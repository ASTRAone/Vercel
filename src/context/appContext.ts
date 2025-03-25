import { createContext } from "react";
import { TFilters } from "../types";


type Props = {
    typeFilter?: TFilters;
    deleteTodo?: (id: string) => void;
    editTodo?: (id: string, title: string) => void;
    onToggleCompleteTodo?: (id: string) => void;
    onChangeFilterTodos?: (type: TFilters) => void;
    setTypeFilter?: React.Dispatch<React.SetStateAction<TFilters>>
};

export const AppContext = createContext<Props>({
  typeFilter: 'all',
  deleteTodo: () => {},
  editTodo: () => {},
  onToggleCompleteTodo: () => {},
  onChangeFilterTodos: () => {},
  setTypeFilter: () => {},
});

export type {Props as AppContextProps}