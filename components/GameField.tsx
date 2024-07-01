import React, { useState, useRef, useEffect, MouseEvent as ReactMouseEvent } from 'react';
import Image from "next/image";
import styles from '../styles/GameField.module.scss';

interface Rectangle {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

const GameField: React.FC = () => {
  const [rectangles, setRectangles] = useState<Rectangle[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);
  const [draggedRect, setDraggedRect] = useState<(Rectangle & { offsetX: number; offsetY: number }) | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const gameFieldRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (isGameOver || !gameFieldRef.current || event.target !== gameFieldRef.current) return;

    const rect = gameFieldRef.current.getBoundingClientRect();
    const targetX = event.clientX - rect.left;
    const targetY = event.clientY - rect.top;
    const width = 100;
    const height = 100;

    const newRectangle: Rectangle = {
      id: Date.now(),
      x: 0,
      y: 0,
      width,
      height,
      zIndex: nextZIndex,
    };

    setRectangles((prevRectangles) => [...prevRectangles, newRectangle]);
    setNextZIndex((prevZIndex) => prevZIndex + 1);

    setTimeout(() => {
      const finalY = targetY - height / 2;
      setRectangles((prevRectangles) =>
        prevRectangles.map((rect) =>
          rect.id === newRectangle.id ? { ...rect, x: targetX - width / 2, y: finalY } : rect
        )
      );

      if (finalY <= 0) {
        setIsGameOver(true);
      }
    }, 50);
  };

  const handleDragStart = (id: number, event: ReactMouseEvent) => {
    if (isGameOver) return;
    event.preventDefault();
    const rect = rectangles.find(r => r.id === id);
    if (rect) {
      const offsetX = event.nativeEvent.offsetX;
      const offsetY = event.nativeEvent.offsetY;
      setDraggedRect({ 
        ...rect, 
        offsetX,
        offsetY
      });
      setRectangles((prevRectangles) =>
        prevRectangles.map((r) =>
          r.id === id ? { ...r, zIndex: nextZIndex } : r
        )
      );
      setNextZIndex((prevZIndex) => prevZIndex + 1);
    }
  };

  const handleMouseMove = (e: globalThis.MouseEvent) => {
    if (isGameOver) return;
    if (draggedRect && gameFieldRef.current) {
      const fieldRect = gameFieldRef.current.getBoundingClientRect();
      const newX = e.clientX - fieldRect.left - draggedRect.offsetX;
      const newY = e.clientY - fieldRect.top - draggedRect.offsetY;
      
      setRectangles(prevRects => 
        prevRects.map(r => 
          r.id === draggedRect.id ? { 
            ...r, 
            x: Math.max(0, Math.min(newX, fieldRect.width - draggedRect.width)),
            y: Math.max(0, Math.min(newY, fieldRect.height - draggedRect.height))
          } : r
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggedRect(null);
  };

  useEffect(() => {
    const handleMouseMoveWrapper = (e: globalThis.MouseEvent) => handleMouseMove(e);
    if (draggedRect) {
      document.addEventListener('mousemove', handleMouseMoveWrapper);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMoveWrapper);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggedRect]);

  useEffect(() => {
    const handleResize = () => {
      if (gameFieldRef.current) {
        const { width, height } = gameFieldRef.current.getBoundingClientRect();
        setRectangles((prevRectangles) =>
          prevRectangles.map((rect) => ({
            ...rect,
            x: Math.min(rect.x, width - rect.width),
            y: Math.min(rect.y, height - rect.height),
          }))
        );
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.gameFieldContainer}>
      <div className={styles.gameField} ref={gameFieldRef} onClick={handleClick}>
        {rectangles.length === 0 && !isGameOver && (
          <div className={styles.instructionText}>
            Click on any space to begin
          </div>
        )}
        {rectangles.map((rect) => (
          <div
            key={rect.id}
            className={styles.rectangle}
            style={{
              width: rect.width,
              height: rect.height,
              zIndex: rect.zIndex,
              transform: `translate(${rect.x}px, ${rect.y}px)`,
              position: 'absolute',
              cursor: isGameOver ? 'default' : 'move',
              transition: draggedRect?.id === rect.id ? 'none' : 'transform 0.5s ease-out',
            }}
            onMouseDown={(e) => handleDragStart(rect.id, e)}
          >
            <Image
              src="/images/gameimg.png"
              alt="Gaming"
              width={rect.width}
              height={rect.height}
              objectFit="cover"
            />
          </div>
        ))}
        {isGameOver && (
          <div className={styles.gameOverOverlay}>
            <div className={styles.gameOverContent}>
              <h2>Game Over!</h2>
              <button onClick={() => {
                setRectangles([]);
                setIsGameOver(false);
              }}>
                Play Again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameField;
