import { useLocale } from 'next-intl';
import { FC } from 'react';
import Link from 'next/link';
import { Logo } from '@/common/assets/Logo';
import { Button, ChangeLangDropdown } from '@/common/components';
import { ClassesBtn, MenuItems } from './components';

export const Header: FC = () => {
  const locale = useLocale();

  return (
    <nav className={'fixed top-0 w-full h-16 bg-teal-600/70 backdrop-blur-lg z-50 flex items-center gap-3 px-5 overflow-visible max-h-screen'}>
      <div className="hidden md:flex items-center space-x-1">
        <Link href={`/${locale}/home`} className="scale-[70%] sm:scale-[100%]">
          <Logo />
        </Link>
      </div>

      <MenuItems >
        <ClassesBtn locale={locale} />
      </MenuItems>

      <div className='hidden sm:flex ml-auto items-center md:gap-2'>
        <Link href={`/${locale}/register`} className='scale-90 hover:scale-95 transition'>
          <Button variant='active' className='text-white w-[100px]'>
            Register
          </Button>
        </Link>
        <Link href={`/${locale}/login`} className=' scale-90 hover:scale-95 transition'>
          <Button variant='active' className='text-white w-[100px]'>
            Login
          </Button>
        </Link>
      </div>

      <div className="ml-auto sm:hidden" />
      <ChangeLangDropdown />
    </nav>
  );
};