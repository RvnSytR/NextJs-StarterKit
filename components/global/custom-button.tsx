"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Fragment, type ReactNode } from "react";
import Link, { type LinkProps } from "next/link";

import { SignOutHandler } from "@/app/login/sign";

import { cn } from "@/lib/utils";
import { Delay } from "@/lib/utils";
import { label, path } from "../content";

import { toast } from "sonner";
import { CustomLoader } from "./icon";
import { Button, ButtonProps } from "../ui/button";
import { LogOut, RefreshCw } from "lucide-react";

// #region // * Types
type CustomType =
  | {
      customType: "loading" | "logout" | "refresh" | null | undefined;
    }
  | ({ customType: "nav" } & LinkProps &
      React.AnchorHTMLAttributes<HTMLAnchorElement>)
  | ({
      customType: "pulse";
      pulseColor?: string;
    } & (LinkProps | { href?: null | undefined }))
  | {
      customType: "scroll";
      elementid: string;
      offset?: number;
    };

export type CustomButtonProps = ButtonProps &
  CustomType & {
    load?: boolean;
    loadText?: string;
    iconPosition?: "left" | "right";
    icon?: ReactNode;
    hideTextOnMobile?: boolean;
    children?: ReactNode;
  };
// #endregion

export function CustomButton({
  customType,
  load,
  loadText,
  iconPosition = "left",
  icon,
  hideTextOnMobile,
  children,
  ...props
}: CustomButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { success, loading, button } = label;

  const ChildrenNode = ({
    customLoader,
  }: {
    customLoader?: ReactNode;
  }): ReactNode => {
    const loadTrigger = load ?? isLoading;
    const loader = customLoader ?? <CustomLoader customType="circle" />;
    const iconElement = loadTrigger ? loader : icon;
    const loadElement = loadText ?? children;

    return (
      <Fragment>
        {iconPosition === "left" && iconElement}
        <span
          className={cn(
            "group-data-[collapsible=icon]:hidden",
            hideTextOnMobile ? "group-data-[collapsible=icon]:hidden" : "",
          )}
        >
          {loadTrigger ? loadElement : children}
        </span>
        {iconPosition === "right" && iconElement}
      </Fragment>
    );
  };

  const LoadingButtonNode = ({
    children,
    ...loadingButtonProps
  }: ButtonProps & {
    children: ReactNode;
  }): ReactNode => {
    return (
      <Button
        type="button"
        onClick={() => setIsLoading(true)}
        disabled={load ?? isLoading}
        {...props}
        {...loadingButtonProps}
      >
        {children}
      </Button>
    );
  };

  switch (customType) {
    case "loading": {
      return (
        <LoadingButtonNode>
          <ChildrenNode />
        </LoadingButtonNode>
      );
    }

    case "refresh": {
      loadText = loading.refresh;
      icon = <RefreshCw />;
      return (
        <Button
          type="button"
          onClick={async () => {
            setIsLoading(true);
            await Delay(0.5);
            router.refresh();
            setIsLoading(false);
          }}
          disabled={isLoading}
          {...props}
        >
          <ChildrenNode customLoader={<RefreshCw className="animate-spin" />} />
        </Button>
      );
    }

    case "logout": {
      loadText = loading.logout;
      children = button.logout;
      icon = <LogOut />;

      return (
        <LoadingButtonNode
          onClick={async () => {
            setIsLoading(true);
            toast.promise(SignOutHandler(), {
              loading: loading.default,
              success: () => {
                router.push(path.login);
                return success.logout;
              },
              error: (e: Error) => {
                setIsLoading(false);
                return e.message;
              },
            });
          }}
        >
          <ChildrenNode />
        </LoadingButtonNode>
      );
    }

    case "nav": {
      const { ...linkProps } = props as Extract<
        CustomType,
        { customType: "nav" }
      >;

      return (
        <LoadingButtonNode asChild>
          <Link {...linkProps}>
            <ChildrenNode />
          </Link>
        </LoadingButtonNode>
      );
    }

    case "pulse": {
      const { className } = props;
      const {
        pulseColor = "#FACC15",
        href,
        ...linkProps
      } = props as Extract<CustomType, { customType: "pulse" }>;

      const PulseFragment = () => {
        return (
          <Fragment>
            <ChildrenNode />
            <div className="absolute size-full animate-pulse rounded-md" />
          </Fragment>
        );
      };

      return (
        <LoadingButtonNode
          style={
            {
              "--pulse-color": pulseColor,
            } as React.CSSProperties
          }
          {...props}
          className={cn("relative", className)}
          asChild={!!href}
        >
          {href ? (
            <Link href={href} {...linkProps}>
              <PulseFragment />
            </Link>
          ) : (
            <PulseFragment />
          )}
        </LoadingButtonNode>
      );
    }

    case "scroll": {
      const { elementid, offset } = props as Extract<
        CustomType,
        { customType: "scroll" }
      >;

      return (
        <Button
          type="button"
          onClick={() => {
            const element = document.getElementById(elementid);
            if (!element) return;
            window.scroll({ top: element.offsetTop - (offset ?? 0) });
          }}
          {...props}
        >
          <ChildrenNode />
        </Button>
      );
    }

    case null: {
      const { disabled, ...rest } = props;
      return (
        <Button {...rest} disabled={disabled || load}>
          <ChildrenNode />
        </Button>
      );
    }

    default: {
      return (
        <Button variant="destructive" disabled>
          Custom Button Undefined
        </Button>
      );
    }
  }
}
