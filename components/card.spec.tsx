import { render, screen } from "@testing-library/react";
import { Card, CardFooter, CardProps } from "~/components/card";

describe("<Card>", () => {
  function setup(additionalProps?: Partial<CardProps>) {
    render(
      <Card data-testid="card" {...additionalProps}>
        <div data-testid="child" />

        <CardFooter data-testid="footer">
          <div data-testid="footer-child" />
        </CardFooter>
      </Card>
    );

    return {
      card: () => screen.getByTestId("card"),
    };
  }

  it("renders the children with the footer accordingly", () => {
    const { card } = setup();

    expect(card()).toMatchSnapshot();
  });
});
