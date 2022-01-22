import { twMerge } from "tailwind-merge";
import { PlayerBar } from "~/components/player-bar";
import { useHotkeyEffect } from "~/hooks/use-hotkey-effect";
import { useAudioPlayer } from "use-audio-player";
import React from "react";

interface ConnectedPlayerBar {
  className?: string;
  style?: React.CSSProperties;
}

export const ConnectedPlayerBar: React.VFC<ConnectedPlayerBar> = ({
  className,
  ...props
}) => {
  const player = useAudioPlayer();

  useHotkeyEffect(
    "ArrowLeft",
    () => {
      if (!player.isPlayable) return;

      player.seek(-15);
    },
    [player]
  );

  useHotkeyEffect(
    "ArrowRight",
    () => {
      if (!player.isPlayable) return;

      player.seek(15);
    },
    [player]
  );

  useHotkeyEffect(
    " ",
    () => {
      if (!player.isPlayable) return;

      if (player.isPlaying) {
        player.pause();
      } else {
        player.play();
      }
    },
    [player]
  );

  return (
    <PlayerBar
      trackTitle={player.track?.title ?? ""}
      duration={player.duration}
      currentTime={player.currentTime}
      playing={player.isPlaying}
      durationLoaded={player.isDurationLoaded}
      playbackLoading={player.isPlaybackLoading}
      onPauseButtonClick={player.pause}
      onResumeButtonClick={player.play}
      onRewindButtonClick={React.useCallback(() => player.seek(-15), [player])}
      onForwardButtonClick={React.useCallback(() => player.seek(15), [player])}
      onSeek={(d) => player.seekTo(player.duration * d)}
      onCloseButtonClick={player.unload}
      className={twMerge(
        "fixed left-0 right-0 transition-all",
        player.track !== null
          ? "bottom-0"
          : "-bottom-40 pointer-fine:-bottom-24",
        className
      )}
      {...props}
    />
  );
};
