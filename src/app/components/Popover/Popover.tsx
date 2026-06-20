import { cloneElement, useState, type ReactElement, type ReactNode } from "react";
import {
  useFloating,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingFocusManager,
  FloatingPortal,
  type Placement,
} from "@floating-ui/react";
import "./popover.css";

export interface PopoverProps {
  /** Single interactive element that toggles the popover. */
  trigger: ReactElement<Record<string, unknown>>;
  children: ReactNode;
  placement?: Placement;
}

const POPOVER_OFFSET = 8;

export function Popover({ trigger, children, placement = "bottom-start" }: PopoverProps) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(POPOVER_OFFSET), flip(), shift({ padding: POPOVER_OFFSET })],
    whileElementsMounted: autoUpdate,
  });

  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role]);

  return (
    <>
      {cloneElement(
        trigger,
        getReferenceProps({ ref: refs.setReference, ...trigger.props }),
      )}
      {open && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              className="popover"
              style={floatingStyles}
              {...getFloatingProps()}
            >
              {children}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}
