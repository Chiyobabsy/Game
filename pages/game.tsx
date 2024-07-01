import React from 'react'
import GameField from '../components/GameField'
import styles from '../styles/Game.module.scss'

const Game = () => {
  return (
    <div className={styles.gameContainer}>
      <h1>Rectangle Stacking Game</h1>
      <GameField />
    </div>
  )
}

export default Game
