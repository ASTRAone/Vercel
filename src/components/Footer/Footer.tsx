import { FC } from 'react';

import { Button, Typography } from '@mui/material';

import { useStyles } from '../../hooks/useStyles';
import { Filters } from '../Filters';
import styles from './styles.module.scss';

type Props = {
  activeTodos: number;
  clearTodoActive: () => void;
};

export const Footer: FC<Props> = ({ activeTodos, clearTodoActive }) => {
  const cx = useStyles(styles);

  return (
    <div className={cx('container')}>
      <Typography className={cx('active')}>
        {`${activeTodos} ${activeTodos > 1 ? 'items' : 'item'} left`}
      </Typography>
      <Filters />
      <Button className={cx('btn')} onClick={clearTodoActive}>
        Clear completed
      </Button>
    </div>
  );
};
