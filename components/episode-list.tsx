import { differenceInDays, format, formatDistanceToNow } from "date-fns";
import * as React from "react";
import { twMerge } from "tailwind-merge";
import { CalendarIcon, ClockIcon } from "~/components/icon";
import { Episode } from "~/models/episode";

export interface EpisodeListProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const EpisodeList: React.VFC<EpisodeListProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div className={twMerge("-mx-4 sm:-mx-6 -my-6", className)} {...props}>
      {children}
    </div>
  );
};

interface EpisodeListRowProps {
  episode: Pick<
    Episode,
    "title" | "duration" | "publishedAt" | "summaryPlainText"
  >;
  last?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const EpisodeListRow: React.VFC<EpisodeListRowProps> = ({
  episode,
  last = false,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge(
        "w-full pl-4 sm:pl-6 pr-2 sm:pr-4 py-4",
        last ? null : "border-b border-slate-200 dark:border-zinc-700",
        className
      )}
      {...props}
    >
      <div className="text-slate-900 dark:text-zinc-50 text-lg font-semibold">
        {episode.title}
      </div>

      <div className="flex gap-x-4 mt-1">
        <span className="flex items-center gap-x-1 text-slate-500 dark:text-zinc500">
          <ClockIcon className="w-4 h-4" />

          <span className="text-xs">
            {Math.floor(episode.duration / 60)} mins
          </span>
        </span>

        <span className="flex items-center gap-x-1 text-slate-500 dark:text-zinc500">
          <CalendarIcon className="w-4 h-4" />

          <span className="text-xs">
            {differenceInDays(new Date(episode.publishedAt), new Date()) > 30
              ? format(new Date(episode.publishedAt), "MMMM dd, yyyy")
              : formatDistanceToNow(new Date(episode.publishedAt), {
                  addSuffix: true,
                })}
          </span>
        </span>
      </div>

      <div className={"mt-2 text-sm line-clamp-2"}>
        {episode.summaryPlainText}
      </div>
    </div>
  );
};
