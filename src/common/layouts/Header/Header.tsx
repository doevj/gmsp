import { FC } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Logo } from "@/common/assets/Logo";
import { ChangeLangDropdown } from "@/common/components";
import { ClassesBtn, MenuItems, RegisterZone } from "./components";
import { getCurrentUser } from "@/lib/getCurrentUser";

import "./header.styles.css"

export const Header: FC = () => {
  const locale = useLocale();

  return (
    <nav className="header_nav">
      <Link href={`/${locale}/home`} className="header_logo">
        <Logo />
      </Link>

      <MenuItems>
        {/* <ClassesBtn locale={locale} /> */}
      </MenuItems>

      {/* <RegisterZone /> */}

      <div className="mr-auto" />
      <div className="ml-auto sm:hidden" />
      <ChangeLangDropdown />
    </nav>
  );
};