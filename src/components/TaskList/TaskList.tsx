import React, { use, useMemo, useState } from "react";

import { usePopupControls } from "../../hooks/usePopupControls";
import { useStyles } from "../../hooks/useStyles";
import { TTodo } from "../../types";
import { ListTasksItem } from "./ListTasksItem";
import { ModalEdit } from "./ModalEdit";
import styles from "./styles.module.scss";
import { AppContext } from "../../context/appContext";

type Props = {
  todos: TTodo[];
};

export const TaskList: React.FC<Props> = ({ todos }) => {
  const cx = useStyles(styles);
  const { isOpened, openPopup, closePopup } = usePopupControls();
  const { typeFilter } = use(AppContext);

  const [todo, setTodo] = useState<TTodo>();

  const openModalEdit = (item: TTodo) => {
    return () => {
      setTodo(item);
      openPopup();
    };
  };

  const filteredTodos = useMemo(() => {
    if (typeFilter === "active") {
      return todos.filter((item) => !item.completed);
    }

    if (typeFilter === "completed") {
      return todos.filter((item) => item.completed);
    }

    return todos;
  }, [todos, typeFilter]);

  return (
    <>
      <div className={cx("container")}>
        {todos.length > 0
          ? filteredTodos.map((item, index) => {
              const isFirst = index === 0;
              return (
                <ListTasksItem
                  key={item.id}
                  {...item}
                  isFirst={isFirst}
                  onEdit={openModalEdit(item)}
                />
              );
            })
          : null}
      </div>

      <ModalEdit isOpened={isOpened} todo={todo} onClose={closePopup} />
    </>
  );
};
