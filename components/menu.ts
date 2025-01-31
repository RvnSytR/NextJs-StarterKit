import type { Role } from "@/server/db/schema";
import { type LucideIcon, LayoutDashboard, UserRound } from "lucide-react";
import { page, label } from "./content";

const path = {
  login: "/login",
  protected: "/dashboard",
  account: "/dashboard/account",
};

type MenuRole = Exclude<Role, "pending"> | "all";

type Menu = {
  section: string;
  body: MenuBody[];
};

type MenuBody = {
  href: string;
  label: string;
  role: MenuRole;
  icon?: LucideIcon;
  isDisable?: boolean;
};

const menu: Menu[] = [
  {
    section: "General",
    body: [
      {
        href: path.protected,
        label: "Dashboard",
        role: "all",
        icon: LayoutDashboard,
      },
      {
        href: `${path.protected}/account`,
        label: "Pengguna",
        role: "all",
        icon: UserRound,
      },
    ],
  },
];

function GetMenu(
  path: string,
  withoutIcon?: boolean,
): MenuBody | Omit<MenuBody, "icon"> | null {
  const allMenu = Object.values(menu).flatMap((item) => item.body);

  const result = allMenu
    .map((item) => {
      if (withoutIcon) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { icon, ...rest } = item;
        return rest;
      }
      return item;
    })
    .filter((item) => item.href === path);

  return result[0] ?? null;
}

function GetMenuByRole(role: MenuRole) {
  return menu
    .map((section) => {
      const filteredBody = section.body.filter(
        (item) => item.role === role || item.role === "all",
      );
      if (filteredBody.length) {
        return {
          section: section.section,
          body: filteredBody,
        } as Menu;
      } else return null;
    })
    .filter((section) => section !== null);
}

function GetCurrentPage(path: string, metadata?: boolean) {
  const currentPage = GetMenu(path)?.label;
  if (!currentPage) return label.error.protectedPath;
  return metadata ? page.metadata(currentPage) : currentPage;
}

export type { MenuRole };
export { path };
export { GetMenu, GetMenuByRole, GetCurrentPage };
