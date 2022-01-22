import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FullLogo, Logo } from "~/components/logo";

export default {
  title: "Components/Logo",
  component: Logo,
} as ComponentMeta<typeof Logo>;

export const Full: ComponentStory<typeof Logo> = (args) => (
  <FullLogo {...args} />
);

export const Example: ComponentStory<typeof Logo> = (args) => (
  <Logo {...args} />
);
