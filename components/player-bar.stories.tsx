import { ComponentStory, ComponentMeta } from "@storybook/react";
import * as React from "react";
import { PlayerBar } from "~/components/player-bar";

export default {
  title: "Components/PlayerBar",
  component: PlayerBar,
  args: {
    trackTitle:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    duration: 1234,
    currentTime: 567,
    playing: false,
    className: "w-96",
  },
} as ComponentMeta<typeof PlayerBar>;

export const Paused: ComponentStory<typeof PlayerBar> = (args) => (
  <PlayerBar {...args} />
);

export const Playing: ComponentStory<typeof PlayerBar> = (args) => {
  const [currentTime, setCurrentTime] = React.useState(args.currentTime);

  React.useEffect(() => {
    const intervalId = globalThis.setInterval(() => {
      setCurrentTime((currentTime) => Math.min(currentTime + 3, args.duration));
    }, 25);

    return () => globalThis.clearInterval(intervalId);
  }, [args.duration]);

  return (
    <PlayerBar
      {...args}
      currentTime={currentTime}
      onSeek={(v) => setCurrentTime(args.duration * v)}
    />
  );
};
Playing.args = {
  playing: true,
};

export const PlaybackLoading = Paused.bind({});
PlaybackLoading.args = {
  playbackLoading: true,
};
