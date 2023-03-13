import { useForm } from 'react-hook-form';
import { FieldValues, SubmitHandler } from 'react-hook-form/dist/types';
import { NavLink, useNavigate } from 'react-router-dom';

import { getLogin } from '../../api/authorisation';
import arrowImg from '../../assets/arrow-right.png';
import { Button } from '../../components/button/button';
import { Error400 } from '../../components/error-400/error-400';
import { FormError } from '../../components/form-error/form-error';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import {
  resetError400,
  resetLoadingStatus,
  setError,
  setError400,
  setLoadingStatus,
  setUserData,
} from '../../redux/slices/user-slice';
import { setNewJwtLocalStorage } from '../../utils';

import styles from './auth-page.module.scss';

export const AuthPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useAppDispatch();
  const user = useTypeSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    let result;

    dispatch(setLoadingStatus());
    dispatch(resetError400());
    try {
      localStorage.removeItem('jwt');
      result = await getLogin(data);
      console.log(result);
      dispatch(setUserData(result));
      setNewJwtLocalStorage(result.jwt);
      navigate('/books/all');
    } catch (error: any) {
      if (error.response.status !== 400) {
        dispatch(setError());
      } else {
        dispatch(setError400());
      }
    }
    dispatch(resetLoadingStatus());
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h3 className={styles.formContainer_heading}>Cleverland</h3>
        {user.error === true ? (
          <FormError />
        ) : (
          <form className={styles.formContainer_form} onSubmit={handleSubmit(onSubmit)}>
            <h4>Вход в личный кабинет</h4>
            <div className={styles.formContainer_form_firstInputContainer}>
              <input
                type='text'
                placeholder='Логин'
                {...register('identifier', { required: true })}
                aria-invalid={errors.identifier ? 'true' : 'false'}
              />
              {errors.identifier?.type === 'required' && <p className={styles.error}>Поле не может быть пустым</p>}
            </div>
            <div className={styles.formContainer_form_secondInputContainer}>
              <input
                type='password'
                placeholder='Пароль'
                {...register('password', { required: true })}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password?.type === 'required' && <p className={styles.error}>Поле не может быть пустым</p>}
            </div>
            {user.error400 ? (
              <Error400 />
            ) : (
              <p className={styles.formContainer_form_forgottenPass}>Забыли логин или пароль?</p>
            )}
            <Button type='submit' text='Войти' />
            <div className={styles.formContainer_form_registerContainer}>
              <p>Нет учётной записи?</p>
              <NavLink to='/registration'>
                Регистрация <img src={arrowImg} alt='register' />
              </NavLink>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
