// eslint-disable-next-line no-var
var MockSeekBar: jest.Mock;
jest.mock("~/components/seek-bar", () => {
  MockSeekBar = jest.fn();

  return {
    SeekBar: MockSeekBar,
  };
});

import { randNumber, randPhrase } from "@ngneat/falso";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PlayerBar, PlayerBarProps } from "~/components/player-bar";
import type { SeekBarProps } from "~/components/seek-bar";

describe("<PlayerBar>", () => {
  function setup(additionalProps?: Partial<PlayerBarProps>) {
    const onResumeButtonClick = jest.fn();
    const onPauseButtonClick = jest.fn();
    const onRewindButtonClick = jest.fn();
    const onForwardButtonClick = jest.fn();
    const onCloseButtonClick = jest.fn();
    const onSeek = jest.fn();

    render(
      <PlayerBar
        trackTitle={randPhrase()}
        duration={randNumber({ min: 500, max: 1000 })}
        currentTime={randNumber({ min: 300, max: 500 })}
        onResumeButtonClick={onResumeButtonClick}
        onPauseButtonClick={onPauseButtonClick}
        onRewindButtonClick={onRewindButtonClick}
        onForwardButtonClick={onForwardButtonClick}
        onCloseButtonClick={onCloseButtonClick}
        onSeek={onSeek}
        data-testid="player-bar"
        {...additionalProps}
      />
    );

    const playerBar = () => screen.getByTestId("player-bar");
    const playbackButton = () =>
      within(playerBar()).getByTestId("playback-button");
    const rewindButton = () => within(playerBar()).getByTestId("rewind-button");
    const forwardButton = () =>
      within(playerBar()).getByTestId("forward-button");
    const closeButton = () => within(playerBar()).getByTestId("close-button");

    return {
      playerBar,
      trackTitle: () => within(playerBar()).getByTestId("track-title"),
      played: () => within(playerBar()).getByTestId("current-time"),
      duration: () => within(playerBar()).getByTestId("duration"),
      playbackButton,
      rewindButton,
      forwardButton,
      closeButton,
      seekBar: () => within(playerBar()).getByTestId("seek-bar"),
      onResumeButtonClick,
      onPauseButtonClick,
      onRewindButtonClick,
      onForwardButtonClick,
      onCloseButtonClick,
      onSeek,
      clickPlaybackButton: () => {
        userEvent.click(playbackButton());
      },
      clickRewindButton: () => {
        userEvent.click(rewindButton());
      },
      clickForwardButton: () => {
        userEvent.click(forwardButton());
      },
      clickCloseButton: () => {
        userEvent.click(closeButton());
      },
      emitSeekBarOnChange: (
        value: Parameters<Required<SeekBarProps>["onChange"]>[0]
      ) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        seekBarOnChange!(value);
      },
    };
  }

  const setupPlaying: typeof setup = (additionalProps) =>
    setup({ ...additionalProps, playing: true });

  const setupPlaybackLoading: typeof setup = (additionalProps) =>
    setup({ ...additionalProps, playbackLoading: true });

  let seekBarOnChange: SeekBarProps["onChange"];

  beforeEach(() => {
    MockSeekBar.mockImplementation((props) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      seekBarOnChange = props.onChange;

      return <span data-mockfor="SeekBar" {...props} />;
    });
  });

  it("renders the player bar that displays episode title, duration and several controls", () => {
    const {
      trackTitle,
      played,
      duration,
      rewindButton,
      forwardButton,
      closeButton,
      seekBar,
    } = setup();

    expect(trackTitle()).toMatchSnapshot();
    expect(played()).toMatchSnapshot();
    expect(duration()).toMatchSnapshot();
    expect(rewindButton()).toMatchSnapshot();
    expect(forwardButton()).toMatchSnapshot();
    expect(closeButton()).toMatchSnapshot();
    expect(seekBar()).toMatchSnapshot();
  });

  it("renders the player bar that contains play button", () => {
    const { playbackButton } = setup();

    expect(playbackButton()).toMatchSnapshot();
  });

  it("renders the player bar that contains pause button when playing=true is given", () => {
    const { playbackButton } = setupPlaying();

    expect(playbackButton()).toMatchSnapshot();
  });

  it("renders the play/pause button, rewind button and forward button disabled when playbackLoading=true is given", () => {
    const { rewindButton, forwardButton } = setupPlaybackLoading();

    expect(rewindButton()).toBeDisabled();
    expect(forwardButton()).toBeDisabled();
  });

  it("calls onResumeButtonClick() when the user clicks the play button", () => {
    const { onResumeButtonClick, clickPlaybackButton } = setup();

    clickPlaybackButton();

    expect(onResumeButtonClick).toHaveBeenCalled();
  });

  it("calls onPauseButtonClick() when the user clicks the pause button", () => {
    const { onPauseButtonClick, clickPlaybackButton } = setupPlaying();

    clickPlaybackButton();

    expect(onPauseButtonClick).toHaveBeenCalled();
  });

  it("calls onRewindButtonClick() when the user clicks the rewind button", () => {
    const { onRewindButtonClick, clickRewindButton } = setup();

    clickRewindButton();

    expect(onRewindButtonClick).toHaveBeenCalled();
  });

  it("calls onForwardButtonClick() when the user clicks the forward button", () => {
    const { onForwardButtonClick, clickForwardButton } = setup();

    clickForwardButton();

    expect(onForwardButtonClick).toHaveBeenCalled();
  });

  it("calls onCloseButtonClick() when the user clicks the close button", () => {
    const { onCloseButtonClick, clickCloseButton } = setup();

    clickCloseButton();

    expect(onCloseButtonClick).toHaveBeenCalled();
  });

  it("calls onSeek() when the seek bar's onChange gets called", () => {
    const { onSeek, emitSeekBarOnChange } = setup();

    emitSeekBarOnChange(0.5);
    emitSeekBarOnChange(0.25);
    emitSeekBarOnChange(1);

    expect(onSeek).toHaveBeenCalledTimes(3);
    expect(onSeek).toHaveBeenNthCalledWith(1, 0.5);
    expect(onSeek).toHaveBeenNthCalledWith(2, 0.25);
    expect(onSeek).toHaveBeenNthCalledWith(3, 1);
  });
});
