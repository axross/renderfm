import * as React from "react";
import { useRemarkSync } from "react-remark";
import { twMerge } from "tailwind-merge";
import { TextAnchor } from "./clickable-text";

export interface MarkdownProps {
  markdown: string;
  className?: string;
  style?: React.CSSProperties;
}

export const Markdown: React.VFC<MarkdownProps> = ({
  markdown,
  className,
  ...props
}) => {
  const content = useRemarkSync(markdown, {
    rehypeReactOptions: { components: { a: TextAnchor } },
  });

  return (
    <div
      className={twMerge("prose dark:prose-invert prose-slate", className)}
      {...props}
    >
      {content}
    </div>
  );
};
