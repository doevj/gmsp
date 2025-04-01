'use client'
import { Lang } from "@/consts";
// import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import en from "./assets/uk.svg";
import ru from "./assets/ru.svg";
import es from "./assets/es.svg";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { removeLangPrefix } from "@/utils";

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
  const path = usePathname();

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
    <div ref={ref} className="flex gap-2 p-1 px-2 mt-3 ml-auto mb-auto relative z-70 overflow-visible border-2 border-teal-500 rounded-lg">
      <div className={` gap-2 ${isOpen ? 'flex' : 'hidden'}`}>
        {
          Object.values(languageItems).map(({ title, lang }) => lang !== locale && (
            <a
              href={path ? `/${lang}${removeLangPrefix(path)}` : '#'}
              title={title}
              aria-label={title}
              key={lang}
              className="relative"
            >
              <span className=" opacity-35 hover:opacity-95">
                {lang}
              </span>
              {/* <Image width={25} height={17} src={image.src} alt={`lang-${lang}`} className="opacity-35 hover:opacity-95" /> */}
            </a>
          ))
        }
      </div>
      <button onClick={() => setIsOpen(v => !v)} className="relative">
        {/* <Image width={25} height={17} src={languageItems[locale].image.src || ''} alt={`lang-${locale}`} className="hover:opacity-90" /> */}
        <span className="z-10 text-white">
          {locale}
        </span>
      </button>
    </div>
  )
}

