import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

import { Card } from '../../components/card/card';
import { FiltrationBar } from '../../components/filtration/filtration-bar';
import { Menu } from '../../components/menu/menu';
import books from '../../data/books.json';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { getBooksThunk } from '../../redux/slices/books-slice';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const [isPlate, setIsPlate] = useState(true);
  const [isList, setIsList] = useState(false);

  const dispatch = useAppDispatch();

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
          {books.map((elem) => (
            <Card
              key={nanoid()}
              name={elem.name}
              isImage={elem.isImage}
              images={elem.images}
              rating={elem.rating}
              author={elem.author}
              status={elem.status}
              id={elem.id}
              isList={isList}
            />
          ))}
        </div>
      </main>
    </React.Fragment>
  );
};
