import * as React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SeekBar } from "~/components/seek-bar";

export default {
  title: "Components/SeekBar",
  component: SeekBar,
  args: {
    defaultValue: 0.5,
    className: "w-64",
  },
} as ComponentMeta<typeof SeekBar>;

export const Uncontrolled: ComponentStory<typeof SeekBar> = (args) => (
  <SeekBar {...args} />
);

export const Controlled: ComponentStory<typeof SeekBar> = (args) => {
  const [value, setValue] = React.useState(0.5);

  return (
    <div>
      <SeekBar {...args} value={value} onChange={(v) => setValue(v)} />

      <div>{value}</div>
    </div>
  );
};
Controlled.args = {
  defaultValue: undefined,
};

export const Disabled = Uncontrolled.bind({});
Disabled.args = {
  disabled: true,
};
