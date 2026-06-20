import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { placeholder: "How did your run feel?", rows: 4 },
  argTypes: {
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithValue: Story = {
  args: { defaultValue: "Felt strong on the hills, negative split the back half." },
};
export const Error: Story = { args: { error: true, defaultValue: "Too long…" } };
export const Disabled: Story = { args: { disabled: true, defaultValue: "Locked" } };
