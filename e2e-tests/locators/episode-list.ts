import { Page } from "@playwright/test";

export function getEpisodeListLocators(page: Page) {
  const episodeList = page.locator("[data-testid=episode-list]");

  return {
    episodeList,
    episodeListItemAt: (n: number) =>
      episodeList.locator(`[data-testid=item]:nth-child(${n}) a`),
  };
}
