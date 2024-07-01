import React from 'react';
import styles from '../styles/Footer.module.scss';
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socialLinks}>
          <a href="https://www.instagram.com/babsygracy/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/channel/UCzSywIt0bTgAkmvU4Qu7OVg" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="https://x.com/babsygracy" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FaTwitter />
          </a>
        </div>
        <p className={styles.copyright}>&copy; 2024 Grace Brick Game. All rights reserved.</p>
        <nav className={styles.nav}>
          <a href="https://www.digital.govt.nz/standards-and-guidance/design-and-ux/usability/privacy-statements-for-websites/" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
          <a href="https://www.digital.govt.nz/standards-and-guidance/design-and-ux/usability/terms-of-use-for-websites/" target="_blank" rel="noopener noreferrer">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
