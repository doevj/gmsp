import { FC } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/common/components';

const socials = [
  { src: '/media/svg/envelope.svg', label: 'Email', href: '#' },
  { src: '/media/svg/instagram.svg', label: 'Instagram', href: '#' },
  { src: '/media/svg/telegram.svg', label: 'Telegram', href: '#' },
  { src: '/media/svg/whatsapp.svg', label: 'WhatsApp', href: '#' },
];

const footerItems = [
  {
    label: {
      en: 'View Courses',
      es: 'Ver cursos',
      ru: 'Посмотреть курсы'
    },
    href: 'courses'
  },
  {
    label: {
      en: 'Contacts',
      es: 'Contactos',
      ru: 'Контакты'
    },
    href: 'contacts'
  },
  {
    label: {
      en: 'Schedule My Free Class',
      es: 'Programar mi clase gratuita',
      ru: 'Записаться на бесплатное занятие'
    },
    href: 'contacts'
  }
];
export const Footer: FC = () => {
  const locale = useLocale();
  const t = useTranslations('general')

  return (
    <footer className="flex bg-teal-500/90 items-start md:items-end w-full mx-auto p-5 min-h-[200px] justify-between flex-col md:flex-row gap-5">
      <div className='flex flex-col gap-3 my-auto'>
        {footerItems.map((item, index) => (
          <Link
            key={index}
            href={`/${locale}/${item.href}`}
            className='font-nunito uppercase text-white font-bold'
          >
            {item.label[locale as keyof typeof item.label] || item.label.en}
          </Link>
        ))}
      </div>

      <div className='ml-auto'>
        <Image src="/media/svg/logo-white.svg" alt="Logo" height={210} width={210} className='md:ml-auto' />
        <form action={sendMessage} className='flex flex-col sm:flex-row gap-5 items:start md:items-end'>
          <label htmlFor='email' className='flex flex-col gap-1 '>
            <span className='text-white'>
              {t('enterEmail') || 'Enter your email'}
            </span>
            <input required name="email" className='p-2 md:p-4 border-none min-w-[250px] text-xs w-[200px] rounded-lg' type="email" placeholder="johndoe@gmail.com" aria-label="Email input" />
          </label>
          <button type='submit' className='text-white py-2 px-3 rounded-lg font-semibold bg-teal-600 hover:scale-[101%] hover:bg-teal-800 transition'>
            {t('stayUpdated') || 'Stay updated'}
          </button>
        </form>
      </div>
    </footer>
  );
};

async function sendMessage(formData: FormData) {
  'use server';
  const email = formData.get('email');

  // Send email 
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/send-email`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, text: 'empty' }),
  })

  console.log('Form submitted:', { email });
}
