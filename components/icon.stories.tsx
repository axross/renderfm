import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  AppleIcon,
  CalendarIcon,
  ClockIcon,
  CrossIcon,
  FastForwardIcon,
  FireIcon,
  LoadingIcon,
  PauseIcon,
  PlayIcon,
  PlayStoreIcon,
  RewindIcon,
  SpotifyIcon,
} from "~/components/icon";

export default {
  title: "Components/Icon",
  component: LoadingIcon,
  args: {
    variant: "primary",
    disabled: false,
    children: <ClockIcon />,
  },
} as ComponentMeta<typeof LoadingIcon>;

export const Example: ComponentStory<typeof LoadingIcon> = (args) => (
  <div className="flex flex-wrap gap-1">
    <AppleIcon {...args} />
    <CalendarIcon {...args} />
    <ClockIcon {...args} />
    <CrossIcon {...args} />
    <FastForwardIcon {...args} />
    <FireIcon {...args} />
    <PauseIcon {...args} />
    <PlayIcon {...args} />
    <PlayStoreIcon {...args} />
    <RewindIcon {...args} />
    <SpotifyIcon {...args} />
  </div>
);

export const Loading: ComponentStory<typeof LoadingIcon> = (args) => (
  <LoadingIcon {...args} />
);
