import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ClickableText,
  ClickableTextProps,
  TextAnchor,
} from "~/components/clickable-text";

describe("<ClickableText>", () => {
  function setup(additionalProps?: Partial<ClickableTextProps>) {
    render(
      <ClickableText data-testid="clickable-text" {...additionalProps}>
        Hello
      </ClickableText>
    );

    return {
      clickableText: () => screen.getByTestId("clickable-text"),
    };
  }

  it("renders a focusable inline element", () => {
    const { clickableText } = setup();

    userEvent.tab();

    expect(clickableText()).toHaveFocus();

    userEvent.tab({ shift: true });

    expect(clickableText()).not.toHaveFocus();

    userEvent.click(clickableText());

    expect(clickableText()).toHaveFocus();

    expect(clickableText()).toMatchSnapshot();
  });
});

describe("<TextAnchor>", () => {
  function setup(additionalProps?: Partial<ClickableTextProps>) {
    render(
      <TextAnchor
        href="https://example.kohei.dev/"
        data-testid="text-anchor"
        {...additionalProps}
      >
        Hello
      </TextAnchor>
    );

    return {
      textAnchor: () => screen.getByTestId("text-anchor"),
    };
  }

  it("renders focusable inline element", () => {
    const { textAnchor } = setup();

    userEvent.tab();

    expect(textAnchor()).toHaveFocus();

    userEvent.tab({ shift: true });

    expect(textAnchor()).not.toHaveFocus();

    userEvent.click(textAnchor());

    expect(textAnchor()).toHaveFocus();

    expect(textAnchor()).toMatchSnapshot();
  });
});
