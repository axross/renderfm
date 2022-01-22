import { test, expect } from "@playwright/test";
import { MOCK_EPISODE_LIST } from "~/services/mock-episode-repository.server";
import { getAudioPlayerLocators } from "../locators/audio-player";
import { getEpisodeListLocators } from "../locators/episode-list";
import { getEpisodePageLocators } from "../locators/episode-page";

const episode = MOCK_EPISODE_LIST[0];

test.beforeEach(async ({ page }) => {
  await page.goto("/");

  await test.step("navigating to the episode page", async () => {
    const { episodeListItemAt } = getEpisodeListLocators(page);

    await Promise.all([
      page.waitForNavigation({ url: `/episodes/${episode.id}` }),
      episodeListItemAt(1).click(),
    ]);
  });
});

test("playing/pausing/resuming the episode", async ({ page }) => {
  const { isAudioPlaying, playerBar } = getAudioPlayerLocators(page);
  const { episodeDetail } = getEpisodePageLocators(page);

  await test.step("playing the episode", async () => {
    await episodeDetail.playButton.click();

    await Promise.all([
      playerBar.trackTitleHasText(episode.title).waitFor(),
      playerBar.waitForPlaybackButtonLoading(),
    ]);

    expect(await isAudioPlaying()).toBe(true);
  });

  await test.step("pausing the episode", async () => {
    await playerBar.playbackButton.click();

    expect(await isAudioPlaying()).toBe(false);
  });

  await test.step("resuming the episode", async () => {
    await playerBar.playbackButton.click();

    expect(await isAudioPlaying()).toBe(true);
  });

  await test.step("pausing the episode by keyboard shortcut", async () => {
    await page.keyboard.press(" ");

    expect(await isAudioPlaying()).toBe(false);
  });

  await test.step("resuming the episode by keyboard shortcut", async () => {
    await page.keyboard.press(" ");

    expect(await isAudioPlaying()).toBe(true);
  });
});

test("seeking by the pointing device while playing the episode", async ({
  page,
}) => {
  const { audioCurrentTime, playerBar } = getAudioPlayerLocators(page);
  const { episodeDetail } = getEpisodePageLocators(page);

  await episodeDetail.playButton.click();
  await playerBar.waitForPlaybackButtonLoading();

  await test.step("performing mouse down at 50% of the seek bar", async () => {
    await playerBar.seekBar.mouseMoveToProgress(0.5);
    await page.mouse.down();
  });

  await test.step("move the mouse to 87% of the seek bar", async () => {
    await playerBar.seekBar.mouseMoveToProgress(0.87);
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(episode.duration * 0.87 - 14);
    expect(time).toBeLessThanOrEqual(episode.duration * 0.87 + 14);
  });

  await test.step("move the mouse to 100% of the seek bar", async () => {
    await playerBar.seekBar.mouseMoveToProgress(1);
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(episode.duration - 14);
    expect(time).toBeLessThanOrEqual(episode.duration + 14);
  });

  await test.step("move the mouse to 0% of the seek bar", async () => {
    await playerBar.seekBar.mouseMoveToProgress(0);
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(0);
    expect(time).toBeLessThanOrEqual(10);
  });

  await test.step("move the mouse and up at 50% of the seek bar", async () => {
    await playerBar.seekBar.mouseMoveToProgress(0.5);
    await page.mouse.up();
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(episode.duration * 0.5 - 14);
    expect(time).toBeLessThanOrEqual(episode.duration * 0.5 + 14);
  });
});

test("seeking by the pointing device while episode playback is paused", async ({
  page,
}) => {
  const { audioCurrentTime, playerBar } = getAudioPlayerLocators(page);
  const { episodeDetail } = getEpisodePageLocators(page);

  await episodeDetail.playButton.click();
  await playerBar.waitForPlaybackButtonLoading();
  await playerBar.playbackButton.click();

  await test.step("performing mouse down at 50% of the seek bar", async () => {
    await playerBar.seekBar.mouseMoveToProgress(0.5);
    await page.mouse.down();
  });

  await test.step("move the mouse to 87% of the seek bar", async () => {
    await playerBar.seekBar.mouseMoveToProgress(0.87);
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(episode.duration * 0.87 - 14);
    expect(time).toBeLessThanOrEqual(episode.duration * 0.87 + 14);
  });

  await test.step("move the mouse to 100% of the seek bar", async () => {
    await playerBar.seekBar.mouseMoveToProgress(1);
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(episode.duration - 14);
    expect(time).toBeLessThanOrEqual(episode.duration + 14);
  });

  await test.step("move the mouse to 0% of the seek bar", async () => {
    await playerBar.seekBar.mouseMoveToProgress(0);
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(0);
    expect(time).toBeLessThanOrEqual(10);
  });

  await test.step("move the mouse and up at 50% of the seek bar", async () => {
    await playerBar.seekBar.mouseMoveToProgress(0.5);
    await page.mouse.up();
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(episode.duration * 0.5 - 14);
    expect(time).toBeLessThanOrEqual(episode.duration * 0.5 + 14);
  });
});

test("seeking by keyboard shortcut while playing the episode", async ({
  page,
}) => {
  const { audioCurrentTime, playerBar } = getAudioPlayerLocators(page);
  const { episodeDetail } = getEpisodePageLocators(page);

  await episodeDetail.playButton.click();
  await playerBar.waitForPlaybackButtonLoading();

  await test.step("seeking by pressing the arrow right key", async () => {
    const startTime = await audioCurrentTime();

    await page.keyboard.press("ArrowRight");
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(startTime + 15 - 14);
    expect(time).toBeLessThanOrEqual(startTime + 15 + 14);
  });

  await test.step("seeking by pressing the arrow left key", async () => {
    const startTime = await audioCurrentTime();

    await page.keyboard.press("ArrowLeft");
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(startTime - 15 - 14);
    expect(time).toBeLessThanOrEqual(startTime - 15 + 14);
  });
});

test("seeking by keyboard shortcut while episode playback is paused", async ({
  page,
}) => {
  const { audioCurrentTime, playerBar } = getAudioPlayerLocators(page);
  const { episodeDetail } = getEpisodePageLocators(page);

  await episodeDetail.playButton.click();
  await playerBar.waitForPlaybackButtonLoading();
  await playerBar.playbackButton.click();

  await test.step("seeking by pressing the arrow right key", async () => {
    const startTime = await audioCurrentTime();

    await page.keyboard.press("ArrowRight");
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(startTime + 15 - 14);
    expect(time).toBeLessThanOrEqual(startTime + 15 + 14);
  });

  await test.step("seeking by pressing the arrow left key", async () => {
    const startTime = await audioCurrentTime();

    await page.keyboard.press("ArrowLeft");
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(startTime - 15 - 14);
    expect(time).toBeLessThanOrEqual(startTime - 15 + 14);
  });
});

test("playing from a certain time by clicking a timeline item", async ({
  page,
}) => {
  const { audioCurrentTime, isAudioPlaying, playerBar } =
    getAudioPlayerLocators(page);
  const { episodeDetail } = getEpisodePageLocators(page);

  await test.step("clicking the first item of the timeline", async () => {
    await episodeDetail.timelineItemTimeAt(1).click();
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(await isAudioPlaying()).toBe(true);
    expect(time).toBeGreaterThanOrEqual(episode.timeline[0][1] - 14);
    expect(time).toBeLessThanOrEqual(episode.timeline[0][1] + 14);
  });

  await test.step("clicking the 4th item of the timeline", async () => {
    await episodeDetail.timelineItemTimeAt(4).click();
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(episode.timeline[3][1] - 14);
    expect(time).toBeLessThanOrEqual(episode.timeline[3][1] + 14);
  });
});

test("seeking by the timeline while playing the episode", async ({ page }) => {
  const { audioCurrentTime, playerBar } = getAudioPlayerLocators(page);
  const { episodeDetail } = getEpisodePageLocators(page);

  await episodeDetail.playButton.click();
  await playerBar.waitForPlaybackButtonLoading();

  await test.step("clicking the first item of the timeline", async () => {
    await episodeDetail.timelineItemTimeAt(1).click();
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(episode.timeline[0][1] - 14);
    expect(time).toBeLessThanOrEqual(episode.timeline[0][1] + 14);
  });

  await test.step("clicking the 4th item of the timeline", async () => {
    await episodeDetail.timelineItemTimeAt(4).click();
    await playerBar.waitForPlaybackButtonLoading();

    const time = await audioCurrentTime();

    expect(time).toBeGreaterThanOrEqual(episode.timeline[3][1] - 14);
    expect(time).toBeLessThanOrEqual(episode.timeline[3][1] + 14);
  });
});
