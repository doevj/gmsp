'use client'
import { Lang } from "@/consts";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import en from "./assets/uk.svg";
import ru from "./assets/ru.svg";
import es from "./assets/es.svg";
import { useLocale } from "next-intl";

export const getLanguageItems = () => {
  return {
    ru: {
      title: 'Русский',
      short: 'ру',
      lang: 'ru' as Lang,
      image: ru,
    },
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
  }
}

export const ChangeLangDropdown: FC = () => {
  const locale = useLocale();
  const languageItems: Record<string, { image: { src: string }, title: string, short: string, lang: string }> = getLanguageItems();
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false)
    };

    document.addEventListener('click', handleClickOutside, true)
    return () => document.removeEventListener('click', handleClickOutside, true)
  }, [])

  return (
    <div ref={ref} className="flex gap-2 pt-5 ml-auto mb-auto relative z-70 overflow-visible">
      <div className={` gap-2 ${isOpen ? 'flex' : 'hidden'}`}>
        {
          Object.values(languageItems).map(({ image, title, lang }) => lang !== locale && (
            <a
              // href={getRelativeLocaleUrl(lang)}
              href="#"
              title={title}
              aria-label={title}
              key={lang}
            >
              <Image width={25} height={17} src={image.src} alt={`lang-${lang}`} />
            </a>
          ))
        }
      </div>
      <button onClick={() => setIsOpen(v => !v)}>
        <Image width={25} height={17} src={languageItems[locale].image.src || ''} alt={`lang-${locale}`} />
      </button>
    </div>
  )
}
