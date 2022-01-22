import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ClickableText } from "~/components/clickable-text";

export default {
  title: "Components/ClickableText",
  component: ClickableText,
  args: {
    children: "This is a link",
  },
} as ComponentMeta<typeof ClickableText>;

export const Example: ComponentStory<typeof ClickableText> = (args) => (
  <ClickableText {...args} />
);
