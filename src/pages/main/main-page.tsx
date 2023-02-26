import React, { ChangeEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { Card } from '../../components/card/card';
import { FiltrationBar } from '../../components/filtration/filtration-bar';
import { Menu } from '../../components/menu/menu';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import { filterByDescBooks, filterByIncrBooks, searchBook, setCurrentBooks } from '../../redux/slices/books-slice';

import styles from './main-page.module.scss';

export const MainPage = () => {
  const [isPlate, setIsPlate] = useState(true);
  const [isList, setIsList] = useState(false);
  const [sortType, setSortType] = useState(true);
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useAppDispatch();

  const { categories } = useParams();

  const { currentBooks, isFailSearchResult } = useTypeSelector((state) => state.booksReducer);

  const handleSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    dispatch(searchBook({ category: String(categories), value: searchValue }));
  };

  const handleTypeSort = () => setSortType(!sortType);

  useEffect(() => {
    dispatch(setCurrentBooks(categories));
    if (sortType === true) {
      dispatch(filterByDescBooks());
    } else {
      dispatch(filterByIncrBooks());
    }
  }, [categories, dispatch, sortType]);

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
        <FiltrationBar
          isPlate={isPlate}
          isList={isList}
          changeIsPlate={changeIsPlate}
          changeIsList={changeIsList}
          sortType={sortType}
          handleTypeSort={handleTypeSort}
          searchValue={searchValue}
          handleSearchValue={handleSearchValue}
        />
        <div className={styles.mainPage_plate}>
          {isFailSearchResult === false ? (
            currentBooks.length === 0 ? (
              <div data-test-id='empty-category' className={styles.emptyCategory}>
                В этой категории книг ещё нет
              </div>
            ) : (
              currentBooks.map((elem) => (
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
                  searchValue={searchValue}
                />
              ))
            )
          ) : (
            <div data-test-id='search-result-not-found' className={styles.emptyCategory}>
              По запросу ничего не найдено
            </div>
          )}
        </div>
      </main>
    </React.Fragment>
  );
};
