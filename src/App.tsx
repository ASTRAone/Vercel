import { FC, useEffect, useState } from 'react';

import { useStyles } from './hooks/useStyles';

import { Footer } from './components/Footer';
import { FormAdd } from './components/FormAdd';
import { TaskList } from './components/TaskList';
import { AppContext } from './context/appContext';
import styles from './styles.module.scss';
import { TFilters, TTodo } from './types';

const App: FC = () => {
  const cx = useStyles(styles);
  const [todos] = useState<TTodo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]')
  );

  const [filteredTodos, setFilteredTodos] = useState<TTodo[]>(todos);

  const [typeFilter, setTypeFilter] = useState<TFilters>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addedTodo = (title: string) => {
    const newTodo: TTodo = {
      title,
      id: `${new Date().getMilliseconds()}`,
      completed: false,
    };

    setFilteredTodos((prev) => [newTodo, ...prev]);
  };

  const deleteTodo = (id: string) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setFilteredTodos(newTodos);
  };

  const editTodo = (id: string, title: string) => {
    const updateTodos = todos.map((item) => {
      if (item.id === id) {
        item.title = title;
      }
      return item;
    });

    setFilteredTodos(updateTodos);
  };

  const onToggleCompleteTodo = (id: string) => {
    const updateTodos = todos.map((item) => {
      if (item.id === id) {
        item.completed = !item.completed;
      }
      return item;
    });

    setFilteredTodos(updateTodos);
  };

  const clearTodoActive = () => {
    const newTodos = todos.filter((item) => !item.completed);
    setFilteredTodos(newTodos);
  };

  const onChangeFilterTodos = (filterType: TFilters) => {
    setTypeFilter(filterType);
  };

  const activeTodos = filteredTodos.filter((item) => !item.completed).length;

  return (
    <AppContext.Provider
      value={{
        typeFilter,
        deleteTodo,
        editTodo,
        onToggleCompleteTodo,
        onChangeFilterTodos,
        setTypeFilter,
      }}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <FormAdd addedTodo={addedTodo} />
          <TaskList todos={filteredTodos} typeFilter={typeFilter} />
          <Footer activeTodos={activeTodos} clearTodoActive={clearTodoActive} />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;
