import type { Meta, StoryObj } from "@storybook/react";
import { PrinciplesPage } from "./PrinciplesPage";

const meta = {
  title: "Get started/Design Principles",
  component: PrinciplesPage,
  parameters: { layout: "fullscreen", page: true },
} satisfies Meta<typeof PrinciplesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
