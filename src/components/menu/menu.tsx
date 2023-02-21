import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { ReactComponent as DownArrow } from '../../assets/down-arrow.svg';
import { ReactComponent as UpArrow } from '../../assets/up-arrow.svg';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useTypeSelector } from '../../hooks/use-type-selector';
import { getCategoriesThunk } from '../../redux/slices/categories-slice';

import styles from './menu.module.scss';

interface IMenu {
  showMobileMenu?: () => void;
  isBurger: boolean;
}

export const Menu = ({ showMobileMenu, isBurger }: IMenu) => {
  const ganresList = useRef<HTMLUListElement>(null);
  const downArrow = useRef<SVGSVGElement>(null);
  const upArrow = useRef<SVGSVGElement>(null);
  const categories = useTypeSelector((state) => state.categoriesReducer.categories);
  const categoriesCount = useTypeSelector((state) => state.booksReducer.categoriesCount);
  const dispatch = useAppDispatch();

  const handleMenu = () => {
    if (ganresList.current) {
      ganresList.current.classList.toggle(styles.showMenu);

      if (ganresList.current.classList.contains(styles.showMenu)) {
        downArrow.current?.classList.add(styles.hide);
        upArrow.current?.classList.remove(styles.hide);
      } else {
        downArrow.current?.classList.remove(styles.hide);
        upArrow.current?.classList.add(styles.hide);
      }
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategoriesThunk());
    }
  }, [categories.length, dispatch]);

  return (
    <ul className={styles.menu}>
      <li className={styles.menu_firstLink}>
        <NavLink
          data-test-id={isBurger === false ? 'navigation-showcase' : 'burger-showcase'}
          onClick={handleMenu}
          to='/books/all'
          className={styles.bookShowcase}
        >
          {({ isActive }) => (
            <div>
              <span className={isActive ? styles.active : undefined}>Витрина книг</span>
              <DownArrow ref={downArrow} className={isActive ? styles.arrowsActive : styles.arrowUsual} />
              <UpArrow
                ref={upArrow}
                className={`${styles.hide} ${isActive ? styles.arrowsActive : styles.arrowUsual}`}
              />
            </div>
          )}
        </NavLink>
      </li>
      <ul ref={ganresList} className={styles.secondMenu}>
        <li key={nanoid()} className={styles.secondMenu_link}>
          <NavLink
            data-test-id={isBurger === false ? 'navigation-books' : 'burger-books'}
            onClick={showMobileMenu}
            to='/books/all'
          >
            {({ isActive }) => <span className={isActive ? styles.active : undefined}>Все книги</span>}
          </NavLink>{' '}
        </li>
        {categories.map((elem) => (
          <li key={nanoid()} className={styles.secondMenu_link}>
            <NavLink
              onClick={showMobileMenu}
              to={`/books/${elem.path}`}
              data-test-id={isBurger === false ? `navigation-${elem.path}` : `burger-${elem.path}`}
            >
              {({ isActive }) => <span className={isActive ? styles.active : undefined}>{elem.name}</span>}
            </NavLink>{' '}
            <span
              data-test-id={
                isBurger === false ? `navigation-book-count-for-${elem.path}` : `burger-book-count-for-${elem.path}`
              }
              className={styles.secondMenu_countBooksLabel}
            >
              {categoriesCount[elem.name].length}
            </span>
          </li>
        ))}
      </ul>
      <li>
        <NavLink
          data-test-id={isBurger === false ? 'navigation-terms' : 'burger-terms'}
          onClick={showMobileMenu}
          to='/rules'
        >
          {({ isActive }) => <span className={isActive ? styles.active : undefined}>Правила пользования</span>}
        </NavLink>
      </li>
      <li>
        <NavLink
          data-test-id={isBurger === false ? 'navigation-contract' : 'burger-contract'}
          onClick={showMobileMenu}
          to='/contract'
        >
          {({ isActive }) => <span className={isActive ? styles.active : undefined}>Договор оферты</span>}
        </NavLink>
      </li>
    </ul>
  );
};
