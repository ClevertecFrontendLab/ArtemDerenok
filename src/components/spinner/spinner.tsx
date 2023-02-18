import { ReactComponent as SpnnerSvg } from '../../assets/spinner.svg';

import styles from './spinner.module.scss';

export const Spinner = () => (
  <div className={styles.container} data-test-id='loader'>
    <SpnnerSvg className={styles.spinner} />
  </div>
);
