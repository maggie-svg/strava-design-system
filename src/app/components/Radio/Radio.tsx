import type { InputHTMLAttributes, ReactNode } from "react";
import "./radio.css";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

export function Radio({ label, className = "", disabled, ...rest }: RadioProps) {
  const classes = ["radio", disabled && "radio--disabled", className]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes}>
      <input type="radio" className="radio__input" disabled={disabled} {...rest} />
      <span className="radio__box" aria-hidden="true" />
      {label != null && <span className="radio__label">{label}</span>}
    </label>
  );
}
