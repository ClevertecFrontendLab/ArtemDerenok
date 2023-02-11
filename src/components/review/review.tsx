import avatarImg from '../../assets/review-avatar.png';
import { Rating } from '../rating/rating';

import styles from './review.module.scss';

interface IReview {
  name: string;
  date: string;
  text: string;
  rating: number;
}

export const Review = ({ name, date, text, rating }: IReview) => (
  <div className={styles.review}>
    <div className={styles.dataContainer}>
      <img src={avatarImg} alt='avatar' />
      <div>
        <p>{name}</p>
        <p>{date}</p>
      </div>
    </div>
    <Rating rating={rating} />
    <p className={styles.text}>{text}</p>
  </div>
);
