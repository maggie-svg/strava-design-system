import type { SelectHTMLAttributes, ReactNode } from "react";
import "./select.css";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  /** Renders the error border treatment and sets aria-invalid. */
  error?: boolean;
  children: ReactNode;
}

export function Select({ error, className = "", children, ...rest }: SelectProps) {
  const classes = ["select", error && "select--error", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <select className="select__input" aria-invalid={error || undefined} {...rest}>
        {children}
      </select>
      <span className="select__chevron" aria-hidden="true" />
    </div>
  );
}
