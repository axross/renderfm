import { render, screen } from "@testing-library/react";
import { Footer, FooterProps } from "~/components/footer";

describe("<Footer>", () => {
  function setup(additionalProps?: Partial<FooterProps>) {
    render(<Footer data-testid="footer" {...additionalProps} />);

    return {
      footer: () => screen.getByTestId("footer"),
    };
  }

  it("renders the authors' names", () => {
    const { footer } = setup();

    expect(footer()).toMatchSnapshot();
  });
});
