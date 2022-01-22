import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "~/components/button";
import { ConnectedPlayerBar } from "~/components/connected-player-bar";
import {
  AudioPlayerProvider,
  createBrowserAudioPlayer,
  useAudioPlayer,
} from "use-audio-player";

export default {
  title: "Connected Components/PlayerBar",
  component: ConnectedPlayerBar,
  decorators: [
    (Story) => {
      const player = createBrowserAudioPlayer();

      return (
        <AudioPlayerProvider player={player}>
          <Story />
        </AudioPlayerProvider>
      );
    },
  ],
} as ComponentMeta<typeof ConnectedPlayerBar>;

export const Example: ComponentStory<typeof ConnectedPlayerBar> = (args) => {
  const player = useAudioPlayer();

  return (
    <>
      <Button
        onClick={() => {
          player.load({
            title: "Some Fancy Music",
            src: "https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_5MG.mp3",
          });

          // eslint-disable-next-line storybook/await-interactions, storybook/context-in-play-function
          player.play();
        }}
      >
        Play Something
      </Button>

      <ConnectedPlayerBar {...args} />
    </>
  );
};
