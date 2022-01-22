import { twMerge } from "tailwind-merge";
import * as React from "react";
import { LoadingIcon } from "~/components/icon";
import { primaryFocusRing } from "~/constants/style";

export type ButtonVariant = "primary";
export type ButtonSize = "base" | "sm" | "xs";

const DEFAULT_VARIANT: ButtonVariant = "primary";
const DEFAULT_SIZE: ButtonSize = "base";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  translucent?: boolean;
  loading?: boolean;
}

export const Button: React.VFC<ButtonProps> = ({
  variant = DEFAULT_VARIANT,
  size = DEFAULT_SIZE,
  loading = false,
  translucent = false,
  disabled,
  className,
  children,
  ...props
}) => {
  return (
    <button
      disabled={disabled || loading}
      className={twMerge(
        "inline-flex items-center rounded-md disabled:cursor-not-allowed transition-all",
        variant === "primary"
          ? translucent
            ? "bg-yellow-600/20 hover:bg-yellow-600/30 disabled:bg-yellow-600/10 text-yellow-600"
            : "bg-yellow-600 disabled:bg-yellow-600/50 text-white"
          : null,
        variant === "primary" ? primaryFocusRing : null,
        size === "base" ? "px-4 py-2 text-base" : null,
        size === "sm" ? "px-3 py-1.5 text-base" : null,
        size === "xs" ? "px-2 py-1 text-sm" : null,
        className
      )}
      {...props}
    >
      {loading ? (
        <LoadingIcon
          className={twMerge(
            size === "base" ? "w-5 h-5 -ml-1.5 mr-2" : null,
            size === "sm" ? "w-4 h-4 -ml-1 mr-1.5" : null,
            size === "xs" ? "w-3 h-3 mr-1" : null
          )}
        />
      ) : null}

      {children}
    </button>
  );
};
