"use client";
import { Logo } from "@/common/assets/Logo";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC } from "react";
import { MenuItems } from "./components";
import { ChangeLangDropdown } from "./components/change-lang";

export const Header: FC = () => {
  const locale = useLocale();
  const path = usePathname();

  return (
    <nav className={"fixed top-0 w-full h-16 bg-teal-500/40 backdrop-blur-lg z-50 flex items-center gap-10 px-5 overflow-y-auto max-h-screen"}>
      <div className="flex items-center space-x-1">
        <Link href={`/${locale}/home`} className="scale-[55%] sm:scale-[100%]">
          <Logo />
        </Link>
      </div>

      <MenuItems />

      <ChangeLangDropdown />
    </nav>
  );
}