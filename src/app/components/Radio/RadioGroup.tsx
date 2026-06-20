import { useState, type ReactNode } from "react";
import { Radio } from "./Radio";

export interface RadioOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** Shared input name; required to group the radios. */
  name: string;
  options: RadioOption[];
  /** Controlled selected value. Omit for uncontrolled (use defaultValue). */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onChange,
  orientation = "vertical",
  className = "",
}: RadioGroupProps) {
  const [internal, setInternal] = useState(defaultValue);
  const current = value !== undefined ? value : internal;

  const handleChange = (next: string) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  const layout = orientation === "horizontal" ? "flex items-center gap-md" : "flex flex-col gap-sm";

  return (
    <div role="radiogroup" className={[layout, className].filter(Boolean).join(" ")}>
      {options.map((opt) => (
        <Radio
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          disabled={opt.disabled}
          checked={current === opt.value}
          onChange={() => handleChange(opt.value)}
        />
      ))}
    </div>
  );
}
