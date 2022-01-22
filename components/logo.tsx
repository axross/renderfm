import { twMerge } from "tailwind-merge";

export interface FullLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FullLogo: React.VFC<FullLogoProps> = ({ className, ...props }) => {
  return (
    <div className={twMerge("flex items-end", className)} {...props}>
      <span className="shrink-0 text-slate-900 dark:text-slate-50 text-[42px] font-bold font-logo leading-8">
        render(
      </span>

      <Logo className="shrink-0" />

      <span className="shrink-0 text-slate-900 dark:text-slate-50 text-[42px] font-bold font-logo leading-8">
        )
      </span>
    </div>
  );
};

export interface LogoProps {
  className?: string;
  style?: React.CSSProperties;
}

export const Logo: React.VFC<LogoProps> = ({ className, ...props }) => {
  return (
    <span
      className={twMerge("relative block w-16 h-16 bg-[#f0db4f]", className)}
      {...props}
    >
      <span
        className="absolute inline-block -bottom-1 right-[1px] bg-logo-pattern bg-cover text-slate-900 text-[42px] font-bold font-logo tracking-tight leading-10 scale-x-90"
        style={{
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        <span className="uppercase">f</span>
        <span className="uppercase">m</span>
      </span>
    </span>
  );
};
