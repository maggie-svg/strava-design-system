import type { HTMLAttributes, ReactNode } from "react";
import "./badge.css";

export type BadgeVariant = "neutral" | "primary" | "success" | "warning" | "error";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

export function Badge({ variant = "neutral", className = "", children, ...rest }: BadgeProps) {
  const classes = ["badge", variant !== "neutral" && `badge--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  );
}
