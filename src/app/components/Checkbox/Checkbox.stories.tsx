import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { label: "Show on profile" },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const NoLabel: Story = { args: { label: undefined, "aria-label": "Toggle" } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } };

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-sm">
      <Checkbox label="Auto-pause" defaultChecked />
      <Checkbox label="Share to feed" />
      <Checkbox label="Heart rate zones" defaultChecked />
      <Checkbox label="Premium insights" disabled />
    </div>
  ),
};
