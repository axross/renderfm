import { render, screen } from "@testing-library/react";
import { FullLogo, FullLogoProps, Logo, LogoProps } from "~/components/logo";

describe("<FullLogo>", () => {
  function setup(additionalProps?: Partial<FullLogoProps>) {
    render(<FullLogo data-testid="full-logo" {...additionalProps} />);

    return {
      fullLogo: () => screen.getByTestId("full-logo"),
    };
  }

  it("renders the renderfm full logo", () => {
    const { fullLogo } = setup();

    expect(fullLogo()).toMatchSnapshot();
  });
});

describe("<Logo>", () => {
  function setup(additionalProps?: Partial<LogoProps>) {
    render(<Logo data-testid="logo" {...additionalProps} />);

    return {
      logo: () => screen.getByTestId("logo"),
    };
  }

  it("renders the renderfm square logo", () => {
    const { logo } = setup();

    expect(logo()).toMatchSnapshot();
  });
});
