import { nanoid } from 'nanoid';

import emptyStar from '../../assets/empty-star.png';
import fullStar from '../../assets/full-star.png';

import styles from './rating.module.scss';

export const Rating = ({ rating }: { rating: number | null | undefined }) => {
  const getStars = (num: number) => {
    const arr: JSX.Element[] = [];
    const stars = Math.round(num);

    for (let i = 1; i <= 5; i++) {
      if (i <= stars) {
        arr.push(<img key={nanoid()} src={fullStar} alt='full star' />);
      } else {
        arr.push(<img key={nanoid()} src={emptyStar} alt='empty star' />);
      }
    }

    return arr;
  };

  return (
    <div className={styles.rating}>
      {rating === null ? 'ещё нет оценок' : rating === undefined ? 'eщё нет оценок' : getStars(rating)}
    </div>
  );
};
