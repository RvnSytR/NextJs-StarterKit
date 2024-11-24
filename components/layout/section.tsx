import { cn } from "@/lib/utils";

import { ICON_SIZE } from "../global/icons";
import { Hash } from "lucide-react";

export function Hero({ children }: { children: React.ReactNode }) {
  return <h1 className="text-center">{children}</h1>;
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
