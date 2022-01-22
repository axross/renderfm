import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PodcastSummary } from "~/components/podcast-summary";

export default {
  title: "Components/PodcastSummary",
  component: PodcastSummary,
} as ComponentMeta<typeof PodcastSummary>;

export const Example: ComponentStory<typeof PodcastSummary> = (args) => (
  <PodcastSummary {...args} />
);
