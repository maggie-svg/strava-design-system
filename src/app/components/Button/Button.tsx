import type { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.css";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "destructive";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  iconOnly?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  iconOnly,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [
    "btn",
    `btn--${variant}`,
    size !== "md" && `btn--${size}`,
    iconOnly && "btn--icon",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} {...rest}>
      {iconLeft}
      {!iconOnly && children}
      {iconRight}
    </button>
  );
}
