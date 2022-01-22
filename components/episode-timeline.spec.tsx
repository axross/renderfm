import { randNumber, randPhrase } from "@ngneat/falso";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  EpisodeTimeline,
  EpisodeTimelineItem,
  EpisodeTimelineItemProps,
  EpisodeTimelineProps,
} from "~/components/episode-timeline";

describe("<EpisodeTimeline>", () => {
  function setup(additionalProps?: Partial<EpisodeTimelineProps>) {
    render(
      <EpisodeTimeline data-testid="episode-timeline" {...additionalProps}>
        <EpisodeTimelineItem
          label={randPhrase()}
          time={randNumber({ max: 300 })}
          data-testid="item"
        />

        <EpisodeTimelineItem
          label={randPhrase()}
          time={randNumber({ min: 300, max: 600 })}
          data-testid="item"
        />

        <EpisodeTimelineItem
          label={randPhrase()}
          time={randNumber({ min: 600, max: 1000 })}
          data-testid="item"
        />
      </EpisodeTimeline>
    );

    const episodeTimeline = () => screen.getByTestId("episode-timeline");

    return {
      episodeTimeline,
      items: within(episodeTimeline()).getAllByTestId("item"),
    };
  }

  it("takes items as the children and renders them", () => {
    const { episodeTimeline } = setup();

    expect(episodeTimeline()).toMatchSnapshot();
  });
});

describe("<EpisodeTimelineItem>", () => {
  function setup(additionalProps?: Partial<EpisodeTimelineItemProps>) {
    const onTimeClick = jest.fn();

    render(
      <EpisodeTimelineItem
        label={randPhrase()}
        time={139}
        onTimeClick={onTimeClick}
        data-testid="episode-timeline-item"
        {...additionalProps}
      />
    );

    const episodeTimelineItem = () =>
      screen.getByTestId("episode-timeline-item");

    return {
      label: () => within(episodeTimelineItem()).getByTestId("label"),
      time: () => within(episodeTimelineItem()).getByTestId("time"),
      onTimeClick,
    };
  }

  it("renders the label and time", () => {
    const { label, time } = setup();

    expect(label()).toMatchSnapshot();
    expect(time()).toMatchSnapshot();
  });

  it("calls onTimeClick() when the user click the time", () => {
    const { time, onTimeClick } = setup();

    userEvent.click(time());

    expect(onTimeClick).toHaveBeenCalledTimes(1);
    expect(onTimeClick).toHaveBeenNthCalledWith(1, expect.anything(), 139);
  });
});
