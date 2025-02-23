import { FC } from "react";
import { MenuItems } from "./components";
import { Logo } from "@/common/assets/Logo";
import Link from "next/link";
import { useLocale } from "next-intl";

export const Header: FC = () => {
  const locale = useLocale();

  return (
    <nav className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center space-x-2">
        <Link href={`/${locale}/home`}>
          <Logo />
        </Link>
      </div>

      <MenuItems />
    </nav>
  );
}