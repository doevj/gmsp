import { Logo } from '@/common/assets/Logo';
import { ChangeLangDropdown } from '@/common/components';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import { FC } from 'react';
import { ClassesBtn, MenuItems, RegisterZone } from './components';

export const Header: FC = () => {
  const locale = useLocale();

  return (
    <nav className={styles.nav}>
      <Link href={`/${locale}/home`} className={styles.logo}>
        <Logo />
      </Link>

      <MenuItems >
        <ClassesBtn locale={locale} />
      </MenuItems>

      <RegisterZone />

      <div className="ml-auto sm:hidden" />
      <ChangeLangDropdown />
    </nav>
  );
};

const styles = {
  nav: "fixed top-0 w-full h-16 bg-teal-600/70 backdrop-blur-lg z-50 flex items-center md:gap-3 px-5 overflow-visible max-h-screen",
  logo: "items-center ml-[-2rem] sm:ml-0 hover:cursor-pointer scale-[0.5] sm:scale-[100%]"
}