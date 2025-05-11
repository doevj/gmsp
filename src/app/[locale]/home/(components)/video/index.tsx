'use client';
import React, { FC, useEffect } from 'react';
import Image from 'next/image';
import imgsrc from './una-escribe.jpg';
import './video.styles.css';

export const Video: FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.95;
    }
  }, []);

  return (
    <>
      {/* autoPlay loop muted ref={videoRef}  */}
      <div className='video_container'>
        <Image src={imgsrc} alt='back_image' className='video_container__img' height={500} width={500} />
        {/* <source src="/media/video.mp4" type="video/mp4" /> */}
      </div>
    </>
  );
}; 
