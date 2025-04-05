'use client';
import React, { FC, useEffect } from 'react';

export const Video: FC = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.95;
    }
  }, []);

  return (
    <>
      <video autoPlay loop muted ref={videoRef} className='absolute top-0 left-0 w-full opacity-80 z-[-1] object-cover h-full bg-teal-600'>
        <source src="/media/video.mp4" type="video/mp4" />
      </video>
    </>
  );
};
