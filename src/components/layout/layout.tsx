import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import { AuthPage } from '../../pages/auth/auth-page';
import { BookPage } from '../../pages/book/book-page';
import { ForgotPage } from '../../pages/forgot/forgot-page';
import { MainPage } from '../../pages/main/main-page';
import { RegistrationPage } from '../../pages/registration/registration-page';
import { Terms } from '../../pages/terms/terms';
import { resetErrorStatusBook } from '../../redux/slices/book-slice';
import {
  filterByDescBooks,
  filterCategories,
  getBooksThunk,
  resestErrorStatusBooks,
  setCurrentBooks,
} from '../../redux/slices/books-slice';
import { resetErrorStatusCategories } from '../../redux/slices/categories-slice';
import { Error } from '../error/error';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Spinner } from '../spinner/spinner';

import styles from './layout.module.scss';

export const Layout = () => {
  const categories = useTypeSelector((state) => state.categoriesReducer);
  const books = useTypeSelector((state) => state.booksReducer);
  const book = useTypeSelector((state) => state.bookReducer);
  const user = useTypeSelector((state) => state.userReducer);
  const registration = useTypeSelector((state) => state.registrationReducer);
  const forgot = useTypeSelector((state) => state.forgotReducer);

  const dispatch = useAppDispatch();

  const handleShowErrorMessage = () => {
    dispatch(resetErrorStatusCategories());
    dispatch(resestErrorStatusBooks());
    dispatch(resetErrorStatusBook());
  };

  useEffect(() => {
    dispatch(getBooksThunk()).then(() => {
      dispatch(filterCategories());
      dispatch(setCurrentBooks('all'));
      dispatch(filterByDescBooks());
    });
  }, [dispatch]);

  return (
    <React.Fragment>
      {categories.loading || book.loading || books.loading || user.loading || registration.loading || forgot.loading ? (
        <Spinner />
      ) : null}
      <div className={styles.container}>
        {categories.error || book.error || books.error ? (
          <Error handleShowErrorMessage={handleShowErrorMessage} />
        ) : null}
        <Header />
        <div className={styles.container_content}>
          <Routes>
            <Route path='/' element={<Navigate to='forgot-pass' />} />
            <Route path='/auth' element={<AuthPage />} />
            <Route path='/registration' element={<RegistrationPage />} />
            <Route path='/forgot-pass' element={<ForgotPage />} />
            <Route path='/books/:categories' element={<MainPage />} />
            <Route path='/books/:categories/:bookId' element={<BookPage />} />
            <Route path='contract' element={<Terms content='contract' />} />
            <Route path='rules' element={<Terms content='rules' />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};
