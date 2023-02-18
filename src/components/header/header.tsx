import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

import avatar from '../../assets/avatar.png';
import { Menu } from '../menu/menu';

import styles from './header.module.scss';

export const Header = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const showMobileMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  return (
    <React.Fragment>
      <div
        className={isShowMenu ? styles.wrapper : styles.hide}
        onClick={showMobileMenu}
        role='menu'
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.code === 'Enter') {
            showMobileMenu();
          }
        }}
      />
      <header className={styles.header}>
        <div data-test-id='burger-navigation' className={`${styles.mobileMenu} ${isShowMenu ? styles.active : ''}`}>
          {isShowMenu ? <Menu showMobileMenu={showMobileMenu} isBurger={true} /> : null}
        </div>
        <div className={styles.logoContainer}>
          <Link className={styles.link} to='/'>
            Cleverland
          </Link>
          <div
            data-test-id='button-burger'
            onClick={showMobileMenu}
            className={styles.mobileBtn}
            role='menu'
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.code === 'Enter') {
                showMobileMenu();
              }
            }}
          >
            {isShowMenu ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
          </div>
          <h1>Библиотека</h1>
        </div>
        <div className={styles.avatarContainer}>
          <p>Привет, Иван!</p>
          <img src={avatar} alt='avatar' />
        </div>
      </header>
    </React.Fragment>
  );
};
