import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import styles from '../styles/Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
      <Image 
        src="/Game/Logo.png" 
        alt="Site Logo" 
        width={100}  // Adjust this to your logo's width
        height={50}  // Adjust this to your logo's height
        priority
      />
    </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/game" className={styles.navLink}>Game</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
