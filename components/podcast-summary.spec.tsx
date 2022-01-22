import { render, screen } from "@testing-library/react";
import {
  PodcastSummary,
  PodcastSummaryProps,
} from "~/components/podcast-summary";

describe("<PodcastSummary>", () => {
  function setup(additionalProps?: Partial<PodcastSummaryProps>) {
    render(
      <PodcastSummary data-testid="podcast-summary" {...additionalProps} />
    );

    return {
      podcastSummary: () => screen.getByTestId("podcast-summary"),
    };
  }

  it("renders the podcast channel summary including several external links", () => {
    const { podcastSummary } = setup();

    expect(podcastSummary()).toMatchSnapshot();
  });
});
