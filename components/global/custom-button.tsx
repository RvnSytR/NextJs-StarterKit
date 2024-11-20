"use client";

import React from "react";
import Link from "next/link";
import { useState } from "react";

import { LogoutHandler } from "@/app/login/sign";
import { ClientRedirect, ClientRevalidatePath } from "@/server/action";
import { Delay } from "@/lib/helper";

import { toast } from "sonner";
import { LABEL } from "../content";
import { CustomLoader, ICON_SIZE } from "./icons";

import { Button, ButtonProps } from "../ui/button";
import { RefreshCw } from "lucide-react";

type CustomButtonProps = ButtonProps & {
  customType:
    | "loading"
    | "nav"
    | "revalidate"
    | "scroll"
    | "logout"
    | null
    | undefined;
  href?: string;
  offset?: number;
  loadText?: string;
  loadPosition?: "left" | "right";
  children: React.ReactNode;
};

export function CustomButton({
  customType,
  href,
  loadText,
  loadPosition,
  offset,
  children,
  ...props
}: CustomButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { size } = props;
  if (customType === "logout") loadText = "Logging Out...";

  const LoaderNode = (): React.ReactNode => {
    const lnPos = loadPosition ?? "left";
    const { sm, base, lg } = ICON_SIZE;

    const lnICON_SIZE: number =
      size === "lg" ? lg : size === "sm" || size === "iconsm" ? sm : base;

    return (
      <div className="flex items-center gap-x-2">
        {lnPos == "left" && (
          <CustomLoader
            customType="circle"
            size={lnICON_SIZE}
            strokeWidth={size === "lg" ? 3 : 2}
          />
        )}
        {loadText}
        {lnPos == "right" && (
          <CustomLoader
            customType="circle"
            size={lnICON_SIZE}
            strokeWidth={size === "lg" ? 3 : 2}
          />
        )}
      </div>
    );
  };

  const RequiredNode = ({ req }: { req: string[] }): React.ReactNode => {
    return (
      <div className="rounded border border-destructive p-2">
        <p>Custom Button of this type must have these property:</p>

        <ol className="flex list-inside list-decimal flex-col">
          {req.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      </div>
    );
  };

  const logoutHandler = async () => {
    setLoading(true);
    toast.promise(LogoutHandler(), {
      loading: LABEL.loading,
      success: () => {
        ClientRedirect("/login");
        return LABEL.logout;
      },
      error: (e: Error) => e.message,
    });
  };

  switch (customType) {
    case "loading":
      return (
        <Button
          type="button"
          onClick={() => setLoading(true)}
          disabled={loading}
          {...props}
        >
          {loading ? <LoaderNode /> : children}
        </Button>
      );

    case "nav":
      return !href ? (
        <RequiredNode req={["href"]} />
      ) : (
        <Link href={href} className="w-fit">
          <Button
            type="button"
            onClick={() => setLoading(true)}
            disabled={loading}
            {...props}
          >
            {loading ? <LoaderNode /> : children}
          </Button>
        </Link>
      );

    case "revalidate":
      return !href ? (
        <RequiredNode req={["href as Path"]} />
      ) : (
        <Button
          type="button"
          onClick={async () => {
            setLoading(true);
            ClientRevalidatePath(href);
            await Delay(0.5);
            setLoading(false);
          }}
          className="gap-x-2"
          disabled={loading}
          {...props}
        >
          <RefreshCw
            size={ICON_SIZE.base}
            className={loading ? "animate-spin" : ""}
          />
          {loading ? (loadText ?? "Revalidating...") : children}
        </Button>
      );

    case "scroll":
      return !href ? (
        <RequiredNode req={["href"]} />
      ) : (
        <Button
          type="button"
          onClick={() => {
            const element = document.getElementById(href);
            if (!element) return;
            window.scroll({ top: element.offsetTop - (offset ?? 0) });
          }}
          {...props}
        >
          {loading ? <LoaderNode /> : children}
        </Button>
      );

    case "logout":
      return (
        <Button
          type="button"
          onClick={logoutHandler}
          disabled={loading}
          {...props}
        >
          {children}
        </Button>
      );

    case null:
      return <Button {...props}>{children}</Button>;

    default:
      return (
        <Button variant="destructive" disabled>
          Custom Button Undefined
        </Button>
      );
  }
}
