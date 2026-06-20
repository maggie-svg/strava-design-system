import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = (
  <>
    <option value="run">Run</option>
    <option value="ride">Ride</option>
    <option value="swim">Swim</option>
    <option value="hike">Hike</option>
  </>
);

export const Default: Story = { args: { children: options, defaultValue: "run" } };
export const Error: Story = { args: { children: options, error: true, defaultValue: "ride" } };
export const Disabled: Story = { args: { children: options, disabled: true, defaultValue: "swim" } };
