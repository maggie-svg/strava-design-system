import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "./Switch";

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { label: "Auto-pause" },
  argTypes: {
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Off: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const NoLabel: Story = { args: { label: undefined, "aria-label": "Auto-pause" } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledOn: Story = { args: { disabled: true, defaultChecked: true } };

export const Group: Story = {
  render: () => (
    <div className="flex flex-col gap-md">
      <Switch label="Auto-pause" defaultChecked />
      <Switch label="Share to feed" />
      <Switch label="Live segments" defaultChecked />
      <Switch label="Beacon safety" disabled />
    </div>
  ),
};
