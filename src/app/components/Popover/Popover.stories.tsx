import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";
import { Checkbox } from "../Checkbox/Checkbox";

const meta = {
  title: "Components/Popover",
  component: Popover,
  tags: ["autodocs"],
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    trigger: <Button variant="secondary">Filters</Button>,
    children: (
      <>
        <Checkbox label="Runs" defaultChecked />
        <Checkbox label="Rides" />
        <Checkbox label="Swims" />
      </>
    ),
  },
};
