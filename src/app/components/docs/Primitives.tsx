import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <header style={{ marginBottom: "var(--sv-sys-spacing-padding-2xl)" }}>
      {eyebrow && (
        <div
          style={{
            color: "var(--sv-sys-color-primary)",
            fontSize: "var(--sv-sys-typescale-label-small-font-size)",
            lineHeight: "var(--sv-sys-typescale-label-small-line-height)",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "var(--sv-sys-spacing-padding-sm)",
            fontWeight: 700,
          }}
        >
          {eyebrow}
        </div>
      )}
      <h1
        style={{
          color: "var(--sv-sys-color-on-surface)",
          fontSize: 40,
          lineHeight: "48px",
          fontWeight: 900,
          letterSpacing: "-0.02em",
          margin: 0,
          marginBottom: "var(--sv-sys-spacing-padding-md)",
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          style={{
            color: "var(--sv-sys-color-on-surface-variant)",
            fontSize: 18,
            lineHeight: "28px",
            maxWidth: 720,
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </header>
  );
}

export function Section({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
  return (
    <section style={{ marginBottom: "var(--sv-sys-spacing-padding-2xl)" }}>
      <h2
        style={{
          color: "var(--sv-sys-color-on-surface)",
          fontSize: "var(--sv-sys-typescale-label-large-font-size)",
          lineHeight: "var(--sv-sys-typescale-label-large-line-height)",
          fontWeight: 700,
          margin: 0,
          marginBottom: "var(--sv-sys-spacing-padding-sm)",
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            color: "var(--sv-sys-color-on-surface-variant)",
            fontSize: "var(--sv-sys-typescale-body-font-size)",
            lineHeight: "var(--sv-sys-typescale-body-line-height)",
            margin: 0,
            marginBottom: "var(--sv-sys-spacing-padding-lg)",
            maxWidth: 720,
          }}
        >
          {description}
        </p>
      )}
      {children}
    </section>
  );
}

export function Card({ children, padding = "lg" }: { children: ReactNode; padding?: "md" | "lg" | "xl" }) {
  return (
    <div
      style={{
        background: "var(--sv-comp-card-background)",
        borderRadius: "var(--sv-comp-card-corner-radius)",
        padding: `var(--sv-sys-spacing-padding-${padding})`,
        border: "var(--sv-sys-shape-border-width-default) solid var(--sv-sys-color-border-subtle)",
      }}
    >
      {children}
    </div>
  );
}

export function Code({ children }: { children: ReactNode }) {
  return (
    <code
      style={{
        background: "var(--sv-sys-color-background)",
        color: "var(--sv-sys-color-primary)",
        padding: "2px 8px",
        borderRadius: "var(--sv-sys-shape-corner-radius-xs)",
        fontSize: "var(--sv-sys-typescale-label-small-font-size)",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        border: "var(--sv-sys-shape-border-width-default) solid var(--sv-sys-color-border-subtle)",
      }}
    >
      {children}
    </code>
  );
}

export function UsageList({
  doItems,
  dontItems,
}: {
  doItems: string[];
  dontItems: string[];
}) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--sv-sys-spacing-gap-md)" }}>
      <Card>
        <div
          style={{
            color: "var(--sv-sys-color-success)",
            fontWeight: 700,
            fontSize: "var(--sv-sys-typescale-label-medium-font-size)",
            marginBottom: "var(--sv-sys-spacing-padding-sm)",
          }}
        >
          ✓ Do
        </div>
        <ul style={{ paddingLeft: 20, margin: 0, color: "var(--sv-sys-color-on-surface-variant)", display: "flex", flexDirection: "column", gap: 8 }}>
          {doItems.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </Card>
      <Card>
        <div
          style={{
            color: "var(--sv-sys-color-error)",
            fontWeight: 700,
            fontSize: "var(--sv-sys-typescale-label-medium-font-size)",
            marginBottom: "var(--sv-sys-spacing-padding-sm)",
          }}
        >
          ✗ Don't
        </div>
        <ul style={{ paddingLeft: 20, margin: 0, color: "var(--sv-sys-color-on-surface-variant)", display: "flex", flexDirection: "column", gap: 8 }}>
          {dontItems.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

export function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div
      style={{
        borderRadius: "var(--sv-sys-shape-corner-radius-md)",
        overflow: "hidden",
        border: "var(--sv-sys-shape-border-width-default) solid var(--sv-sys-color-border-subtle)",
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse", background: "var(--sv-sys-color-surface)" }}>
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "var(--sv-sys-spacing-padding-md) var(--sv-sys-spacing-padding-lg)",
                  background: "var(--sv-sys-color-surface-elevated)",
                  color: "var(--sv-sys-color-on-surface)",
                  fontSize: "var(--sv-sys-typescale-label-small-font-size)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  borderBottom: "var(--sv-sys-shape-border-width-default) solid var(--sv-sys-color-border-subtle)",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td
                  key={j}
                  style={{
                    padding: "var(--sv-sys-spacing-padding-md) var(--sv-sys-spacing-padding-lg)",
                    color: "var(--sv-sys-color-on-surface-variant)",
                    fontSize: "var(--sv-sys-typescale-body-font-size)",
                    lineHeight: "var(--sv-sys-typescale-body-line-height)",
                    borderBottom: i < rows.length - 1 ? "var(--sv-sys-shape-border-width-default) solid var(--sv-sys-color-border-subtle)" : "none",
                    verticalAlign: "top",
                  }}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
