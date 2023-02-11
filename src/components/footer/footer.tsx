import styles from './footer.module.scss';

export const Footer = () => (
  <footer className={styles.footer}>
    <p>© 2020-2023 Cleverland. Все права защищены.</p>
    <div className={styles.linksContainer}>
      <a href='https://www.facebook.com/' className={styles.faceBookLink}>
        Facebook
      </a>
      <a href='https://www.instagram.com' className={styles.instLink}>
        Instagram
      </a>
      <a href='https://vk.com/' className={styles.vkLink}>
        VK
      </a>
      <a href='https://www.linkedin.com/' className={styles.linLink}>
        Linkedin
      </a>
    </div>
  </footer>
);
