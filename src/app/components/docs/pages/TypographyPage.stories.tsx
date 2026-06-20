import type { Meta, StoryObj } from "@storybook/react";
import { TypographyPage } from "./TypographyPage";

const meta = {
  title: "Foundations/Typography",
  component: TypographyPage,
  parameters: { layout: "fullscreen", page: true },
} satisfies Meta<typeof TypographyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
