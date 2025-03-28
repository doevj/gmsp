'use client';
import { FC, useEffect, useState } from "react";
import { Button } from "@/common/components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";

const menuItems = [
  { name: 'Courses', href: '/courses', id: 'courses' },
  { name: 'About', href: '/about', id: 'about' },
  { name: 'Contact', href: '/contact', id: 'contact' },
];

function getActiveMenuItem(pathname: string) {
  const menuItem = menuItems.find(item => pathname.includes(item.href));
  return menuItem ? menuItem.id : '';
}

export const MenuItems: FC = () => {
  const pathname = usePathname()
  const locale = useLocale();
  const [activeMenuItem, setActiveMenuItem] = useState(getActiveMenuItem(String(pathname)));

  useEffect(() => {
    if (pathname) setActiveMenuItem(getActiveMenuItem(pathname))
  }, [pathname]);

  return (
    <div className={"flex items-center space-x-4"}>
      {menuItems.map((item, index) => (
        <Link key={index} href={`/${locale}${item.href}`} >
          <Button variant={activeMenuItem === item.id ? 'active' : 'normal'} className="bg-opacity-70 hover:bg-opacity-100 text-white">
            {item.name}
          </Button>
        </Link>
      ))}
      <Link href={`/${locale}/checkout`} >
        <Button variant="trust" className="flex bg-opacity-70 hover:bg-opacity-100 text-gray-600 text-nowrap">
          Get classes
        </Button>
      </Link>
    </div>
  )
}
