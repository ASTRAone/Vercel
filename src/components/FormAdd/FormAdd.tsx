import {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  useState,
} from 'react';

import { Input } from '@mui/material';

import { useStyles } from '../../hooks/useStyles';
import styles from './styles.module.scss';

type Props = {
  addedTodo: (title: string) => void;
};

export const FormAdd: FC<Props> = ({ addedTodo }) => {
  const cx = useStyles(styles);
  const [value, setValue] = useState('');

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
  };

  const onKeyDown = (
    e: DetailedHTMLProps<
      InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >
  ) => {
    if (value.trim() && e.key === 'Enter') {
      addedTodo(value);
      setValue('');
    }
  };

  return (
    <div className={cx('container')}>
      <div className={cx('iconContainer')}></div>
      <Input
        type="text"
        className={cx('input')}
        placeholder="What needs to be done?"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};
