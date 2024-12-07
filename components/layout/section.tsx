import { cn } from "@/lib/utils";

import { ICON_SIZE } from "../global/icon";
import { ThemeToggle } from "../global/theme-provider";
import {
  DynamicBreadcrumb,
  DynamicBreadcrumbProps,
} from "./dynamic-breadcrumb";

import { Separator } from "../ui/separator";
import { SidebarInset, SidebarTrigger } from "../ui/sidebar";
import { Hash } from "lucide-react";

export function Section({ children }: { children: React.ReactNode }) {
  return (
    <SidebarInset className="flex flex-col gap-y-4 p-4">
      {children}
    </SidebarInset>
  );
}

export function SectionHeader({ ...props }: DynamicBreadcrumbProps) {
  return (
    <header className="flex flex-col gap-2">
      <div className="flex items-center">
        <div className="over flex grow items-center gap-x-2">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DynamicBreadcrumb {...props} />
        </div>

        <ThemeToggle />
      </div>

      <Separator />
    </header>
  );
}

export function SectionTitle({
  withHash,
  className,
  children,
}: {
  withHash?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h5
      className={cn(
        "line-clamp-2 flex items-center gap-x-3 leading-tight",
        className,
      )}
    >
      {withHash && (
        <Hash
          size={ICON_SIZE.base}
          className="flex-none text-muted-foreground"
        />
      )}
      {children}
    </h5>
  );
}

export function SectionLabel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center p-20 text-muted-foreground",
        className,
      )}
    >
      <p className="text-center text-sm font-normal">{children}</p>
    </div>
  );
}
