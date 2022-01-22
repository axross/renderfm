import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "~/components/button";
import { Card, CardFooter } from "~/components/card";

export default {
  title: "Components/Card",
  component: Card,
  args: {
    className: "w-96 min-h-64",
    children: "Hello",
  },
} as ComponentMeta<typeof Card>;

export const Example: ComponentStory<typeof Card> = (args) => (
  <Card {...args} />
);

export const WithFooter = Example.bind({});
WithFooter.args = {
  children: (
    <>
      Hello
      <CardFooter>
        <Button>Do Some Action</Button>
      </CardFooter>
    </>
  ),
};
