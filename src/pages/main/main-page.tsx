/* eslint-disable no-debugger */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { Card } from '../../components/card/card';
import { FiltrationBar } from '../../components/filtration/filtration-bar';
import { Menu } from '../../components/menu/menu';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import { filterCategories, getBooksThunk } from '../../redux/slices/books-slice';

import styles from './main-page.module.scss';

type TMapCategories = {
  [key: string]: string;
};

const mapCategories: TMapCategories = {
  business: 'Бизнес',
  psychology: 'Психология',
  parents: 'Родителям',
  'non-fiction': 'Нон-фикшн',
  fiction: 'Художественная литература',
  programming: 'Программирование',
  hobby: 'Хобби',
  design: 'Дизайн',
  childish: 'Детские',
  other: 'Другое',
};

export const MainPage = () => {
  const [isPlate, setIsPlate] = useState(true);
  const [isList, setIsList] = useState(false);

  const { categories } = useParams();

  const { books, categoriesCount } = useTypeSelector((state) => state.booksReducer);

  const changeIsPlate = () => {
    setIsPlate(true);
    setIsList(false);
  };

  const changeIsList = () => {
    setIsList(true);
    setIsPlate(false);
  };

  return (
    <React.Fragment>
      <nav className={styles.menuContainer}>
        <Menu isBurger={false} />
      </nav>
      <main className={styles.mainPage}>
        <FiltrationBar isPlate={isPlate} isList={isList} changeIsPlate={changeIsPlate} changeIsList={changeIsList} />
        <div className={styles.mainPage_plate}>
          {categories === 'all' ? (
            books.map((elem) => (
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
          ) : categories === 'other' ? (
            <div data-test-id='empty-category' className={styles.emptyCategory}>
              В этой категории книг ещё нет
            </div>
          ) : (
            categoriesCount[mapCategories[String(categories)]].map((elem) => (
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
          )}
        </div>
      </main>
    </React.Fragment>
  );
};
