import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { resetError } from '../../redux/slices/user-slice';
import { Button } from '../button/button';

import styles from './form-error.module.scss';

export const FormError = () => {
  const dispatch = useAppDispatch();

  const disableError = () => {
    dispatch(resetError());
  };

  return (
    <div className={styles.container}>
      <h4>Вход не выполнен</h4>
      <p>Что-то пошло не так. Попробуйте ещё раз</p>
      <Button type='button' text='Повторить' handler={disableError} />
    </div>
  );
};
