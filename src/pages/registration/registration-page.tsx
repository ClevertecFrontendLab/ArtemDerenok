import React from 'react';
import Highlighter from 'react-highlight-words';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { NavLink } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { setRegistration } from '../../api/authorisation';
import arrowImg from '../../assets/arrow-right.png';
import { Button } from '../../components/button/button';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import {
  changeStep,
  resetError400Reg,
  resetErrorReg,
  resetLoadingStatusReg,
  setError400Reg,
  setErrorReg,
  setLoadingStatusReg,
} from '../../redux/slices/registration-slice';

import styles from './registration-page.module.scss';

const schema = yup
  .object({
    username: yup
      .string()
      .matches(/([A-Za-z])/g, 'латинский алфавит')
      .matches(/([0-9])/g, 'цифры'),
    password: yup
      .string()
      .min(8, 'не менее 8 символов')
      .matches(/([A-ZА-Я]{1})/g, 'заглавной буквой')
      .matches(/([0-9]{1})/g, 'цифрой')
      .required('Поле не может быть пустым'),
    firstName: yup.string().required('Поле не может быть пустым'),
    lastName: yup.string().required('Поле не может быть пустым'),
    phone: yup
      .string()
      .matches(
        /^\+[1-9]{3}(\s+)?\(?([1-9][1-9])\)?(\s+)?[0-9]{3}-?[0-9]{2}-?[0-9]{2}$/,
        'В формате +375 (xx) xxx-xx-xx'
      )
      .required('Поле не может быть пустым'),
    email: yup.string().email('Введите корректный e-mail').required('Поле не может быть пустым'),
  })
  .required();

export const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    setError,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
    },
    resolver: yupResolver(schema),
    mode: 'all',
  });
  const dispatch = useAppDispatch();
  const registration = useTypeSelector((state) => state.registrationReducer);

  const nextStep = () => {
    dispatch(changeStep());
  };

  const onSubmit = async (data: any) => {
    dispatch(setLoadingStatusReg());
    dispatch(resetError400Reg());
    dispatch(resetErrorReg());
    try {
      const result = await setRegistration(data);

      nextStep();
      console.log(result);
    } catch (error: any) {
      if (error.response.status !== 400) {
        dispatch(setErrorReg());
      } else {
        dispatch(setError400Reg());
      }
      nextStep();
    }
    dispatch(resetLoadingStatusReg());
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h3 className={styles.formContainer_heading}>Cleverland</h3>
        {registration.step === 4 ? (
          <div className={styles.finalRegContainer}>
            {registration.error ? (
              <React.Fragment>
                <h4>Данные не сохранились</h4>
                <p>Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз</p>
                <Button type='button' text='повторить' handler={nextStep} />
              </React.Fragment>
            ) : registration.error400 ? (
              <React.Fragment>
                <h4>Регистрация успешна</h4>
                <p>
                  Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или
                  e-mail
                </p>
                <Button
                  type='button'
                  text='назад к регистрации'
                  handler={() => {
                    reset(() => ({
                      username: '',
                      password: '',
                      firstName: '',
                      lastName: '',
                      phone: '',
                      email: '',
                    }));
                    nextStep();
                  }}
                />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <h4>Регистрация успешна</h4>
                <p>Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль</p>
                <NavLink to='/auth'>
                  <Button type='button' text='вход' handler={nextStep} />
                </NavLink>
              </React.Fragment>
            )}
          </div>
        ) : (
          <form className={styles.formContainer_form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formContainer_form_headingContainer}>
              <h4>Регистрация</h4>
              <p className={styles.formContainer_form_step}>{registration.step} шаг из 3</p>
            </div>
            {registration.step === 1 ? (
              <React.Fragment>
                <div className={styles.formContainer_form_firstInputContainer}>
                  <input
                    type='text'
                    placeholder='Придумайте логин для входа'
                    {...register('username')}
                    onBlur={async () => {
                      const result = await trigger(['username']);

                      if (!result) {
                        setError('username', {
                          type: 'custom',
                          message: 'Используйте для логина латинский алфавит и цифры',
                        });
                      }
                    }}
                  />
                  {errors.username?.message ? (
                    <p className={`${styles.formContainer_form_inputLabel} ${styles.errorBorder}`}>
                      <Highlighter
                        highlightClassName={styles.errorColor}
                        searchWords={[String(errors.username?.message)]}
                        textToHighlight='Используйте для логина латинский алфавит и цифры'
                      />
                    </p>
                  ) : (
                    <p className={styles.formContainer_form_inputLabel}>
                      Используйте для логина латинский алфавит и цифры
                    </p>
                  )}
                </div>
                <div className={styles.formContainer_form_secondInputContainer}>
                  <input
                    type='password'
                    placeholder='Пароль'
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
                    <p className={`${styles.formContainer_form_inputLabel} ${styles.errorBorder}`}>
                      <Highlighter
                        highlightClassName={styles.errorColor}
                        searchWords={[String(errors.password?.message)]}
                        textToHighlight='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                      />
                    </p>
                  ) : (
                    <p className={styles.formContainer_form_inputLabel}>
                      Пароль не менее 8 символов, с заглавной буквой и цифрой
                    </p>
                  )}
                </div>
                <Button
                  type='button'
                  text='следующий шаг'
                  handler={async () => {
                    const result = await trigger(['username', 'password']);

                    if (result) {
                      nextStep();
                    }
                  }}
                />
              </React.Fragment>
            ) : registration.step === 2 ? (
              <React.Fragment>
                <div className={styles.formContainer_form_firstInputContainer}>
                  <input type='text' placeholder='Имя' {...register('firstName')} />
                  {errors.firstName?.message ? (
                    <p className={`${styles.formContainer_form_inputLabel} ${styles.error}`}>
                      {errors.firstName?.message}
                    </p>
                  ) : (
                    <p className={styles.formContainer_form_inputLabel} />
                  )}
                </div>
                <div className={styles.formContainer_form_secondInputContainer}>
                  <input type='text' placeholder='Фамилия' {...register('lastName')} />
                  {errors.lastName?.message ? (
                    <p className={`${styles.formContainer_form_inputLabel} ${styles.error}`}>
                      {errors.firstName?.message}
                    </p>
                  ) : (
                    <p className={styles.formContainer_form_inputLabel} />
                  )}
                </div>
                <Button
                  type='button'
                  text='последний шаг'
                  handler={async () => {
                    const result = await trigger(['firstName', 'lastName']);

                    if (result) {
                      nextStep();
                    }
                  }}
                />
              </React.Fragment>
            ) : registration.step === 3 ? (
              <React.Fragment>
                <div className={styles.formContainer_form_firstInputContainer}>
                  <InputMask
                    mask='+999 (99) 999-99-99'
                    type='tel'
                    placeholder='Номер телефона'
                    {...register('phone')}
                  />
                  {errors.phone?.message ? (
                    <p className={`${styles.formContainer_form_inputLabel} ${styles.error}`}>{errors.phone?.message}</p>
                  ) : (
                    <p className={styles.formContainer_form_inputLabel}>В формате +375 (xx) xxx-xx-xx</p>
                  )}
                </div>
                <div className={styles.formContainer_form_secondInputContainer}>
                  <input type='email' placeholder='E-mail' {...register('email')} />
                  {errors.email?.message ? (
                    <p className={`${styles.formContainer_form_inputLabel} ${styles.error}`}>{errors.email?.message}</p>
                  ) : (
                    <p className={styles.formContainer_form_inputLabel} />
                  )}
                </div>
                <button type='submit' className={styles.button}>
                  Зерегистрироваться
                </button>
              </React.Fragment>
            ) : null}
            <div className={styles.formContainer_form_loginContainer}>
              <p>Есть учётная запись?</p>
              <NavLink to='/auth'>
                Войти <img src={arrowImg} alt='register' />
              </NavLink>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
