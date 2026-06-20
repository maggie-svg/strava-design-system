import { cloneElement, useState, type ReactElement, type ReactNode } from "react";
import {
  useFloating,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  offset,
  flip,
  shift,
  autoUpdate,
  FloatingPortal,
  type Placement,
} from "@floating-ui/react";
import "./tooltip.css";

export interface TooltipProps {
  label: ReactNode;
  placement?: Placement;
  /** Single interactive element that triggers the tooltip. */
  children: ReactElement<Record<string, unknown>>;
}

// Offset (px) maps to the sm gap step in the spacing scale.
const TOOLTIP_OFFSET = 8;

export function Tooltip({ label, placement = "top", children }: TooltipProps) {
  const [open, setOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    middleware: [offset(TOOLTIP_OFFSET), flip(), shift({ padding: TOOLTIP_OFFSET })],
    whileElementsMounted: autoUpdate,
  });

  const hover = useHover(context, { move: false });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role]);

  return (
    <>
      {cloneElement(
        children,
        getReferenceProps({ ref: refs.setReference, ...children.props }),
      )}
      {open && (
        <FloatingPortal>
          <div
            ref={refs.setFloating}
            className="tooltip"
            style={floatingStyles}
            {...getFloatingProps()}
          >
            {label}
          </div>
        </FloatingPortal>
      )}
    </>
  );
}
