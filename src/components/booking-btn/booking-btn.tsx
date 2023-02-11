import styles from './booking-btn.module.scss';

interface IBookingBtn {
  state: string | undefined;
  date: null | string | undefined;
}

export const BookingBtn = ({ state, date }: IBookingBtn) => (
  <button className={state === 'book' ? styles.book : state === 'booked' ? styles.booked : styles.busy} type='button'>
    {state === 'book' ? 'Забронировать' : state === 'booked' ? 'Забронированно' : `Занято до ${date}`}
  </button>
);
