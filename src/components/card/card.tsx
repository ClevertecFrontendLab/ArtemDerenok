import React from 'react';
import { Link } from 'react-router-dom';

import otherImg from '../../assets/icon_other.png';
import { BookingBtn } from '../booking-btn/booking-btn';
import { Rating } from '../rating/rating';

import styles from './card.module.scss';

interface ICard {
  name: string;
  rating: number | null;
  images: string | null;
  author: string[];
  booking: null | {
    id: number;
    order: boolean;
    dateOrder: string;
    customerId: number;
    customerFirstName: string;
    customerLastName: string;
  };
  delivery: null | {
    id: number;
    handed: true;
    dateHandedFrom: string;
    dateHandedTo: string;
    recipientId: number;
    recipientFirstName: string;
    recipientLastName: string;
  };
  id: number;
  isList: boolean;
}

export const Card = ({ name, images, rating, author, booking, delivery, id, isList }: ICard) => (
  <div className={`${styles.card} ${isList ? styles.list : null}`} data-test-id='card'>
    <Link className={`${isList ? styles.linkList : styles.link}`} to={`book/${id}`}>
      <div className={`${isList ? styles.listImgContainer : styles.card_imgContainer}`}>
        <img
          src={images ? `https://strapi.cleverland.by${images}` : otherImg}
          className={images ? styles.card_imgContainer_picture : null}
          alt='book'
        />
      </div>
      {isList ? (
        <div className={styles.descriptionContainer}>
          <div>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.author}>
              {author.map((elem, index) => {
                if (index === author.length - 1) {
                  return `${elem}`;
                }

                return `${elem}, `;
              })}
            </p>
          </div>
          <div className={styles.ratingContainer}>
            <Rating rating={rating} /> <BookingBtn booking={booking} delivery={delivery} />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <Rating rating={rating} />
          <h2 className={styles.card_name}>{name}</h2>
          <p className={styles.card_author}>{author.map((elem) => `${elem}\n`)}</p>
          <BookingBtn booking={booking} delivery={delivery} />
        </React.Fragment>
      )}
    </Link>
  </div>
);
