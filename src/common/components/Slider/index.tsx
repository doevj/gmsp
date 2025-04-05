'use client';
import { FC, useState, ReactNode, useEffect, useRef } from 'react';

type CarouselProps = {
  children: ReactNode[];
  width?: string; // "100%", "600px", etc.
};

export const Slider: FC<CarouselProps> = ({ children, width = '100%' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const isMoving = useRef(false);
  const prevSlide = () => {
    if (isMoving.current) return;
    isMoving.current = true;
    setCurrentIndex((prev) => (prev === 0 ? children.length - 1 : prev - 1));
    setTimeout(() => {
      isMoving.current = false;
    }, 900);
  };

  const nextSlide = () => {
    if (isMoving.current) return;
    isMoving.current = true;
    setCurrentIndex((prev) => (prev === children.length - 1 ? 0 : prev + 1));
    setTimeout(() => {
      isMoving.current = false;
    }, 900);
  };

  useEffect(() => {
    const timeout = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timeout);

  }, [children.length]);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <div className="relative">
      <div style={{ width, }}>
        <div
          style={{
            display: 'flex',
            transition: 'transform 0.7s ease-in-out',
            transform: `translateX(-${currentIndex * 100}%)`,
            overflow: 'visible',
          }}
        >
          {children.map((child, index) => (
            <div key={index} style={{ flex: '0 0 100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        style={{
          position: 'absolute',
          top: '50%',
          left: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.2)',
          color: 'black',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          opacity: 0.3,
        }}
      >
        {'‹'}
      </button>
      <button
        onClick={nextSlide}
        style={{
          position: 'absolute',
          top: '50%',
          right: '10px',
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.2)',
          color: 'black',
          border: 'none',
          padding: '8px',
          cursor: 'pointer',
          opacity: 0.3,
        }}
      >
        {'›'}
      </button>
    </div>
  );
};