jest.mock("~/hooks/use-rect", () => {
  const React = jest.requireActual<typeof import("react")>("react");

  return {
    useRect: () => {
      const ref = React.useRef<HTMLElement>(null);

      return [
        ref,
        {
          top: 12,
          bottom: 34,
          left: 56,
          right: 67,
          width: 890,
          height: 123,
        },
      ];
    },
  };
});

import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SeekBar, SeekBarProps } from "~/components/seek-bar";

describe("<SeekBar>", () => {
  function setup(additionalProps?: Partial<SeekBarProps>) {
    const onChange = jest.fn();

    const { rerender } = render(
      <SeekBar
        onChange={onChange}
        data-testid="seek-bar"
        {...additionalProps}
      />
    );

    const seekBar = () => screen.getByTestId("seek-bar");

    return {
      seekBar,
      onChange,
      rerender: (newProps?: Partial<SeekBarProps>) =>
        rerender(
          <SeekBar data-testid="seek-bar" {...additionalProps} {...newProps} />
        ),
    };
  }

  const setupDisabled: typeof setup = (additionalProps) =>
    setup({ disabled: true, ...additionalProps });

  const setupWithDefaultValue: typeof setup = (additionalProps) =>
    setup({ defaultValue: 0.5, ...additionalProps });

  it("renders an uncontrolled seek bar", () => {
    const { seekBar } = setup();

    expect(seekBar()).toMatchSnapshot();
  });

  it("renders an uncontrolled seek bar with the given defaultValue", () => {
    const { seekBar } = setupWithDefaultValue();

    expect(seekBar()).toMatchSnapshot();
  });

  it("calls onChange() with updating the internal value whenever somewhere on the seek bar gets clicked", () => {
    const { seekBar, onChange } = setup();

    userEvent.click(seekBar(), { clientX: 234 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0.2");

    userEvent.click(seekBar(), { clientX: 501 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0.5");

    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenNthCalledWith(1, 0.2);
    expect(onChange).toHaveBeenNthCalledWith(2, 0.5);
  });

  it("calls onChange() with updating the internal value whenever it's drag-n-dropped the indicator edge", () => {
    const { seekBar, onChange } = setup();

    fireEvent.mouseDown(seekBar(), { clientX: 501 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0.5");

    fireEvent.mouseMove(seekBar(), { clientX: 408 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0.3955056179775281");

    fireEvent.mouseMove(seekBar(), { clientX: 320 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0.2966292134831461");

    fireEvent.mouseMove(seekBar(), { clientX: 234 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0.2");

    fireEvent.mouseMove(seekBar(), { clientX: 56 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0");

    fireEvent.mouseUp(seekBar(), { clientX: 56 });

    expect(onChange).toHaveBeenCalledTimes(5);
    expect(onChange).toHaveBeenNthCalledWith(1, 0.5);
    expect(onChange).toHaveBeenNthCalledWith(2, 0.3955056179775281);
    expect(onChange).toHaveBeenNthCalledWith(3, 0.2966292134831461);
    expect(onChange).toHaveBeenNthCalledWith(4, 0.2);
    expect(onChange).toHaveBeenNthCalledWith(5, 0);
  });

  it("doesn't update the internal value when disabled=true is given", () => {
    const { seekBar } = setupDisabled();

    userEvent.click(seekBar(), { clientX: 234 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0");

    userEvent.click(seekBar(), { clientX: 501 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0");

    fireEvent.mouseDown(seekBar(), { clientX: 501 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0");

    fireEvent.mouseMove(seekBar(), { clientX: 408 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0");

    fireEvent.mouseMove(seekBar(), { clientX: 320 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0");

    fireEvent.mouseMove(seekBar(), { clientX: 234 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0");

    fireEvent.mouseMove(seekBar(), { clientX: 120 });

    expect(seekBar()).toHaveAttribute("aria-valuenow", "0");

    fireEvent.mouseUp(seekBar(), { clientX: 120 });
  });

  it("doesn't call onChange() when disabled=true is given", () => {
    const { seekBar, onChange } = setupDisabled();

    userEvent.click(seekBar(), { clientX: 234 });
    userEvent.click(seekBar(), { clientX: 501 });
    fireEvent.mouseDown(seekBar(), { clientX: 501 });
    fireEvent.mouseMove(seekBar(), { clientX: 408 });
    fireEvent.mouseMove(seekBar(), { clientX: 320 });
    fireEvent.mouseMove(seekBar(), { clientX: 234 });
    fireEvent.mouseMove(seekBar(), { clientX: 56 });
    fireEvent.mouseUp(seekBar(), { clientX: 56 });

    expect(onChange).not.toHaveBeenCalled();
  });

  it("renders a controlled seek bar when props.value is given", () => {
    const { seekBar, rerender } = setup({ value: 0.5 });

    expect(seekBar()).toMatchSnapshot();

    rerender({ value: 0.762 });

    expect(seekBar()).toMatchSnapshot();
  });
});
