import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { resetPassword } from '../../api/authorisation';
import arrowImg from '../../assets/arrow-right.png';
import leftArrow from '../../assets/left-arrow.png';
import { Button } from '../../components/button/button';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import {
  resetErrorForgot,
  resetLoadingStatusForgot,
  setErrorForgot,
  setLoadingStatusForgot,
} from '../../redux/slices/forgot-slice';

import styles from './forgot-page.module.scss';

const schema = yup
  .object({
    email: yup.string().email('Введите корректный e-mail').required('Поле не может быть пустым'),
  })
  .required();

export const ForgotPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });
  const forgot = useTypeSelector((state) => state.forgotReducer);
  const [isLetterReceived, setLetterReceived] = useState(false);

  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    dispatch(setLoadingStatusForgot());
    dispatch(resetErrorForgot());
    try {
      const result = await resetPassword(data);

      if (result.ok) {
        setLetterReceived(true);
      }
    } catch (error) {
      dispatch(setErrorForgot());
    }

    dispatch(resetLoadingStatusForgot());
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h3 className={styles.formContainer_heading}>Cleverland</h3>
        {isLetterReceived ? (
          <div className={styles.receivedLetterContainer}>
            <h4>Письмо выслано</h4>
            <p>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</p>
          </div>
        ) : (
          <form className={styles.formContainer_form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formContainer_form_registration}>
              <NavLink to='/auth'>
                <img src={leftArrow} alt='registration' />
                <span>Вход в личный кабинет</span>
              </NavLink>
            </div>
            <div className={styles.formContainer_form_formContent}>
              <h4>Восстановление пароля</h4>
              <div className={styles.formContainer_form_formContent_inputBox}>
                <input type='text' placeholder='Email' {...register('email')} />
                <p
                  className={`${styles.formContainer_form_formContent_inputLabel} ${
                    errors.email?.message || forgot.error ? styles.errorBorder : ''
                  }`}
                >
                  {errors.email?.message ? <p className={styles.error}>{String(errors.email?.message)}</p> : null}
                  {forgot.error ? <p className={styles.error}>error</p> : null}
                  На этот email будет отправлено письмо с инструкциями по восстановлению пароля
                </p>
              </div>
              <Button type='submit' text='восстановить' />
              <div className={styles.formContainer_form_formContent_loginContainer}>
                <p>Нет учётной записи?</p>
                <NavLink to='/registration'>
                  регистрация <img src={arrowImg} alt='register' />
                </NavLink>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
