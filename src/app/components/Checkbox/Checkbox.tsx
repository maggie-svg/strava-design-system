import type { InputHTMLAttributes, ReactNode } from "react";
import "./checkbox.css";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

export function Checkbox({ label, className = "", disabled, ...rest }: CheckboxProps) {
  const classes = ["checkbox", disabled && "checkbox--disabled", className]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes}>
      <input type="checkbox" className="checkbox__input" disabled={disabled} {...rest} />
      <span className="checkbox__box" aria-hidden="true" />
      {label != null && <span className="checkbox__label">{label}</span>}
    </label>
  );
}
