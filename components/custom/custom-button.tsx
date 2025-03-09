"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { label } from "@/lib/content";
import { cn, Delay } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState, type ReactNode } from "react";
import { CustomLoader } from "../icon";
import { Button, ButtonProps, buttonVariants } from "../ui/button";
import { sidebarMenuButtonVariants } from "../ui/sidebar";

// #region // * Types
type FilteredLinkProps = Omit<LinkProps, keyof ButtonProps | "href">;
type RequiredChildrenProps =
  | { text: string; icon?: ReactNode }
  | { text?: string; icon: ReactNode };

export type CustomButtonProps = Omit<ButtonProps, "children"> &
  FilteredLinkProps &
  RequiredChildrenProps & {
    href?: string | URL;
    iconPosition?: "left" | "right";
    loading?: boolean;
    onClickLoading?: boolean;
    inSidebar?: boolean;
    hideTextOnMobile?: boolean;
    customLoader?: ReactNode;
  };

type OptionalChildrenProps = Omit<
  CustomButtonProps,
  keyof RequiredChildrenProps
> & { text?: string; icon?: ReactNode };

// #endregion

export function CustomButton({
  text,
  icon,
  iconPosition = "left",
  loading = false,
  onClickLoading = false,
  inSidebar = false,
  hideTextOnMobile = false,
  customLoader = <CustomLoader customType="circle" />,
  href,
  type = "button",
  variant,
  asChild = false,
  disabled = false,
  size,
  className,
  onClick,
  ...props
}: CustomButtonProps) {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => setIsLoading(loading), [loading]);

  const ChildrenNode = () => {
    const iconNode = isLoading ? customLoader : icon;
    if (!text) return iconNode;

    return (
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
  };

  return (
    <Button
      type={type}
      variant={variant}
      asChild={asChild || !!href}
      disabled={disabled || isLoading}
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
      }}
      {...props}
    >
      {href ? (
        <Link href={href} {...(props as FilteredLinkProps)}>
          <ChildrenNode />
        </Link>
      ) : (
        <ChildrenNode />
      )}
    </Button>
  );
}

export function RefreshButton({
  text = label.button.refresh,
  icon = <CustomLoader customType="refresh" animate={false} />,
  customLoader = <CustomLoader customType="refresh" />,
  ...props
}: Omit<OptionalChildrenProps, "loading" | "onClick">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <CustomButton
      text={text}
      icon={icon}
      customLoader={customLoader}
      loading={isLoading}
      onClick={async () => {
        setIsLoading(true);
        await Delay(0.5);
        router.refresh();
        setIsLoading(false);
      }}
      {...props}
    />
  );
}

export function CopyButton({
  icon = <Copy />,
  customLoader = <Check />,
  value,
  ...props
}: Omit<OptionalChildrenProps, "loading" | "onClick"> & { value: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <CustomButton
      icon={icon}
      customLoader={customLoader}
      loading={isLoading}
      onClick={async () => {
        setIsLoading(true);
        navigator.clipboard.writeText(value);
        await Delay(1);
        setIsLoading(false);
      }}
      {...props}
    />
  );
}
