import { FC, use } from 'react';

import {
  CheckCircle,
  DeleteForever,
  Edit,
  PanoramaFishEyeOutlined,
} from '@mui/icons-material';

import { AppContext } from '../../../context/appContext';
import { useStyles } from '../../../hooks/useStyles';
import { TTodo } from '../../../types';
import styles from './styles.module.scss';

type Props = TTodo & {
  onEdit: () => void;
  isFirst: boolean;
};

export const ListTasksItem: FC<Props> = ({
  completed,
  title,
  id,
  isFirst,
  onEdit,
}) => {
  const cx = useStyles(styles);

  const { deleteTodo, onToggleCompleteTodo } = use(AppContext);

  return (
    <li className={cx('container', { isFirst })}>
      <div className={cx('content')}>
        <div onClick={() => onToggleCompleteTodo(id)}>
          {completed ? (
            <CheckCircle className={cx('icon', { completed })} />
          ) : (
            <PanoramaFishEyeOutlined className={cx('icon')} />
          )}
        </div>
        <p className={cx('text', { completed })}>{title}</p>
      </div>
      <div>
        <Edit onClick={onEdit} className={cx('icon')} />
        <DeleteForever onClick={() => deleteTodo(id)} className={cx('icon')} />
      </div>
    </li>
  );
};
