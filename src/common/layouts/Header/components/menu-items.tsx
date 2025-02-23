'use client';
import { FC, useEffect, useState } from "react";
import { Button, Loading } from "@/common/components";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLocale } from "next-intl";

const menuItems = [
  { name: 'Home', href: '/', id: 'home' },
  // { name: 'About', href: '/about', id: 'about' },
];

function getActiveMenuItem(pathname: string) {
  const menuItem = menuItems.find(item => item.href.includes(pathname));
  return menuItem ? menuItem.id : 'home';
}

export const MenuItems: FC = () => {
  const pathname = usePathname()
  const locale = useLocale();
  const [activeMenuItem, setActiveMenuItem] = useState(getActiveMenuItem(pathname));

  useEffect(() => {
    if (pathname) setActiveMenuItem(getActiveMenuItem(pathname))
  }, [pathname]);

  return (
    <div className="flex items-center space-x-4 text-gray-800">

      {menuItems.map((item, index) => (
        <Link key={index} href={`/${locale}${item.href}`} >
          <Button variant={activeMenuItem === item.id ? 'active' : 'normal'} className="bg-opacity-70 hover:bg-opacity-100">
            {item.name}
          </Button>
        </Link>
      ))}
      <Link href={`/${locale}/checkout`} >
        <Button variant="trust" className="flex bg-opacity-70 hover:bg-opacity-100">
          Get classes
        </Button>
      </Link>
    </div>
  )
}
