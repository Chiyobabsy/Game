import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from "next/image";
import styles from '../styles/Home.module.scss';

const Home = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Rush Brick Replay - Interactive Game</title>
        <meta name="description" content="Play Rush Brick Replay, an interactive game where you spawn and move rectangles!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <Image
            src="/bg.jpeg"
            alt="Rush Brick Replay Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroContent}>
            <h1 className={styles.title}>Rush Brick Replay</h1>
            <p className={styles.description}>
              Unleash your creativity in this interactive rectangle playground!
            </p>
            <Link href="/game" className={styles.ctaButton}>
              Start Playing Now
            </Link>
          </div>
        </section>

        <section className={styles.infoSection}>
          <h2>How to Play</h2>
          <ul>
            {[
              "Click any empty spot to spawn a rectangle",
              "Watch it animate from the top-left corner",
              "Drag rectangles around to your desire spot",
              "Build the rectangle to the top",
            ].map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Home;