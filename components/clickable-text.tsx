import React from "react";
import { twMerge } from "tailwind-merge";
import { primaryFocusRing } from "~/constants/style";

const clickableTextCss = twMerge(
  primaryFocusRing,
  "rounded-sm text-yellow-600 dark:text-yellow-400 hover:underline"
);

export interface ClickableTextProps {
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const ClickableText: React.VFC<ClickableTextProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={twMerge(clickableTextCss, "cursor-pointer", className)}
      tabIndex={0}
      {...props}
    >
      {children}
    </span>
  );
};

export type TextAnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const TextAnchor: React.VFC<TextAnchorProps> = ({
  href,
  className,
  children,
  ...props
}) => {
  return (
    <a href={href} className={twMerge(clickableTextCss, className)} {...props}>
      {children}
    </a>
  );
};
