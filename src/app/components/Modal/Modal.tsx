import { useId, type ReactNode } from "react";
import {
  useFloating,
  useDismiss,
  useRole,
  useInteractions,
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
} from "@floating-ui/react";
import "./modal.css";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  /** Optional footer region (e.g. action buttons), right-aligned. */
  footer?: ReactNode;
}

export function Modal({ open, onClose, title, children, footer }: ModalProps) {
  const labelId = useId();
  const descId = useId();

  const { refs, context } = useFloating({
    open,
    onOpenChange: (next) => {
      if (!next) onClose();
    },
  });

  const dismiss = useDismiss(context, { outsidePressEvent: "mousedown" });
  const role = useRole(context, { role: "dialog" });
  const { getFloatingProps } = useInteractions([dismiss, role]);

  if (!open) return null;

  return (
    <FloatingPortal>
      <FloatingOverlay className="modal__scrim" lockScroll>
        <FloatingFocusManager context={context}>
          <div
            ref={refs.setFloating}
            className="modal__dialog"
            aria-labelledby={title ? labelId : undefined}
            aria-describedby={descId}
            {...getFloatingProps()}
          >
            {title && (
              <h2 id={labelId} className="modal__title">
                {title}
              </h2>
            )}
            <div id={descId} className="modal__body">
              {children}
            </div>
            {footer && <div className="modal__footer">{footer}</div>}
          </div>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  );
}
