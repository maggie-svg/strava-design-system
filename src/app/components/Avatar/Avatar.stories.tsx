import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";

const SAMPLE_IMG =
  "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&h=200&fit=crop";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { name: "Kara Goucher", size: "md" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};
export const Image: Story = { args: { src: SAMPLE_IMG } };

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-md">
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
    </div>
  ),
};
