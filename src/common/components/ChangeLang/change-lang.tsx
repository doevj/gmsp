'use client';
import { Lang } from '@/consts';
import { removeLangPrefix } from '@/utils';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FC, useEffect, useRef, useState } from 'react';
import es from './assets/es.svg';
import ru from './assets/ru.svg';
import en from './assets/uk.svg';

export const getLanguageItems = () => {
  return {
    en: {
      title: 'English',
      short: 'en',
      lang: 'en' as Lang,
      image: en,
    },
    es: {
      title: 'Español',
      short: 'es',
      lang: 'es' as Lang,
      image: es,
    },
    ru: {
      title: 'Русский',
      short: 'ру',
      lang: 'ru' as Lang,
      image: ru,
    },
  };
};

export const ChangeLangDropdown: FC = () => {
  const locale = useLocale();
  const path = usePathname();

  const languageItems: Record<string, { image: { src: string }, title: string, short: string, lang: string }> = getLanguageItems();
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    };

    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  }, []);

  return (
    <div ref={ref} className="scale-75 md:scale-90 flex flex-col gap-2 p-2 px-3 relative z-70 overflow-visible  bg-teal-800/70 rounded-lg -mr-4">
      <button onClick={() => setIsOpen(v => !v)} className="relative flex gap-1 items-center opacity-55 hover:opacity-100 transition-all duration-200">
        <span className="z-10 text-white">
          {locale}
        </span>
        <Image width={15} height={10} src={languageItems[locale].image.src || ''} alt={`lang-${locale}`} className=" h-2" />
      </button>
      <div className={`absolute top-12 left-0 gap-2 ${isOpen ? 'flex flex-col' : 'hidden'} rounded-lg p-2 px-3 bg-teal-800/70`}>
        {
          Object.values(languageItems).map(({ title, lang, image }) => lang !== locale && (
            <a
              href={path ? `/${lang}${removeLangPrefix(path)}` : '#'}
              title={title}
              aria-label={title}
              key={lang}
              className="relative flex gap-1 items-center opacity-35 hover:opacity-100 transition-all duration-200"
            >
              <span className=" opacity-95 hover:opacity-95 text-white ">
                {lang}
              </span>
              <Image width={15} height={2} src={image.src} alt={`lang-${lang}`} className=" h-2" />
            </a>
          ))
        }
      </div>
    </div>
  );
};

