import { iconSize } from "./global/icons";
import { LayoutDashboard } from "lucide-react";

const { sm } = iconSize;
const COPYRIGHT_LABEL = `Copyright © ${new Date().getFullYear()}. Project Title. All rights reserved.`;

// #region // * Menu Types
type MenuBody = {
  href: string;
  label: string;
  protected: boolean;
  icon?: React.ReactNode;
  isDisable?: boolean;
};

type Menu = {
  section: string;
  body: MenuBody[];
};

type GlobalMenu = "dashboard";
// #endregion

// #region // * Menu
const globalMenu: Record<GlobalMenu, MenuBody> = {
  dashboard: {
    href: "/dashboard",
    label: "Dashboard",
    protected: false,
    icon: <LayoutDashboard size={sm} />,
  },
};

const menu: Menu[] = [
  {
    section: "Home",
    body: [globalMenu.dashboard],
  },
];

const GetMenu = (path: string) => {
  const mergeMenu = [...menu];

  const result = mergeMenu
    .flatMap((menu) => menu.body)
    .filter((item) => item.href === path);

  return result.length > 0
    ? result[0]
    : { href: "Not Found!", label: "Not Found!", protected: false };
};
// #endregion

export type { Menu };
export { COPYRIGHT_LABEL, GetMenu, menu };
