import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./chip.css";

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected (active filter) state. */
  selected?: boolean;
  children: ReactNode;
}

export function Chip({ selected, className = "", children, ...rest }: ChipProps) {
  const classes = ["chip", "sv-focus-ring", selected && "chip--selected", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={classes} aria-pressed={selected} {...rest}>
      {children}
    </button>
  );
}
