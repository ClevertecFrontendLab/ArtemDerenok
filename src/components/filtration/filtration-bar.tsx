import { useRef, useState } from 'react';

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
        <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M18.7071 6.04704C19.0976 6.43757 19.0976 7.07073 18.7071 7.46126L6.70711 19.4613C6.31658 19.8518 5.68342 19.8518 5.29289 19.4613C4.90237 19.0707 4.90237 18.4376 5.29289 18.047L17.2929 6.04704C17.6834 5.65652 18.3166 5.65652 18.7071 6.04704Z'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M5.29289 6.04704C5.68342 5.65652 6.31658 5.65652 6.70711 6.04704L18.7071 18.047C19.0976 18.4376 19.0976 19.0707 18.7071 19.4613C18.3166 19.8518 17.6834 19.8518 17.2929 19.4613L5.29289 7.46126C4.90237 7.07073 4.90237 6.43757 5.29289 6.04704Z'
          />
        </svg>
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
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M3.52273 2.875C3.165 2.875 2.875 3.165 2.875 3.52273V8.70455C2.875 9.06228 3.165 9.35227 3.52273 9.35227H8.70455C9.06228 9.35227 9.35227 9.06228 9.35227 8.70455V3.52273C9.35227 3.165 9.06228 2.875 8.70455 2.875H3.52273ZM4.17045 8.05682V4.17045H8.05682V8.05682H4.17045ZM11.2955 2.875C10.9377 2.875 10.6477 3.165 10.6477 3.52273V8.70455C10.6477 9.06228 10.9377 9.35227 11.2955 9.35227H16.4773C16.835 9.35227 17.125 9.06228 17.125 8.70455V3.52273C17.125 3.165 16.835 2.875 16.4773 2.875H11.2955ZM11.9432 8.05682V4.17045H15.8295V8.05682H11.9432ZM2.875 11.2955C2.875 10.9377 3.165 10.6477 3.52273 10.6477H8.70455C9.06228 10.6477 9.35227 10.9377 9.35227 11.2955V16.4773C9.35227 16.835 9.06228 17.125 8.70455 17.125H3.52273C3.165 17.125 2.875 16.835 2.875 16.4773V11.2955ZM4.17045 11.9432V15.8295H8.05682V11.9432H4.17045ZM11.2955 10.6477C10.9377 10.6477 10.6477 10.9377 10.6477 11.2955V16.4773C10.6477 16.835 10.9377 17.125 11.2955 17.125H16.4773C16.835 17.125 17.125 16.835 17.125 16.4773V11.2955C17.125 10.9377 16.835 10.6477 16.4773 10.6477H11.2955ZM11.9432 15.8295V11.9432H15.8295V15.8295H11.9432Z'
            />
          </svg>
        </button>
        <button
          type='button'
          className={isList ? styles.active : null}
          data-test-id='button-menu-view-list'
          onClick={changeIsList}
        >
          <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2.0835 10C2.0835 9.56282 2.43794 9.20837 2.87516 9.20837H17.1252C17.5624 9.20837 17.9168 9.56282 17.9168 10C17.9168 10.4373 17.5624 10.7917 17.1252 10.7917H2.87516C2.43794 10.7917 2.0835 10.4373 2.0835 10Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2.0835 5.25004C2.0835 4.81282 2.43794 4.45837 2.87516 4.45837H17.1252C17.5624 4.45837 17.9168 4.81282 17.9168 5.25004C17.9168 5.68727 17.5624 6.04171 17.1252 6.04171H2.87516C2.43794 6.04171 2.0835 5.68727 2.0835 5.25004Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2.0835 14.75C2.0835 14.3128 2.43794 13.9584 2.87516 13.9584H17.1252C17.5624 13.9584 17.9168 14.3128 17.9168 14.75C17.9168 15.1873 17.5624 15.5417 17.1252 15.5417H2.87516C2.43794 15.5417 2.0835 15.1873 2.0835 14.75Z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
