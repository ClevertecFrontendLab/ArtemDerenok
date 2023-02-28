import styles from './button.module.scss';

interface IButton {
  type: string;
  text: string;
}

export const Button = ({ type, text }: IButton) => (
  <button className={styles.button} type={type === 'button' ? 'button' : type === 'submit' ? 'submit' : 'button'}>
    {text}
  </button>
);
