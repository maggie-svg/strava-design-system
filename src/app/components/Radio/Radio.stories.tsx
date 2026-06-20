import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    name: "activity",
    defaultValue: "run",
    options: [
      { label: "Run", value: "run" },
      { label: "Ride", value: "ride" },
      { label: "Swim", value: "swim" },
      { label: "Hike (Premium)", value: "hike", disabled: true },
    ],
  },
  argTypes: {
    orientation: { control: "inline-radio", options: ["vertical", "horizontal"] },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = {};
export const Horizontal: Story = { args: { orientation: "horizontal" } };
