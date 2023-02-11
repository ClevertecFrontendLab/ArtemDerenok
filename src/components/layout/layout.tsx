import { Navigate, Route, Routes } from 'react-router-dom';

import { BookPage } from '../../pages/book/book-page';
import { MainPage } from '../../pages/main/main-page';
import { Terms } from '../../pages/terms/terms';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import styles from './layout.module.scss';

export const Layout = () => (
  <div className={styles.container}>
    <Header />
    <div className={styles.container_content}>
      <Routes>
        <Route path='/' element={<Navigate to='/books/Все книги' />} />
        <Route path='/books' element={<MainPage />} />
        <Route path='/books/:categories' element={<MainPage />} />
        <Route path='/books/:categories/book/:bookId' element={<BookPage />} />
        <Route path='contract' element={<Terms content='contract' />} />
        <Route path='rules' element={<Terms content='rules' />} />
      </Routes>
    </div>
    <Footer />
  </div>
);
