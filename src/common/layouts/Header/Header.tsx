"use client";
import { FC } from "react";
import { usePathname } from "next/navigation";
import { MenuItems } from "./components";
import { Logo } from "@/common/assets/Logo";
import Link from "next/link";
import { useLocale } from "next-intl";

export const Header: FC = () => {
  const locale = useLocale();
  const path = usePathname();

  console.log({ path })

  return (
    <nav className={`flex items-center justify-between p-4 ${path?.includes('about') ? 'bg-amber-100' : 'bg-white'}`}>
      <div className="flex items-center space-x-1">
        <Link href={`/${locale}/home`} className="scale-[55%] sm:scale-[100%]">
          <Logo />
        </Link>
      </div>

      <MenuItems />
    </nav>
  );
}