import { Logo } from '@/common/assets/Logo';
import { ChangeLangDropdown } from '@/common/components';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { FC } from 'react';
import { ClassesBtn, MenuItems, RegisterZone } from './components';

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

      <RegisterZone />

      <div className="ml-auto sm:hidden" />
      <ChangeLangDropdown />
    </nav>
  );
};