"use client";

import Link from "next/link";
import { Fragment } from "react";
import type { Session } from "next-auth";

import { type MenuRole, GetMenuByRole } from "../content";
import { CustomButton } from "@/components/global/custom-button";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink } from "lucide-react";

export function AppSidebar({
  session,
  ...props
}: { session: Session } & React.ComponentProps<typeof Sidebar>) {
  const { username, email, role } = session.user;

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="group-data-[collapsible=icon]:hover:bg-sidebar"
        >
          <Avatar className="size-8 rounded">
            <AvatarFallback className="rounded">
              {username.slice(0, 2)}
            </AvatarFallback>
          </Avatar>
          <div className="flex grow flex-col justify-center truncate text-left text-sm leading-tight">
            <span className="font-semibold">{username}</span>
            <span className="text-xs">{email}</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>

      <SidebarContent>
        {role !== "pending" && <SidebarNavMenu role={role} />}
      </SidebarContent>

      <SidebarFooter>
        <CustomButton
          customType="nav"
          href="/"
          size="sm"
          variant="link"
          className="justify-start"
          load={false}
          icon={<ExternalLink />}
        >
          Something
        </CustomButton>

        <CustomButton customType="logout" variant="outline_destructive" />
      </SidebarFooter>
    </Sidebar>
  );
}

export function SidebarNavMenu({ role }: { role: MenuRole }) {
  const menu = GetMenuByRole(role);

  return menu.map((item, index) => (
    <Fragment key={index}>
      <SidebarSeparator />

      <SidebarGroup>
        <SidebarGroupLabel>{item.section}</SidebarGroupLabel>
        <SidebarMenu>
          {item.body.map((itm, ind) => (
            <SidebarMenuItem key={ind}>
              <SidebarMenuButton
                tooltip={itm.label}
                disabled={itm.isDisable}
                asChild
              >
                <Link href={itm.href}>
                  {itm.icon && <itm.icon />}
                  <span className="transition group-data-[collapsible=icon]:hidden">
                    {itm.label}
                  </span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    </Fragment>
  ));
}
