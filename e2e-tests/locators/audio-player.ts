import { Page } from "@playwright/test";

export function getAudioPlayerLocators(page: Page) {
  const playerBar = page.locator("[data-testid=player-bar]");
  const seekBar = playerBar.locator("[data-testid=seek-bar]");
  const audio = page.locator("audio[data-is-audio-player=true]");

  return {
    playerBar: {
      trackTitleHasText: (text: string) =>
        playerBar.locator(`[data-testid=track-title]:has-text("${text}")`),
      playbackButton: playerBar.locator("[data-testid=playback-button]"),
      waitForPlaybackButtonLoading: () =>
        Promise.all([
          page.waitForTimeout(500),
          playerBar
            .locator("[data-testid=playback-button]:not([aria-busy])")
            .waitFor(),
        ]),
      seekBar: {
        itself: seekBar,
        mouseMoveToProgress: async (percent: number) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const { x, y, width, height } = (await seekBar.boundingBox())!;

          await page.mouse.move(x + width * percent, y + height / 2);
        },
      },
    },
    isAudioPlaying: () =>
      audio.evaluate((node: HTMLAudioElement) => !node.paused),
    audioCurrentTime: () =>
      audio.evaluate((node: HTMLAudioElement) => node.currentTime),
  };
}
