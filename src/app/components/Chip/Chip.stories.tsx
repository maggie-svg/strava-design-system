import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Chip } from "./Chip";

const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  args: { children: "This week" },
  argTypes: {
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selected: Story = { args: { selected: true } };
export const Disabled: Story = { args: { disabled: true } };

// Single-select filter row driven by local state.
export const FilterRow: Story = {
  render: () => {
    const options = ["All", "Runs", "Rides", "Swims"];
    const [active, setActive] = useState("All");
    return (
      <div className="flex items-center gap-sm">
        {options.map((o) => (
          <Chip key={o} selected={active === o} onClick={() => setActive(o)}>
            {o}
          </Chip>
        ))}
      </div>
    );
  },
};
