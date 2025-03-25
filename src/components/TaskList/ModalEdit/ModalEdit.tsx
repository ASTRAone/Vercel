import { ChangeEvent, FC, use, useEffect, useState } from 'react';

import { Close } from '@mui/icons-material';
import { Button, Modal, TextField, Typography } from '@mui/material';

import { AppContext } from '../../../context/appContext';
import { useStyles } from '../../../hooks/useStyles';
import { TTodo } from '../../../types';
import styles from './styles.module.scss';

type Props = {
  isOpened: boolean;
  todo?: TTodo;
  onClose: () => void;
};

export const ModalEdit: FC<Props> = ({ isOpened, todo, onClose }) => {
  const cx = useStyles(styles);
  const [value, setValue] = useState(todo?.title);

  const { editTodo } = use(AppContext);

  useEffect(() => {
    if (todo?.title) {
      setValue(todo.title);
    }
  }, [todo]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const onEditTodo = () => {
    if (todo && value?.trim()) {
      editTodo(todo?.id, value?.trim());
      onClose();
    }
  };

  return (
    <Modal open={isOpened} closeAfterTransition={true}>
      <div className={cx('container')}>
        <Close onClick={onClose} className={cx('icon')} />

        <div className={cx('content')}>
          <Typography variant="h3" gutterBottom className={cx('title')}>
            Todo edit
          </Typography>
          <TextField
            id="outlined-basic"
            label="Todo"
            variant="outlined"
            placeholder="Todo..."
            value={value}
            onChange={onChange}
          />
          <Button
            variant="contained"
            onClick={onEditTodo}
            disabled={value?.length === 0}>
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
