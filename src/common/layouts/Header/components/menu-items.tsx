'use client';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Button } from '@/common/components';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import './header.components.styles.css';

const menuItems = [
  { name: { en: 'Courses', es: "Classes", ru: "Курсы", }, href: '/courses', id: 'courses' },
  { name: { en: 'About', es: "Nosotros", ru: "О нас", }, href: '/about', id: 'about' },
  { name: { en: 'Contact', es: "Contactos", ru: "Контакты", }, href: '/contacts', id: 'contact' },
];

function getActiveMenuItem(pathname: string) {
  const menuItem = menuItems.find(item => pathname.includes(item.href));
  return menuItem ? menuItem.id : '';
}

export const MenuItems: FC<PropsWithChildren> = ({ children }) => {
  const pathname = usePathname();
  const locale = useLocale();
  const [activeMenuItem, setActiveMenuItem] = useState(getActiveMenuItem(String(pathname)));

  useEffect(() => {
    if (pathname) setActiveMenuItem(getActiveMenuItem(pathname));
  }, [pathname]);

  return (
    <div className="menu-items_container">
      {menuItems.map((item, index) => (
        <Link key={index} href={`/${locale}${item.href}`} >
          <Button variant={activeMenuItem === item.id ? 'active' : 'normal'} className="menu-items_item">
            {item.name[locale as 'en' | 'es' | 'ru'] || item.name.en}
          </Button>
        </Link>
      ))}

      {children}
    </div>
  );
};
