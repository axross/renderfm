import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "~/components/button";

export default {
  title: "Components/Button",
  component: Button,
  args: {
    variant: "primary",
    disabled: false,
    children: "Press Me",
  },
} as ComponentMeta<typeof Button>;

export const Example: ComponentStory<typeof Button> = (args) => (
  <Button {...args} />
);

export const Small = Example.bind({});
Small.args = {
  size: "sm",
};

export const ExtraSmall = Example.bind({});
ExtraSmall.args = {
  size: "xs",
};

export const Translucent = Example.bind({});
Translucent.args = {
  translucent: true,
};

export const Disabled = Example.bind({});
Disabled.args = {
  disabled: true,
};

export const Loading = Example.bind({});
Loading.args = {
  loading: true,
};
