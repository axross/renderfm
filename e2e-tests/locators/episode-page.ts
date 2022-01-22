import { Page } from "@playwright/test";

export function getEpisodePageLocators(page: Page) {
  const episodeDetail = page.locator("[data-testid=episode-detail]");

  return {
    episodeDetail: {
      itself: episodeDetail,
      playButton: episodeDetail.locator("[data-testid=play-button]"),
      timelineItemTimeAt: (n: number) =>
        episodeDetail.locator(
          `[data-testid=episode-timeline] > [data-testid=item]:nth-child(${n}) [data-testid=time]`
        ),
    },
  };
}
