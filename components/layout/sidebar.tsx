import Link from "next/link";
import { Fragment } from "react";

import type { Role } from "@/server/db/schema";

import { cn } from "@/lib/utils";
import { GetMenuByRole } from "../menu";
import { CustomButton } from "../custom/custom-button";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ExternalLink } from "lucide-react";

type SiderbarHeaderData = {
  username: string;
  email: string;
  role: Exclude<Role, "pending">;
};

export function Sidebar({
  children,
  ...data
}: {
  children: React.ReactNode;
} & SiderbarHeaderData) {
  return (
    <Sheet>
      <SheetContent
        side="left"
        className="flex flex-col gap-y-4 bg-sidebar text-sidebar-foreground"
      >
        <SheetHeader>
          <SidebarHeader data={data} />
        </SheetHeader>
        <SidebarContent role={data.role} className="h-5/6" />
        <SidebarFooter />
      </SheetContent>

      <main className="flex min-h-dvh bg-sidebar text-sidebar-foreground">
        <aside className="sticky left-0 top-0 hidden h-screen basis-1/6 flex-col gap-y-4 py-6 lg:flex">
          <SidebarHeader data={data} className="px-6" />
          <SidebarContent role={data.role} className="grow px-4" />
          <SidebarFooter className="px-6" />
        </aside>

        <div className="flex basis-full flex-col gap-y-4 overflow-hidden bg-background p-4 text-foreground shadow lg:m-2 lg:ml-0 lg:basis-5/6 lg:rounded-md">
          {children}
        </div>
      </main>
    </Sheet>
  );
}

function SidebarHeader({
  data,
  className,
}: {
  data: SiderbarHeaderData;
  className?: string;
}) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-x-3">
        <Avatar className="rounded-md">
          <AvatarFallback className="rounded-md">
            {data.username.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div className="text-ellipsis">
          <SheetTitle className="line-clamp-1 text-left text-base">
            {data.username}
          </SheetTitle>
          <SheetDescription className="line-clamp-1 text-left text-xs">
            {data.email}
          </SheetDescription>
        </div>
      </div>

      <Separator />
    </div>
  );
}

function SidebarContent({
  className,
  role,
}: {
  className?: string;
  role: Exclude<Role, "pending">;
}) {
  const menu = GetMenuByRole(role);
  return (
    <ScrollArea className={className}>
      <div className="flex flex-col gap-y-4 px-2">
        {menu.map((item, index) => (
          <Fragment key={index}>
            {index !== 0 && <Separator />}

            <div key={index} className="flex flex-col gap-y-1">
              <small className="font-medium text-muted-foreground">
                {item.section}
              </small>

              {item.body.map((itm, ind) => (
                <SheetClose key={ind} asChild>
                  {itm.isDisable ? (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full justify-start"
                      disabled
                    >
                      {itm.icon && <itm.icon />} {itm.label}
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={itm.href}>
                        {itm.icon && <itm.icon />} {itm.label}
                      </Link>
                    </Button>
                  )}
                </SheetClose>
              ))}
            </div>
          </Fragment>
        ))}
      </div>
    </ScrollArea>
  );
}

function SidebarFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("space-y-2", className)}>
      <Separator />

      <CustomButton
        customType="nav"
        load={false}
        href="https://omargroup.id/"
        size="sm"
        variant="link"
        target="_blank"
        icon={<ExternalLink />}
        className="w-full justify-start"
        text="Omar Group"
      />

      <CustomButton
        customType="logout"
        variant="outline_destructive"
        className="w-full"
      />
    </footer>
  );
}
