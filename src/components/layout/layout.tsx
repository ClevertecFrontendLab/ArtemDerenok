import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useTypeSelector } from '../../hooks/use-type-selector';
import { BookPage } from '../../pages/book/book-page';
import { MainPage } from '../../pages/main/main-page';
import { Terms } from '../../pages/terms/terms';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Spinner } from '../spinner/spinner';

import styles from './layout.module.scss';

export const Layout = () => {
  const loadingCategories = useTypeSelector((state) => state.categoriesReducer.loading);
  const loadingBooks = useTypeSelector((state) => state.booksReducer.loading);
  const loadingBook = useTypeSelector((state) => state.bookReducer.loading);

  return (
    <React.Fragment>
      {loadingCategories || loadingBook || loadingBooks ? <Spinner /> : null}
      <div className={styles.container}>
        <Header />
        <div className={styles.container_content}>
          <Routes>
            <Route path='/' element={<Navigate to='/books/all-books' />} />
            <Route path='/books' element={<MainPage />} />
            <Route path='/books/:categories' element={<MainPage />} />
            <Route path='/books/:categories/book/:bookId' element={<BookPage />} />
            <Route path='contract' element={<Terms content='contract' />} />
            <Route path='rules' element={<Terms content='rules' />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
};
