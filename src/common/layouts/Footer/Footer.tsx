import { FC } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Button } from '@/common/components';

const socials = [
  { src: '/media/svg/envelope.svg', label: 'Email', href: '#' },
  { src: '/media/svg/instagram.svg', label: 'Instagram', href: '#' },
  { src: '/media/svg/telegram.svg', label: 'Telegram', href: '#' },
  { src: '/media/svg/whatsapp.svg', label: 'WhatsApp', href: '#' },
];

export const Footer: FC = () => {
  const locale = useLocale();

  return (
    <footer className="flex bg-teal-500/90 items-start md:items-end w-full mx-auto p-5 min-h-[200px] justify-between flex-col md:flex-row gap-5">
      <div className='flex flex-col gap-3 my-auto'>
        <Link href={`/${locale}/courses`} className='font-nunito uppercase text-white font-bold'>view courses</Link>
        <Link href={`/${locale}/contacts`} className='font-nunito uppercase text-white font-bold'>contacts</Link>
        <Link href={`/${locale}/contacts`} className='font-nunito uppercase text-white font-bold'>schedule my free class</Link>
      </div>

      <div className='sm:ml-auto'>
        <Image src="/media/svg/logo-white.svg" alt="Logo" height={210} width={210} className='md:ml-auto' />
        <div className='flex flex-col sm:flex-row gap-5 items:start md:items-end'>
          <label htmlFor='email' className='flex flex-col gap-1 text-white'>
            Enter your email
            <input name="email" className='p-2 md:p-4 border-none min-w-[250px] text-xs w-[200px] rounded-lg' type="email" placeholder="johndoe@gmail.com" aria-label="Email input" />
          </label>
          <Button className='text-white bg-teal-600 hover:scale-[101%] hover:bg-teal-800 transition'>Stay updated</Button>
        </div>
      </div>
    </footer>
  );
}; 