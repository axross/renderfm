import { renderHook } from "@testing-library/react-hooks";
import userEvent from "@testing-library/user-event";
import { useHotkeyEffect } from "~/hooks/use-hotkey-effect";

describe("useHotkeyEffect()", () => {
  function setup() {
    const callback = jest.fn();

    const { result, unmount } = renderHook(() =>
      useHotkeyEffect("r", callback, [1])
    );

    return {
      callback,
      currentResult: () => result.current,
      unmount,
    };
  }

  it("calls the given callback function whenever you pressed the specified key", () => {
    const { callback } = setup();

    userEvent.keyboard("{r}");

    expect(callback).toHaveBeenCalled();
  });

  it("doesn't call the callback function if you pressed different key", () => {
    const { callback } = setup();

    userEvent.keyboard("{w}");

    expect(callback).not.toHaveBeenCalled();
  });

  it("doesn't call the callback function after it unmounts", () => {
    const { callback, unmount } = setup();

    unmount();

    userEvent.keyboard("{r}");

    expect(callback).not.toHaveBeenCalled();
  });
});
