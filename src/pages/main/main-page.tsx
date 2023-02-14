import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Card } from '../../components/card/card';
import { FiltrationBar } from '../../components/filtration/filtration-bar';
import { Menu } from '../../components/menu/menu';
import { Spinner } from '../../components/spinner/spinner';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import { getBooksThunk } from '../../redux/slices/books-slice';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const [isPlate, setIsPlate] = useState(true);
  const [isList, setIsList] = useState(false);

  const dispatch = useAppDispatch();

  const { books, loading, error } = useTypeSelector((state) => state.booksReducer);

  const changeIsPlate = () => {
    setIsPlate(true);
    setIsList(false);
  };

  const changeIsList = () => {
    setIsList(true);
    setIsPlate(false);
  };

  useEffect(() => {
    dispatch(getBooksThunk());
  }, [dispatch]);

  return (
    <React.Fragment>
      <nav className={styles.menuContainer}>
        <Menu isBurger={false} />
      </nav>
      <main className={styles.mainPage}>
        <FiltrationBar isPlate={isPlate} isList={isList} changeIsPlate={changeIsPlate} changeIsList={changeIsList} />
        <div className={styles.mainPage_plate}>
          {books.length > 0
            ? books.map((elem) => (
                <Card
                  key={nanoid()}
                  name={elem.title}
                  images={elem.image === null ? null : elem.image.url}
                  rating={elem.rating}
                  author={elem.authors}
                  booking={elem.booking}
                  delivery={elem.delivery}
                  id={elem.id}
                  isList={isList}
                />
              ))
            : null}
        </div>
      </main>
    </React.Fragment>
  );
};
