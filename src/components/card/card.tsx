import React from 'react';
import { Link } from 'react-router-dom';

import bookImg from '../../assets/algoritms.png';
import otherImg from '../../assets/icon_other.png';
import { BookingBtn } from '../booking-btn/booking-btn';
import { Rating } from '../rating/rating';

import styles from './card.module.scss';

interface ICard {
  name: string;
  isImage: boolean;
  rating: number | null;
  images: string[] | never[];
  author: string;
  status: {
    state: string;
    date: null | string;
  };
  id: number;
  isList: boolean;
}

export const Card = ({ name, isImage, images, rating, author, status: { state, date }, id, isList }: ICard) => (
  <div className={`${styles.card} ${isList ? styles.list : null}`} data-test-id='card'>
    <Link className={`${isList ? styles.linkList : styles.link}`} to={`book/${id}`}>
      <div className={`${isList ? styles.listImgContainer : styles.card_imgContainer}`}>
        <img
          src={isImage ? images[0] : otherImg}
          className={isImage ? styles.card_imgContainer_picture : null}
          alt='book'
        />
      </div>
      {isList ? (
        <div className={styles.descriptionContainer}>
          <div>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.author}>{author}</p>
          </div>
          <div className={styles.ratingContainer}>
            <Rating rating={rating} /> <BookingBtn state={state} date={date} />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <Rating rating={rating} />
          <h2 className={styles.card_name}>{name}</h2>
          <p className={styles.card_author}>{author}</p>
          <BookingBtn state={state} date={date} />
        </React.Fragment>
      )}
    </Link>
  </div>
);
