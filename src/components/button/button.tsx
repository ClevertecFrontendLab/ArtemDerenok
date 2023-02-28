import styles from './button.module.scss';

interface IButton {
  type: string;
  text: string;
  handler?: () => void;
}

export const Button = ({ type, text, handler }: IButton) => (
  <button
    onClick={handler}
    className={styles.button}
    type={type === 'button' ? 'button' : type === 'submit' ? 'submit' : 'button'}
  >
    {text}
  </button>
);
