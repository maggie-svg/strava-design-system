import type { Meta, StoryObj } from "@storybook/react";
import { ColorsPage } from "./ColorsPage";

const meta = {
  title: "Foundations/Colors",
  component: ColorsPage,
  parameters: { layout: "fullscreen", page: true },
} satisfies Meta<typeof ColorsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
