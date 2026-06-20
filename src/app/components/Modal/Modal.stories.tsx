import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { open: false, onClose: () => {}, children: null },
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="destructive" onClick={() => setOpen(true)}>
          Delete Activity
        </Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Delete this activity?"
          footer={
            <>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" size="sm" onClick={() => setOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          This will permanently remove your morning run (12.4 km) and its stats. This
          action cannot be undone.
        </Modal>
      </>
    );
  },
};
