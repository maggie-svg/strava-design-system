import type { Meta, StoryObj } from "@storybook/react";
import { TokenArchPage } from "./TokenArchPage";

const meta = {
  title: "Styles/Token Architecture",
  component: TokenArchPage,
  parameters: { layout: "fullscreen", page: true },
} satisfies Meta<typeof TokenArchPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Docs: Story = {};
