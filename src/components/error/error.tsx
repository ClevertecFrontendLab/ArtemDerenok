import warningIcon from '../../assets/warning-icon.png';

import styles from './error.module.scss';

interface IError {
  handleShowErrorMessage: () => void;
}

export const Error = ({ handleShowErrorMessage }: IError) => (
  <div className={styles.container} data-test-id='error'>
    <img src={warningIcon} alt='warning' className={styles.image} />
    <p className={styles.text}>Что-то пошло не так. Обновите страницу через некоторое время.</p>
    <button type='button' className={styles.button} onClick={handleShowErrorMessage}>
      {' '}
    </button>
  </div>
);
