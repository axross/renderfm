import {
  randNumber,
  randPastDate,
  randPhrase,
  randSentence,
} from "@ngneat/falso";
import { render, screen } from "@testing-library/react";
import {
  EpisodeList,
  EpisodeListProps,
  EpisodeListRow,
} from "~/components/episode-list";

describe("<EpisodeList>", () => {
  function setup(additionalProps?: Partial<EpisodeListProps>) {
    render(
      <EpisodeList data-testid="episode-list" {...additionalProps}>
        <EpisodeListRow
          episode={{
            title: randPhrase(),
            duration: randNumber(),
            publishedAt: randPastDate().toISOString(),
            summaryPlainText: randSentence(),
          }}
          data-testid="row"
        />
        <EpisodeListRow
          episode={{
            title: randPhrase(),
            duration: randNumber(),
            publishedAt: randPastDate().toISOString(),
            summaryPlainText: randSentence(),
          }}
          data-testid="row"
        />
        <EpisodeListRow
          episode={{
            title: randPhrase(),
            duration: randNumber(),
            publishedAt: randPastDate().toISOString(),
            summaryPlainText: randSentence(),
          }}
          data-testid="row"
        />
      </EpisodeList>
    );

    return {
      episodeList: () => screen.getByTestId("episode-list"),
    };
  }

  it("takes rows as the children and renders them", () => {
    const { episodeList } = setup();

    expect(episodeList()).toMatchSnapshot();
  });
});
