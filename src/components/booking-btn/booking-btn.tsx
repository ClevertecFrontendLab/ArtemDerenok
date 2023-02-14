import styles from './booking-btn.module.scss';

interface IBookingBtn {
  booking: null | {
    id: number;
    order: boolean;
    dataOrder: string;
    customerId: number;
    customerFirstName: string;
    customerLastName: string;
  };
  delivery: null | {
    id: number;
    handed: true;
    dataHandedFrom: string;
    dataHandedTo: string;
    recipientId: number;
    recipientFirstName: string;
    recipientLastName: string;
  };
}

export const BookingBtn = ({ booking, delivery }: IBookingBtn) => (
  <button
    className={booking === null ? styles.book : booking.order === true ? styles.booked : styles.busy}
    type='button'
  >
    {booking === null
      ? 'Забронировать'
      : booking.order === true
      ? 'Забронированно'
      : `Занято до ${delivery?.dataHandedTo}`}
  </button>
);
