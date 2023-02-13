import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { nanoid } from 'nanoid';

import genres from '../../data/genres.json';
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
  const { categories, loading, error } = useTypeSelector((state) => state.categoriesReducer);
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
      {loading ? <li>Загрузка</li> : null}
      <li className={styles.menu_firstLink}>
        <NavLink
          data-test-id={isBurger === false ? 'navigation-showcase' : 'burger-showcase'}
          onClick={handleMenu}
          to='/books'
          className={styles.bookShowcase}
        >
          {({ isActive }) => (
            <div>
              <span className={isActive ? styles.active : undefined}>Витрина книг</span>
              <svg
                ref={downArrow}
                width='14'
                height='8'
                viewBox='0 0 14 8'
                xmlns='http://www.w3.org/2000/svg'
                className={isActive ? styles.arrowsActive : styles.arrowUsual}
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M0.292893 0.292893C0.683417 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683417 14.0976 1.31658 13.7071 1.70711L7.70711 7.70711C7.31658 8.09763 6.68342 8.09763 6.29289 7.70711L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683417 0.292893 0.292893Z'
                />
              </svg>
              <svg
                ref={upArrow}
                className={`${styles.hide} ${isActive ? styles.arrowsActive : styles.arrowUsual}`}
                width='14'
                height='8'
                viewBox='0 0 14 8'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M6.29289 0.292893C6.68342 -0.0976311 7.31658 -0.0976311 7.70711 0.292893L13.7071 6.29289C14.0976 6.68342 14.0976 7.31658 13.7071 7.70711C13.3166 8.09763 12.6834 8.09763 12.2929 7.70711L7 2.41421L1.70711 7.70711C1.31658 8.09763 0.683417 8.09763 0.292893 7.70711C-0.0976311 7.31658 -0.0976311 6.68342 0.292893 6.29289L6.29289 0.292893Z'
                />
              </svg>
            </div>
          )}
        </NavLink>
      </li>
      <ul ref={ganresList} className={styles.secondMenu}>
        <li key={nanoid()} className={styles.secondMenu_link}>
          <NavLink
            data-test-id={isBurger === false ? 'navigation-books' : 'burger-books'}
            onClick={showMobileMenu}
            to='/books/all-books'
          >
            {({ isActive }) => <span className={isActive ? styles.active : undefined}>Все книги</span>}
          </NavLink>{' '}
          <span className={styles.secondMenu_countBooksLabel}>10</span>
        </li>
        {categories.map((elem) => (
          <li key={nanoid()} className={styles.secondMenu_link}>
            <NavLink onClick={showMobileMenu} to={`/books/${elem.path}`}>
              {({ isActive }) => <span className={isActive ? styles.active : undefined}>{elem.name}</span>}
            </NavLink>{' '}
            <span className={styles.secondMenu_countBooksLabel}>10</span>
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
