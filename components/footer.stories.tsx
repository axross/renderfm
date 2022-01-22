import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Footer } from "~/components/footer";

export default {
  title: "Components/Footer",
  component: Footer,
  args: {
    className: "w-96 min-h-64",
  },
} as ComponentMeta<typeof Footer>;

export const Example: ComponentStory<typeof Footer> = (args) => (
  <Footer {...args} />
);
