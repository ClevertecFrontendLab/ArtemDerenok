import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';

import arrowImg from '../../assets/arrow-right.png';
import { Button } from '../../components/button/button';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import { changeStep } from '../../redux/slices/registration-slice';

import styles from './registration-page.module.scss';

export const RegistrationPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      identifier: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
    },
  });
  const dispatch = useAppDispatch();
  const registration = useTypeSelector((state) => state.registrationReducer);

  const nextStep = () => {
    dispatch(changeStep());
  };

  const onSubmit = (data: any) => {
    console.log(data);
    nextStep();
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h3 className={styles.formContainer_heading}>Cleverland</h3>
        <form className={styles.formContainer_form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContainer_form_headingContainer}>
            <h4>Регистрация</h4>
            <p className={styles.formContainer_form_step}>{registration.step} шаг из 3</p>
          </div>
          {registration.step === 1 ? (
            <React.Fragment>
              <div className={styles.formContainer_form_firstInputContainer}>
                <input type='text' placeholder='Придумайте логин для входа' {...register('identifier')} />
                <p className={styles.formContainer_form_inputLabel}>Используйте для логина латинский алфавит и цифры</p>
              </div>
              <div className={styles.formContainer_form_secondInputContainer}>
                <input type='password' placeholder='Пароль' {...register('password')} />
                <p className={styles.formContainer_form_inputLabel}>
                  Пароль не менее 8 символов, с заглавной буквой и цифрой
                </p>
              </div>
              <Button type='button' text='следующий шаг' handler={nextStep} />
            </React.Fragment>
          ) : registration.step === 2 ? (
            <React.Fragment>
              <div className={styles.formContainer_form_firstInputContainer}>
                <input type='text' placeholder='Имя' {...register('firstName')} />
              </div>
              <div className={styles.formContainer_form_secondInputContainer}>
                <input type='text' placeholder='Фамилия' {...register('lastName')} />
              </div>
              <Button type='button' text='последний шаг' handler={nextStep} />
            </React.Fragment>
          ) : registration.step === 3 ? (
            <React.Fragment>
              <div className={styles.formContainer_form_firstInputContainer}>
                <input type='text' placeholder='Номер телефона' {...register('phoneNumber')} />
              </div>
              <div className={styles.formContainer_form_secondInputContainer}>
                <input type='email' placeholder='E-mail' {...register('email')} />
              </div>
              {/* <Button type='submit' text='следующий шаг' handler={nextStep} /> */}
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
      </div>
    </div>
  );
};
