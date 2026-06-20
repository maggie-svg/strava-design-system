import type { HTMLAttributes } from "react";
import "./avatar.css";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Image URL. Falls back to initials (from `name`) when absent. */
  src?: string;
  /** Person's name — used for initials fallback and the image alt text. */
  name?: string;
  size?: AvatarSize;
}

function initialsOf(name?: string): string {
  if (!name) return "";
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p.charAt(0).toUpperCase()).join("");
}

export function Avatar({ src, name, size = "md", className = "", ...rest }: AvatarProps) {
  const classes = ["avatar", `avatar--${size}`, className].filter(Boolean).join(" ");

  return (
    <span className={classes} {...rest}>
      {src ? (
        <img className="avatar__img" src={src} alt={name ?? ""} />
      ) : (
        <span className="avatar__initials" aria-label={name || undefined}>
          {initialsOf(name)}
        </span>
      )}
    </span>
  );
}
