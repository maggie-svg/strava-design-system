import type { Meta, StoryObj } from "@storybook/react";
import { SpacingPage } from "./SpacingPage";

const meta = {
  title: "Foundations/Spacing",
  component: SpacingPage,
  parameters: { layout: "fullscreen", page: true },
} satisfies Meta<typeof SpacingPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
