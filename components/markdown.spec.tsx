import { render, screen } from "@testing-library/react";
import { Markdown, MarkdownProps } from "~/components/markdown";

describe("<Markdown>", () => {
  function setup(additionalProps?: Partial<MarkdownProps>) {
    render(
      <Markdown
        markdown="JS Partyの [#160 Breaking down the State of CSS/JS](https://changelog.com/jsparty/160) を聴いて[@yuya](https://twitter.com/van_sf_engineer)と[@kohei](https://twitter.com/axross_)がいろいろ話しました。前編です。"
        data-testid="markdown"
        {...additionalProps}
      />
    );

    return {
      markdown: () => screen.getByTestId("markdown"),
    };
  }

  it("renders the markdown in respective html elements", () => {
    const { markdown } = setup();

    expect(markdown()).toMatchSnapshot();
  });
});
