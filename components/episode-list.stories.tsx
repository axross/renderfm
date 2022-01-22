import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EpisodeList, EpisodeListRow } from "~/components/episode-list";

export default {
  title: "Components/EpisodeList",
  component: EpisodeList,
  subcomponents: { EpisodeListRow },
  args: {
    className: "w-96",
    children: (
      <>
        <EpisodeListRow
          episode={{
            publishedAt: "2022-01-01T00:00:00-0700",
            duration: 1000,
            title: "Lorem ipsum dolor sit amet",
            summaryPlainText:
              "Maecenas sed enim ut sem viverra aliquet eget sit amet. Mattis aliquam faucibus purus in massa tempor. Vitae ultricies leo integer malesuada.",
          }}
        />
        <EpisodeListRow
          episode={{
            publishedAt: "2021-01-01T00:00:00-0700",
            duration: 1000,
            title: "Ut enim",
            summaryPlainText:
              "ああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ",
          }}
        />
        <EpisodeListRow
          episode={{
            publishedAt: "2020-01-01T00:00:00-0700",
            duration: 1000,
            title:
              "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur",
            summaryPlainText: "Pellentesque.",
          }}
        />
      </>
    ),
  },
} as ComponentMeta<typeof EpisodeList>;

export const List: ComponentStory<typeof EpisodeList> = (args) => (
  <EpisodeList {...args} />
);

export const Row: ComponentStory<typeof EpisodeListRow> = (args) => (
  <EpisodeListRow {...args} />
);
Row.args = {
  episode: {
    publishedAt: "2022-01-01T00:00:00-0700",
    duration: 1000,
    title: "Lorem ipsum dolor sit amet",
    summaryPlainText:
      "Maecenas sed enim ut sem viverra aliquet eget sit amet. Mattis aliquam faucibus purus in massa tempor. Vitae ultricies leo integer malesuada.",
  },
};
