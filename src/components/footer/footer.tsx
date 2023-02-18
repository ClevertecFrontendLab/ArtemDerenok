import { nanoid } from 'nanoid';

import styles from './footer.module.scss';

const links = [
  {
    url: 'https://www.facebook.com/',
    name: 'Facebook',
    class: styles.faceBookLink,
  },
  {
    url: 'https://www.instagram.com',
    name: 'Instagram',
    class: styles.instLink,
  },
  {
    url: 'https://vk.com/',
    name: 'VK',
    class: styles.vkLink,
  },
  {
    url: 'https://www.linkedin.com/',
    name: 'Linkedin',
    class: styles.linLink,
  },
];

export const Footer = () => (
  <footer className={styles.footer}>
    <p>© 2020-2023 Cleverland. Все права защищены.</p>
    <div className={styles.linksContainer}>
      {links.map((elem) => (
        <a key={nanoid()} href={elem.url} className={elem.class}>
          {elem.name}
        </a>
      ))}
    </div>
  </footer>
);
