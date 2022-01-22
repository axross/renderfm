import { twMerge } from "tailwind-merge";
import { TextAnchor } from "./clickable-text";

export interface FooterProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Footer: React.VFC<FooterProps> = ({ className, ...props }) => {
  return (
    <footer className={twMerge("py-8 px-4", className)} {...props}>
      <div className="text-slate-500 dark:text-zinc-500 text-sm text-center">
        {`©️ 2021-${new Date().getFullYear()} `}

        <TextAnchor href="https://twitter.com/van_sf_engineer">
          @yuya
        </TextAnchor>

        {" & "}

        <TextAnchor href="https://twitter.com/axross_">@kohei</TextAnchor>

        {"."}
      </div>
    </footer>
  );
};
