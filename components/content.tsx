import { ICON_SIZE } from "./global/icons";
import { LayoutDashboard } from "lucide-react";

const { sm } = ICON_SIZE;

const LABEL = {
  copyright: `Copyright © ${new Date().getFullYear()}. Title. All rights reserved.`,
  loading: "Mohon tunggu sebentar...",
  login: "Login berhasil!",
  logout: "Logout berhasil!",
};

// #region // * Menu
type Menu = {
  section: string;
  body: MenuBody[];
};

type MenuBody = {
  href: string;
  label: string;
  protected: boolean;
  icon?: React.ReactNode;
  isDisable?: boolean;
};

const globalMenu = {
  dashboard: {
    href: "/dashboard",
    label: "Dashboard",
    protected: false,
    icon: <LayoutDashboard size={sm} />,
  },
};

const MENU: Menu[] = [
  {
    section: "Home",
    body: [globalMenu.dashboard],
  },
];

// const GetMenu = (path: string) => {
//   const mergeMenu = [...menu];

//   const result = mergeMenu
//     .flatMap((menu) => menu.body)
//     .filter((item) => item.href === path);

//   return result.length > 0
//     ? result[0]
//     : { href: "Not Found!", label: "Not Found!", protected: false };
// };
// #endregion

export type { Menu };
export { LABEL, MENU };
