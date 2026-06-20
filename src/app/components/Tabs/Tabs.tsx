import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import "./tabs.css";

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  /** Controlled active tab id. Omit for uncontrolled (use defaultValue). */
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export function Tabs({ items, value, defaultValue, onChange, className = "" }: TabsProps) {
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const firstEnabled = items.find((t) => !t.disabled)?.id;
  const [internal, setInternal] = useState(defaultValue ?? firstEnabled);
  const active = value !== undefined ? value : internal;

  const select = (id: string) => {
    if (value === undefined) setInternal(id);
    onChange?.(id);
  };

  const onKeyDown = (e: KeyboardEvent, index: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") {
      return;
    }
    e.preventDefault();
    const enabled = items.map((t, i) => ({ t, i })).filter(({ t }) => !t.disabled);
    const pos = enabled.findIndex(({ i }) => i === index);
    let nextPos = pos;
    if (e.key === "ArrowRight") nextPos = (pos + 1) % enabled.length;
    if (e.key === "ArrowLeft") nextPos = (pos - 1 + enabled.length) % enabled.length;
    if (e.key === "Home") nextPos = 0;
    if (e.key === "End") nextPos = enabled.length - 1;
    const target = enabled[nextPos];
    select(target.t.id);
    tabRefs.current[target.i]?.focus();
  };

  return (
    <div className={["tabs", className].filter(Boolean).join(" ")}>
      <div role="tablist" className="tabs__list">
        {items.map((t, i) => {
          const selected = t.id === active;
          return (
            <button
              key={t.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              type="button"
              id={`${baseId}-tab-${t.id}`}
              aria-controls={`${baseId}-panel-${t.id}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              disabled={t.disabled}
              className="tabs__tab sv-focus-ring"
              onClick={() => select(t.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {items.map((t) => (
        <div
          key={t.id}
          role="tabpanel"
          id={`${baseId}-panel-${t.id}`}
          aria-labelledby={`${baseId}-tab-${t.id}`}
          hidden={t.id !== active}
          className="tabs__panel"
        >
          {t.id === active && t.content}
        </div>
      ))}
    </div>
  );
}
