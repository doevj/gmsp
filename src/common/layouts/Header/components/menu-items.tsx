'use client';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Button } from '@/common/components';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';

import './header.components.styles.css';

const menuItems = [
  { name: 'Courses', href: '/courses', id: 'courses' },
  { name: 'About', href: '/about', id: 'about' },
  { name: 'Contact', href: '/contacts', id: 'contact' },
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
            {item.name}
          </Button>
        </Link>
      ))}

      {children}
    </div>
  );
};
