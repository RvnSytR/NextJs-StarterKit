"use client";

import { SignOutHandler } from "@/app/login/sign";
import { useIsMobile } from "@/hooks/use-mobile";
import { label } from "@/lib/content";
import { path } from "@/lib/menu";
import { cn, Delay } from "@/lib/utils";
import { Check, Copy, LogOut } from "lucide-react";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { CustomLoader } from "../icon";
import { Button, ButtonProps, buttonVariants } from "../ui/button";
import { sidebarMenuButtonVariants } from "../ui/sidebar";

// #region // * Types
type OptionalChildrenProps = { text?: string; icon?: string };
type RequiredChildrenProps =
  | { text: string; icon?: ReactNode }
  | { text?: string; icon: ReactNode };

type CustomTypeProps =
  | ((
      | { customType: "logout" | "refresh" }
      | { customType: "copy"; copyValue: string }
    ) &
      OptionalChildrenProps)
  | ((
      | { customType?: never }
      | { customType: "scroll"; elementId: string; offset?: number }
      | ({ customType: "link" } & LinkProps &
          Omit<
            React.AnchorHTMLAttributes<HTMLAnchorElement>,
            keyof LinkProps & "children"
          >)
    ) &
      RequiredChildrenProps);

export type CustomButtonProps = Omit<ButtonProps, "children"> &
  CustomTypeProps & {
    iconPosition?: "left" | "right";
    loading?: boolean;
    inSidebar?: boolean;
    onClickLoading?: boolean;
    hideTextOnMobile?: boolean;
    customLoader?: ReactNode;
  };
// #endregion

export function CustomButton({
  customType,
  text,
  icon,
  iconPosition = "left",
  loading = false,
  inSidebar = false,
  onClickLoading = false,
  hideTextOnMobile = false,
  customLoader = (
    <CustomLoader
      customType={customType === "refresh" ? "refresh" : "circle"}
    />
  ),
  type = "button",
  size,
  variant,
  className,
  asChild = false,
  onClick,
  ...props
}: CustomButtonProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let buttonProps: typeof props = props;
  let action: () => Promise<void> | void = () => {};
  let withLink = false;

  useEffect(() => setIsLoading(loading), [loading]);

  switch (customType) {
    case "logout": {
      icon = <LogOut />;
      text = label.button.logout;
      variant = "outline_destructive";

      action = () => {
        toast.promise(SignOutHandler(), {
          loading: label.toast.loading.default,
          success: () => {
            router.push(path.login);
            return label.toast.success.logout;
          },
          error: (e: Error) => {
            setIsLoading(false);
            return e.message;
          },
        });
      };
      break;
    }

    case "refresh": {
      icon = icon ?? <CustomLoader customType="refresh" animate={false} />;
      text = text ?? label.button.refresh;

      action = async () => {
        setIsLoading(true);
        await Delay(0.5);
        router.refresh();
        setIsLoading(false);
      };

      break;
    }

    case "copy": {
      icon = icon ?? <Copy />;
      customLoader = <Check />;
      const { copyValue, ...rest } = props as Extract<
        CustomButtonProps,
        { customType: "copy" }
      >;

      buttonProps = rest;
      action = async () => {
        setIsLoading(true);
        navigator.clipboard.writeText(copyValue);
        await Delay(1);
        setIsLoading(false);
      };

      break;
    }

    case "scroll": {
      const {
        elementId,
        offset = 80,
        ...rest
      } = props as Extract<CustomButtonProps, { customType: "scroll" }>;

      buttonProps = rest;
      action = async () => {
        const element = document.getElementById(elementId);
        if (!element) return;
        window.scroll({ top: element.offsetTop - offset });
      };

      break;
    }

    case "link": {
      withLink = true;
      asChild = true;
      break;
    }
  }

  const ButtonNode = ({ children }: { children: ReactNode }) => {
    return (
      <Button
        type={type}
        variant={variant}
        disabled={isLoading}
        size={
          !text || (hideTextOnMobile && isMobile)
            ? size === "lg"
              ? "iconlg"
              : size === "sm"
                ? "iconsm"
                : "icon"
            : size
        }
        className={cn(
          "shrink-0 truncate",
          inSidebar &&
            (sidebarMenuButtonVariants({
              size:
                size === "iconlg" ? "lg" : size === "iconsm" ? "sm" : "default",
            }),
            buttonVariants({ variant: variant })),
          className,
        )}
        onClick={async (e) => {
          if (onClickLoading) setTimeout(() => setIsLoading(true), 0);
          if (onClick) onClick(e);
          await action();
        }}
        asChild={asChild}
        {...buttonProps}
      >
        {children}
      </Button>
    );
  };

  const ChildrenNode = () => {
    const iconNode = isLoading ? customLoader : icon;
    if (!text) return iconNode;

    const node = (
      <Fragment>
        {iconPosition === "left" && iconNode}
        <span
          className={cn(
            hideTextOnMobile && "hidden md:flex",
            "group-data-[collapsible=icon]:hidden",
          )}
        >
          {text}
        </span>
        {iconPosition === "right" && iconNode}
      </Fragment>
    );

    return node;
  };

  return (
    <ButtonNode>
      {withLink ? (
        <Link {...(props as LinkProps)}>
          <ChildrenNode />
        </Link>
      ) : (
        <ChildrenNode />
      )}
    </ButtonNode>
  );
}
