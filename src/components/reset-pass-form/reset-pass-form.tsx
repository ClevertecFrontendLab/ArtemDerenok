import { useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { sendNewPassword } from '../../api/authorisation';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import {
  resetErrorForgot,
  resetLoadingStatusForgot,
  setErrorForgot,
  setLoadingStatusForgot,
} from '../../redux/slices/forgot-slice';
import { Button } from '../button/button';

import styles from './reset-pass-form.module.scss';

interface IResetPassForm {
  code: string | null;
}

const schema = yup
  .object({
    password: yup
      .string()
      .min(8, 'не менее 8 символов')
      .matches(/([A-ZА-Я]{1})/g, 'заглавной буквой')
      .matches(/([0-9]{1})/g, 'цифрой')
      .required('Поле не может быть пустым'),
    passwordConfirmation: yup
      .string()
      .min(8, 'не менее 8 символов')
      .matches(/([A-ZА-Я]{1})/g, 'заглавной буквой')
      .matches(/([0-9]{1})/g, 'цифрой')
      .required('Поле не может быть пустым'),
  })
  .required();

export const ResetPassForm = ({ code }: IResetPassForm) => {
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema), mode: 'all' });
  const forgot = useTypeSelector((state) => state.forgotReducer);
  const [isPasswordReset, setPasswordReset] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = async (data: any) => {
    if (data.password === data.passwordConfirmation) {
      const body = { ...data, code };

      dispatch(setLoadingStatusForgot());
      dispatch(resetErrorForgot());

      try {
        await sendNewPassword(body);

        setPasswordReset(true);
      } catch (error) {
        dispatch(setErrorForgot());
      }

      dispatch(resetLoadingStatusForgot());
    } else {
      setError('passwordConfirmation', {
        type: 'custom',
        message: 'Пароли не совпадают',
      });
    }
  };

  const repeatResetPass = () => {
    dispatch(resetErrorForgot());
  };

  return (
    <div>
      {isPasswordReset ? (
        <div className={styles.container}>
          <h4>Новые данные сохранены</h4>
          <p>Зайдите в личный кабинет, используя свои логин и новый пароль</p>
          <NavLink to='/auth'>
            <Button type='button' text='Вход' />
          </NavLink>
        </div>
      ) : forgot.error ? (
        <div className={styles.container}>
          <h4>Данные не сохранились</h4>
          <p>Что-то пошло не так. Попробуйте ещё раз</p>
          <Button type='button' text='повторить' handler={repeatResetPass} />
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.form_formContent}>
            <h4>Восстановление пароля</h4>
            <div className={styles.form_formContent_inputBox}>
              <input
                type='password'
                placeholder='Новый пароль'
                {...register('password')}
                onBlur={async () => {
                  const result = await trigger(['password']);

                  if (!result) {
                    setError('password', {
                      type: 'custom',
                      message: 'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                    });
                  }
                }}
              />
              {errors.password?.message ? (
                <p className={`${styles.form_formContent_inputBox_label} ${styles.errorBorder}`}>
                  <Highlighter
                    highlightClassName={styles.errorColor}
                    searchWords={[String(errors.password?.message)]}
                    textToHighlight='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                  />
                </p>
              ) : (
                <p className={styles.form_formContent_inputBox_label}>
                  Пароль не менее 8 символов, с заглавной буквой и цифрой
                </p>
              )}
            </div>
            <div className={styles.form_formContent_inputBox}>
              <input type='password' placeholder='Повторите пароль' {...register('passwordConfirmation')} />
              {errors.passwordConfirmation?.message && errors.passwordConfirmation?.type !== 'custom' ? (
                <p className={`${styles.form_formContent_inputBox_label} ${styles.errorBorder}`}>
                  <Highlighter
                    highlightClassName={styles.errorColor}
                    searchWords={[String(errors.passwordConfirmation?.message)]}
                    textToHighlight='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                  />
                </p>
              ) : errors.passwordConfirmation?.type === 'custom' ? (
                <p className={`${styles.form_formContent_inputBox_label} ${styles.errorBorder} ${styles.errorColor}`}>
                  {String(errors.passwordConfirmation?.message)}
                </p>
              ) : (
                <p className={styles.form_formContent_inputBox_label} />
              )}
            </div>
            <Button type='submit' text='сохранить изменения' />
            <div className={styles.form_formContent_libary}>
              <p>После сохранения войдите в библиотеку, используя новый пароль</p>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
