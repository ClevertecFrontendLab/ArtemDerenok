import styles from './highlight.module.scss';

interface IHighlight {
  children: string;
}

export const Highlight = ({ children }: IHighlight) => (
  <span data-test-id='highlight-matches' className={styles.highlight}>
    {children}
  </span>
);
