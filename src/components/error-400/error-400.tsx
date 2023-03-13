import { NavLink } from 'react-router-dom';

import styles from './error-400.module.scss';

export const Error400 = () => (
  <div className={styles.container}>
    <p className={styles.wrong_login}>Неверный логин или пароль!</p>
    <NavLink to='/forgot-pass'>
      <p className={styles.recover}>Восстановить?</p>
    </NavLink>
  </div>
);
