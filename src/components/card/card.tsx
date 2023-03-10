import React from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';

import otherImg from '../../assets/icon_other.png';
import { BookingBtn } from '../booking-btn/booking-btn';
import { Highlight } from '../highlight/higlight';
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
  searchValue: string;
}

export const Card = ({ name, images, rating, author, booking, delivery, id, isList, searchValue }: ICard) => (
  <div className={`${styles.card} ${isList ? styles.list : null}`} data-test-id='card'>
    <Link className={`${isList ? styles.linkList : styles.link}`} to={`${id}`}>
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
            <h2 className={styles.name}>
              <Highlighter
                highlightClassName={styles.highlight}
                searchWords={[searchValue]}
                autoEscape={true}
                textToHighlight={name}
                highlightTag={Highlight}
              />
            </h2>
            <p className={styles.author}>{author.join(', ')}</p>
          </div>
          <div className={styles.ratingContainer}>
            <Rating rating={rating} /> <BookingBtn booking={booking} delivery={delivery} />
          </div>
        </div>
      ) : (
        <React.Fragment>
          <Rating rating={rating} />
          <h2 className={styles.card_name}>
            <Highlighter
              highlightClassName={styles.highlight}
              searchWords={[searchValue]}
              autoEscape={true}
              textToHighlight={name}
              highlightTag={Highlight}
            />
          </h2>
          <p className={styles.card_author}>{author.join('\n')}</p>
          <BookingBtn booking={booking} delivery={delivery} />
        </React.Fragment>
      )}
    </Link>
  </div>
);
