import type { InputHTMLAttributes } from "react";
import "./input.css";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /** Renders the error border treatment and sets aria-invalid. */
  error?: boolean;
}

export function Input({ error, className = "", ...rest }: InputProps) {
  const classes = ["input", error && "input--error", className]
    .filter(Boolean)
    .join(" ");

  return <input className={classes} aria-invalid={error || undefined} {...rest} />;
}
