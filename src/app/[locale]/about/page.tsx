import { useTranslations } from 'next-intl';
import React from 'react';

const AboutPage: React.FC = () => {
  const t = useTranslations('About');

  return (
    <div className='min-h-[400px] flex flex-col justify-center gap-5 p-10 mx-[10rem] '>
      <h1 className='font-bold text-3xl'>{t('title')}</h1>
      <p>{t('message')}</p>
    </div>
  );
};

export default AboutPage;