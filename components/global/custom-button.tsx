"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { useState } from "react";

import { LogoutHandler } from "@/app/login/sign";
import { ClientRedirect, ClientRevalidatePath } from "@/server/action";
import { Delay } from "@/lib/helper";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { LABEL } from "../content";
import { CustomLoader } from "./icons";

import { Button, ButtonProps } from "../ui/button";
import { RefreshCw } from "lucide-react";

type CustomButtonProps = ButtonProps & {
  loadText?: string;
  loadPosition?: "left" | "right";
  loadClassName?: string;
  children: React.ReactNode;
  data:
    | {
        customType: "loading" | "logout" | null | undefined;
      }
    | ({
        customType: "nav";
      } & LinkProps)
    | {
        customType: "revalidate";
        path: string;
        type?: "layout" | "page";
      }
    | {
        customType: "scroll";
        elementId: string;
        offset?: number;
      };
};

export function CustomButton({
  data,
  loadClassName,
  loadText,
  loadPosition = "left",
  children,
  ...props
}: CustomButtonProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const { customType } = data;

  const LoaderNode = (): React.ReactNode => {
    const loader = <CustomLoader customType="circle" />;

    return (
      <div className={cn("flex items-center gap-x-2", loadClassName)}>
        {loadPosition == "left" && loader}
        {loadText}
        {loadPosition == "right" && loader}
      </div>
    );
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

    case "logout":
      return (
        <Button
          type="button"
          onClick={async () => {
            setLoading(true);
            toast.promise(LogoutHandler(), {
              loading: LABEL.loading,
              success: () => {
                ClientRedirect("/login");
                return LABEL.logout;
              },
              error: (e: Error) => {
                setLoading(false);
                return e.message;
              },
            });
          }}
          disabled={loading}
          {...props}
        >
          {children}
        </Button>
      );

    case "nav":
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { customType, ...linkProps } = data;
      return (
        <Button
          type="button"
          onClick={() => setLoading(true)}
          disabled={loading}
          asChild
          {...props}
        >
          <Link {...linkProps}>{loading ? <LoaderNode /> : children}</Link>
        </Button>
      );

    case "revalidate":
      return (
        <Button
          type="button"
          onClick={async () => {
            setLoading(true);
            ClientRevalidatePath(data.path, data.type);
            await Delay(0.6);
            setLoading(false);
          }}
          className="gap-x-2"
          disabled={loading}
          {...props}
        >
          <RefreshCw className={loading ? "animate-spin" : ""} />
          {loading ? (loadText ?? "Revalidating...") : children}
        </Button>
      );

    case "scroll":
      return (
        <Button
          type="button"
          onClick={() => {
            const element = document.getElementById(data.elementId);
            if (!element) return;
            window.scroll({ top: element.offsetTop - (data.offset ?? 0) });
          }}
          {...props}
        >
          {loading ? <LoaderNode /> : children}
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
