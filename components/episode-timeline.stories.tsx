import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  EpisodeTimeline,
  EpisodeTimelineItem,
} from "~/components/episode-timeline";

export default {
  title: "Components/EpisodeTimeline",
  component: EpisodeTimeline,
  args: {
    children: (
      <>
        <EpisodeTimelineItem
          label="オープニング - renderfmを始めた経緯"
          time={52}
        />
        <EpisodeTimelineItem label="元になったエピソードについて" time={172} />
        <EpisodeTimelineItem label="State of CSSとは" time={196} />
        <EpisodeTimelineItem label={'CSSに対する"苦情"'} time={264} />
        <EpisodeTimelineItem label="CSSは進化の途中" time={424} />
        <EpisodeTimelineItem
          label={'"Cascading" Style Sheets とは何なのか'}
          time={887}
        />
        <EpisodeTimelineItem
          label="昨今のWebアプリケーションはカスケーディングしたくない"
          time={1102}
        />
        <EpisodeTimelineItem
          label="caniuse.comなしでは生きていけない身体"
          time={1457}
        />
        <EpisodeTimelineItem label="Tailwind CSS" time={1780} />
        <EpisodeTimelineItem
          label="CSS in JSとStyle Compositionについて"
          time={2480}
        />
        <EpisodeTimelineItem label="Wrap-up" time={3174} />
      </>
    ),
  },
} as ComponentMeta<typeof EpisodeTimeline>;

export const Example: ComponentStory<typeof EpisodeTimeline> = (args) => (
  <EpisodeTimeline {...args} />
);

export const Item: ComponentStory<typeof EpisodeTimelineItem> = (args) => (
  <EpisodeTimelineItem {...args} />
);
Item.args = {
  label: "昨今のWebアプリケーションはカスケーディングしたくない",
  time: 1102,
};
