import type { HTMLAttributes, ReactNode } from "react";
import "./card.css";

export type CardVariant = "default" | "elevated";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}

export function Card({ variant = "default", className = "", children, ...rest }: CardProps) {
  const classes = ["card", variant !== "default" && `card--${variant}`, className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
