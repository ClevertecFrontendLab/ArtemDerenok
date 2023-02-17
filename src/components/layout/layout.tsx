import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import { BookPage } from '../../pages/book/book-page';
import { MainPage } from '../../pages/main/main-page';
import { Terms } from '../../pages/terms/terms';
import { resetErrorStatusBook } from '../../redux/slices/book-slice';
import { resestErrorStatusBooks } from '../../redux/slices/books-slice';
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

  const dispatch = useAppDispatch();

  const handleShowErrorMessage = () => {
    dispatch(resetErrorStatusCategories());
    dispatch(resestErrorStatusBooks());
    dispatch(resetErrorStatusBook());
  };

  return (
    <React.Fragment>
      {categories.loading || book.loading || books.loading ? <Spinner /> : null}
      <div className={styles.container}>
        {categories.error || book.error || books.error ? (
          <Error handleShowErrorMessage={handleShowErrorMessage} />
        ) : null}
        <Header />
        <div className={styles.container_content}>
          <Routes>
            <Route path='/' element={<Navigate to='/books/all' />} />
            <Route path='/books' element={<MainPage />} />
            <Route path='/books/:categories' element={<MainPage />} />
            <Route path='/books/all/:bookId' element={<BookPage />} />
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
