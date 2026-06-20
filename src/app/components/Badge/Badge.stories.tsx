import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Personal Best" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["neutral", "primary", "success", "warning", "error"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Neutral: Story = { args: { variant: "neutral", children: "Draft" } };
export const Primary: Story = { args: { variant: "primary", children: "Premium" } };
export const Success: Story = { args: { variant: "success", children: "Completed" } };
export const Warning: Story = { args: { variant: "warning", children: "Not synced" } };
export const Error: Story = { args: { variant: "error", children: "Failed" } };

export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-sm">
      <Badge variant="neutral">Draft</Badge>
      <Badge variant="primary">Premium</Badge>
      <Badge variant="success">Completed</Badge>
      <Badge variant="warning">Not synced</Badge>
      <Badge variant="error">Failed</Badge>
    </div>
  ),
};
