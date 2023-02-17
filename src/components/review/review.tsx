import avatarImg from '../../assets/review-avatar.png';
import { Rating } from '../rating/rating';

import styles from './review.module.scss';

interface IReview {
  name: string;
  date: string;
  text: string;
  rating: number;
  avatar: string | null;
}

export const Review = ({ name, date, text, rating, avatar }: IReview) => (
  <div className={styles.review}>
    <div className={styles.dataContainer}>
      <img
        className={styles.avatar}
        src={avatar === null ? avatarImg : `https://strapi.cleverland.by${avatar}`}
        alt='avatar'
      />
      <div>
        <p>{name}</p>
        <p>
          {new Date(date).toLocaleString('ru', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
    </div>
    <Rating rating={rating} />
    <p className={styles.text}>{text}</p>
  </div>
);
