import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button, ButtonProps } from "~/components/button";

describe("<Button>", () => {
  function setup(additionalProps?: Partial<ButtonProps>) {
    const onClick = jest.fn();

    render(
      <Button onClick={onClick} data-testid="button" {...additionalProps}>
        Click me
      </Button>
    );

    return {
      button: () => screen.getByTestId("button"),
      onClick,
    };
  }

  const setupDisabled: typeof setup = (additionalProps) =>
    setup({ disabled: true, ...additionalProps });

  const setupLoading: typeof setup = (additionalProps) =>
    setup({ loading: true, ...additionalProps });

  it("renders a medium button by default", () => {
    const { button } = setup();

    expect(button()).toMatchSnapshot();
  });

  it('renders a small button when size="sm" is given', () => {
    const { button } = setup({ size: "sm" });

    expect(button()).toMatchSnapshot();
  });

  it('renders an extra small button when size="xs" is given', () => {
    const { button } = setup({ size: "xs" });

    expect(button()).toMatchSnapshot();
  });

  it("renders a translucent button when transulucent=true is given", () => {
    const { button } = setup({ translucent: true });

    expect(button()).toMatchSnapshot();
  });

  it("renders a button focusable", () => {
    const { button } = setup();

    userEvent.tab();

    expect(button()).toHaveFocus();

    userEvent.tab();

    expect(button()).not.toHaveFocus();
  });

  it("renders a button unfocusable when disabled=true is given", () => {
    const { button } = setupDisabled();

    userEvent.tab();

    expect(button()).not.toHaveFocus();
  });

  it("calls onClick() when the user clicks it", () => {
    const { button, onClick } = setup();

    userEvent.click(button());

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("doesn't call onClick() even when the user clicks it as long as disabled=true is given", () => {
    const { button, onClick } = setupDisabled();

    userEvent.click(button());

    expect(onClick).not.toHaveBeenCalled();
  });

  it("renders a button with the children alongwith a loding spinner when loading=true is given", () => {
    const { button } = setupLoading();

    expect(button()).toMatchSnapshot();
  });

  it("renders a button unfocusable when loading=true is given", () => {
    const { button } = setupLoading();

    userEvent.tab();

    expect(button()).not.toHaveFocus();
  });

  it("doesn't call onClick() even when it gets clicked as long as loading=true is given", () => {
    const { button, onClick } = setupLoading();

    userEvent.click(button());

    expect(onClick).not.toHaveBeenCalled();
  });
});
