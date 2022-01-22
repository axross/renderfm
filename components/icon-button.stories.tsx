import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ClockIcon } from "~/components/icon";
import { IconButton } from "~/components/icon-button";

export default {
  title: "Components/IconButton",
  component: IconButton,
  args: {
    variant: "primary",
    disabled: false,
    children: <ClockIcon />,
  },
} as ComponentMeta<typeof IconButton>;

export const Example: ComponentStory<typeof IconButton> = (args) => (
  <IconButton {...args} />
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
