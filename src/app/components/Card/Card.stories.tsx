import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "elevated"] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Token-driven sample content for the card body.
const ActivitySummary = () => (
  <>
    <div
      style={{
        color: "var(--sv-sys-color-on-surface-variant)",
        fontSize: "var(--sv-sys-typescale-label-small-font-size)",
        textTransform: "uppercase",
        letterSpacing: "0.08em",
      }}
    >
      Morning Run · 3h ago
    </div>
    <div
      style={{
        color: "var(--sv-sys-color-on-surface)",
        fontSize: "var(--sv-sys-typescale-numeric-display-font-size)",
        lineHeight: "var(--sv-sys-typescale-numeric-display-line-height)",
        fontWeight: "var(--sv-sys-typescale-numeric-display-font-weight)",
      }}
    >
      12.4 km
    </div>
    <div
      style={{
        color: "var(--sv-sys-color-on-surface-variant)",
        fontSize: "var(--sv-sys-typescale-body-font-size)",
      }}
    >
      01:05:23 · 5'14"/km
    </div>
    <Button size="sm">View Activity</Button>
  </>
);

export const Default: Story = {
  args: { variant: "default", children: <ActivitySummary /> },
};

export const Elevated: Story = {
  args: { variant: "elevated", children: <ActivitySummary /> },
};
