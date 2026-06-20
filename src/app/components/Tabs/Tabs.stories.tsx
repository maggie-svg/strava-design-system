import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 480 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: "overview", label: "Overview", content: "Distance, time, pace and elevation for this activity." },
  { id: "splits", label: "Splits", content: "Per-kilometer splits with pace and heart rate." },
  { id: "segments", label: "Segments", content: "Matched segments and your efforts on each." },
  { id: "analysis", label: "Analysis (Premium)", content: "Premium analysis.", disabled: true },
];

export const Default: Story = { args: { items, defaultValue: "overview" } };
