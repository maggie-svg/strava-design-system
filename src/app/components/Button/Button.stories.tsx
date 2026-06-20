import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

// Simple inline icon so stories stay dependency-free.
const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
    <path d="M4 2.5v11l9-5.5-9-5.5Z" />
  </svg>
);

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: { children: "Start Activity" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "secondary", "ghost", "destructive"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    iconOnly: { control: "boolean" },
    iconLeft: { control: false },
    iconRight: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: "primary" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Destructive: Story = {
  args: { variant: "destructive", children: "Delete Activity" },
};
export const Disabled: Story = { args: { disabled: true } };

export const WithIcon: Story = {
  args: { iconLeft: <PlayIcon /> },
};

export const IconOnly: Story = {
  args: { iconOnly: true, iconLeft: <PlayIcon />, "aria-label": "Start activity" },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex items-center gap-md">
      <Button {...args} variant="primary">Primary</Button>
      <Button {...args} variant="secondary">Secondary</Button>
      <Button {...args} variant="ghost">Ghost</Button>
      <Button {...args} variant="destructive">Destructive</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-md">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="md">Medium</Button>
      <Button {...args} size="lg">Large</Button>
    </div>
  ),
};
