import { twMerge } from "tailwind-merge";
import * as React from "react";
import { IconProps } from "~/components/icon";
import { primaryFocusRing } from "~/constants/style";

export type ButtonVariant = "primary";
export type ButtonSize = "lg" | "base" | "sm" | "xs";

const DEFAULT_VARIANT: ButtonVariant = "primary";
const DEFAULT_SIZE: ButtonSize = "base";

export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  translucent?: boolean;
  children?: React.ReactElement<IconProps>;
}

export const IconButton: React.VFC<IconButtonProps> = ({
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  translucent,
  disabled,
  className,
  children,
  ...props
}) => {
  return (
    <button
      disabled={disabled}
      className={twMerge(
        "inline-flex items-center rounded-md disabled:cursor-not-allowed transition-all",
        variant === "primary"
          ? translucent
            ? "bg-yellow-600/20 hover:bg-yellow-600/30 disabled:bg-yellow-600/10 text-yellow-600"
            : "bg-yellow-600 disabled:bg-yellow-600/50 text-white"
          : null,
        variant === "primary" ? primaryFocusRing : null,
        size === "lg" ? "p-2" : null,
        size === "base" ? "p-2" : null,
        size === "sm" ? "p-1.5" : null,
        size === "xs" ? "p-1" : null,
        className
      )}
      {...props}
    >
      {children
        ? React.cloneElement(React.Children.only(children), {
            className: twMerge(
              size === "lg" ? "w-8 h-8" : null,
              size === "base" ? "w-6 h-6" : null,
              size === "sm" ? "w-5 h-5" : null,
              size === "xs" ? "w-4 h-4" : null,
              React.Children.only(children).props.className
            ),
          })
        : children}
    </button>
  );
};
