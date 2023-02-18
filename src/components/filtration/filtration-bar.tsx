import { useRef } from 'react';

import { ReactComponent as CloseSvg } from '../../assets/close-icon.svg';
import { ReactComponent as ListSvg } from '../../assets/list-icon.svg';
import { ReactComponent as PlatesSvg } from '../../assets/plates.svg';

import styles from './filtration-bar.module.scss';

interface IFiltrationBar {
  isPlate: boolean;
  isList: boolean;
  changeIsPlate: () => void;
  changeIsList: () => void;
}

export const FiltrationBar = ({ isPlate, isList, changeIsPlate, changeIsList }: IFiltrationBar) => {
  const filterRef = useRef<HTMLDivElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const crossRef = useRef<HTMLButtonElement>(null);
  const searchOpenRef = useRef<HTMLButtonElement>(null);

  const showSearch = () => {
    searchRef.current?.classList.add(styles.showSearchBar);
    crossRef.current?.classList.add(styles.showCrossBtn);
    filterRef.current?.classList.add(styles.hide);
    btnsRef.current?.classList.add(styles.hide);
    searchOpenRef.current?.classList.add(styles.hide);
  };

  const hideSearch = () => {
    searchRef.current?.classList.remove(styles.showSearchBar);
    crossRef.current?.classList.remove(styles.showCrossBtn);
    filterRef.current?.classList.remove(styles.hide);
    btnsRef.current?.classList.remove(styles.hide);
    searchOpenRef.current?.classList.remove(styles.hide);
  };

  return (
    <div className={styles.filtrationBar}>
      <input type='search' placeholder='Поиск книги или автора…' className={styles.filtrationBar_search} />
      <button
        type='button'
        ref={searchOpenRef}
        onClick={showSearch}
        className={styles.searchBtn}
        data-test-id='button-search-open'
      >
        {null}
      </button>
      <input
        data-test-id='input-search'
        ref={searchRef}
        type='text'
        placeholder='Поиск книги или автора…'
        className={styles.filtrationBar_search_secondSearch}
      />
      <button
        data-test-id='button-search-close'
        ref={crossRef}
        onClick={hideSearch}
        className={styles.crossBtn}
        type='button'
      >
        <CloseSvg />
      </button>
      <div ref={filterRef} className={styles.filtrationBar_filter}>
        <span>По рейтингу</span>
      </div>
      <div ref={btnsRef} className={styles.filtrationBar_view}>
        <button
          type='button'
          className={isPlate ? styles.active : null}
          data-test-id='button-menu-view-window'
          onClick={changeIsPlate}
        >
          <PlatesSvg />
        </button>
        <button
          type='button'
          className={isList ? styles.active : null}
          data-test-id='button-menu-view-list'
          onClick={changeIsList}
        >
          <ListSvg />
        </button>
      </div>
    </div>
  );
};
