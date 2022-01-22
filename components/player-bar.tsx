import { twMerge } from "tailwind-merge";
import { Button } from "./button";
import {
  CrossIcon,
  FastForwardIcon,
  LoadingIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
} from "~/components/icon";
import { IconButton } from "~/components/icon-button";
import { SeekBar } from "~/components/seek-bar";

export interface PlayerBarProps {
  trackTitle: string;
  duration: number;
  currentTime: number;
  playing?: boolean;
  durationLoaded?: boolean;
  playbackLoading?: boolean;
  onResumeButtonClick?: () => void;
  onPauseButtonClick?: () => void;
  onRewindButtonClick?: () => void;
  onForwardButtonClick?: () => void;
  onCloseButtonClick?: () => void;
  onSeek?: (duration: number) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const PlayerBar: React.VFC<PlayerBarProps> = ({
  trackTitle,
  duration,
  currentTime,
  playing = false,
  durationLoaded = true,
  playbackLoading = false,
  onResumeButtonClick,
  onPauseButtonClick,
  onRewindButtonClick,
  onForwardButtonClick,
  onCloseButtonClick,
  onSeek,
  className,
  ...props
}) => {
  return (
    <div
      className={twMerge("bg-slate-900 dark:bg-zinc-100", className)}
      {...props}
    >
      <div className="relative grid grid-cols-[auto_1fr_auto] pointer-fine:grid-cols-[1fr_auto] grid-rows-[auto_auto_auto] pointer-fine:grid-rows-[auto_auto] gap-x-4 items-start px-4 pt-6 pb-4 pointer-fine:pb-6">
        <div
          className="row-start-1 col-start-1 pointer-fine:col-start-2 self-end text-slate-100 dark:text-zinc-900 font-semibold truncate select-none"
          data-testid="track-title"
        >
          {trackTitle}
        </div>

        <div className="row-start-1 col-start-2 pointer-fine:col-start-3 self-end pr-6 text-slate-500 dark:text-zinc-500 text-xs font-mono select-none">
          <span data-testid="current-time">
            {durationLoaded ? formatDuration(currentTime) : "??:??"}
          </span>

          {"/"}

          <span data-testid="duration">
            {durationLoaded ? formatDuration(duration) : "??:??"}
          </span>
        </div>

        <SeekBar
          disabled={!durationLoaded}
          value={durationLoaded ? currentTime / duration : 0}
          onChange={onSeek}
          className="row-start-2 col-span-2 h-3 pointer-fine:h-2 mt-4 pointer-fine:mt-2"
          data-testid="seek-bar"
        />

        <div className="col-start-1 row-start-3 pointer-fine:row-start-1 row-span-2 pointer-fine:row-span-2 pointer-fine:self-center flex items-center justify-center gap-x-6 mt-6 pointer-fine:mt-0">
          <Button
            translucent
            disabled={playbackLoading}
            onClick={onRewindButtonClick}
            aria-busy={playbackLoading}
            className="pointer-fine:hidden"
            data-testid="rewind-button"
          >
            <RewindIcon />

            <span className="text-sm">15s</span>
          </Button>

          <IconButton
            size="lg"
            disabled={playbackLoading}
            onClick={playing ? onPauseButtonClick : onResumeButtonClick}
            className="focus:ring-offset-yellow-900 dark:focus:ring-offset-yellow-100"
            aria-busy={playbackLoading ? "true" : undefined}
            aria-label={playing ? "Pause" : "Play"}
            data-testid="playback-button"
          >
            {playbackLoading ? (
              <LoadingIcon />
            ) : playing ? (
              <PauseIcon />
            ) : (
              <PlayIcon />
            )}
          </IconButton>

          <Button
            translucent
            disabled={playbackLoading}
            onClick={onForwardButtonClick}
            aria-busy={playbackLoading}
            className="pointer-fine:hidden"
            data-testid="forward-button"
          >
            <span className="text-sm">15s</span>

            <FastForwardIcon />
          </Button>
        </div>

        <IconButton
          size="xs"
          translucent
          onClick={onCloseButtonClick}
          className="absolute top-2 right-2"
          data-testid="close-button"
        >
          <CrossIcon />
        </IconButton>
      </div>
    </div>
  );
};

function formatDuration(duration: number): string {
  const minutePart = Math.floor(duration / 60);
  const secondPart = `${Math.floor(duration % 60)}`.padStart(2, "0");

  return `${minutePart}:${secondPart}`;
}
