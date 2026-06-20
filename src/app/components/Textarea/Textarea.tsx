import type { TextareaHTMLAttributes } from "react";
import "./textarea.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Renders the error border treatment and sets aria-invalid. */
  error?: boolean;
}

export function Textarea({ error, className = "", ...rest }: TextareaProps) {
  const classes = ["textarea", error && "textarea--error", className]
    .filter(Boolean)
    .join(" ");

  return <textarea className={classes} aria-invalid={error || undefined} {...rest} />;
}
