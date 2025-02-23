import { FC } from "react";
import { MenuItems } from "./components";

export const Header: FC = () => {
  return (
    <nav className="flex items-center justify-between p-4 bg-white">
      <div className="flex items-center space-x-2">
        GRAMA SPANISH
      </div>

      <MenuItems />
    </nav>
  );
}