import React from "react";
import { twMerge } from "tailwind-merge";
import { ClickableText } from "~/components/clickable-text";
import { Episode } from "~/models/episode";

export interface EpisodeTimelineProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const EpisodeTimeline: React.VFC<EpisodeTimelineProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <ul
      className={twMerge(
        "flex flex-col gap-y-1 list-disc list-inside",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
};

export interface EpisodeTimelineItemProps {
  label: Episode["timeline"][0][0];
  time: Episode["timeline"][0][1];
  onTimeClick?: (e: React.MouseEvent, time: Episode["timeline"][0][1]) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const EpisodeTimelineItem: React.VFC<EpisodeTimelineItemProps> = ({
  label,
  time,
  onTimeClick = () => undefined,
  className,
  ...props
}) => {
  return (
    <li
      className={twMerge(
        "marker:text-slate-400 dark:marker:text-zinc-600",
        className
      )}
      {...props}
    >
      <span data-testid="label">{label}</span>

      <span className="ml-1">
        [
        <ClickableText onClick={(e) => onTimeClick(e, time)} data-testid="time">
          {`${Math.floor(time / 60)}`.padStart(2, "0")}:
          {`${Math.floor(time % 60)}`.padStart(2, "0")}
        </ClickableText>
        ]
      </span>
    </li>
  );
};
