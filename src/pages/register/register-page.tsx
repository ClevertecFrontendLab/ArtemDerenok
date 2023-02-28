import arrowImg from '../../assets/arrow-right.png';
import { Button } from '../../components/button/button';

import styles from './register-page.module.scss';

export const RegisterPage = () => (
  <div className={styles.container}>
    <div className={styles.formContainer}>
      <h3 className={styles.formContainer_heading}>Cleverland</h3>
      <form className={styles.formContainer_form}>
        <h4>Вход в личный кабинет</h4>
        <input type='text' placeholder='Логин' />
        <input type='password' placeholder='Пароль' />
        <p className={styles.formContainer_form_forgottenPass}>Забыли логин или пароль?</p>
        <Button type='submit' text='Войти' />
        <div className={styles.formContainer_form_registerContainer}>
          <p>Нет учётной записи?</p>
          <button type='button'>
            Регистрация <img src={arrowImg} alt='register' />
          </button>
        </div>
      </form>
    </div>
  </div>
);
