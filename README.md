# Strava Design System

A dark-first, token-driven component library built with **React + TypeScript + Tailwind v4**, documented in **Storybook**. No shadcn, no Radix component layer — just design tokens and small, accessible components.

> Brand: Strava-like dark theme, single orange accent (`#fc4c02`), pill-shaped interactives, heavy numeric contrast.

---

## Stack

- **React 19** + **TypeScript**
- **Vite 6** (build + dev)
- **Tailwind v4** — used for layout utilities, backed by design tokens via `@theme`
- **Storybook 8** — component workshop + living documentation
- **@floating-ui/react** — positioning + focus management for overlays (the only runtime dependency)

---

## Getting started

```bash
npm install
npm run storybook   # open the component library at http://localhost:6007
```

### Scripts

| Script | What it does |
| --- | --- |
| `npm run storybook` | Storybook dev server (port 6007) |
| `npm run build-storybook` | Static Storybook build → `storybook-static/` |
| `npm run dev` | Vite dev server for the sample app |
| `npm run build` | Production build of the sample app |
| `npm run typecheck` | `tsc --noEmit` |

---

## Design token architecture

Tokens live in [`src/styles/tokens.css`](src/styles/tokens.css) as a strict **three-tier, one-way** system:

```
comp  ──▶  sys  ──▶  ref
```

| Layer | Prefix | Role | Example |
| --- | --- | --- | --- |
| **Reference** | `--sv-ref-*` | Raw atomic values (no meaning) | `--sv-ref-color-orange-500` |
| **System** | `--sv-sys-*` | Semantic roles | `--sv-sys-color-primary` |
| **Component** | `--sv-comp-*` | Component-specific | `--sv-comp-button-background-hover` |

**Rules (enforced — see [Guidelines](Strava%20design%20guideline/Strava_Guidelines.md)):**

1. Look up tokens in priority order: `comp.*` → `sys.*`. Never reference `ref.*` directly in components.
2. No hardcoded colors, sizes, or `px` in component CSS/TSX (no `p-[12px]`, no `#fc4c02`).
3. Typography is referenced as a whole typescale (size + line-height + weight together).
4. Interactive elements ship all five states: default / hover / pressed / disabled / focus-visible.

### Tailwind bridge

[`src/styles/app.css`](src/styles/app.css) maps `sys`/`comp` tokens into Tailwind's `@theme`, so utilities like `bg-primary`, `rounded-full`, `text-numeric`, `p-lg` resolve to the CSS variables. Components themselves use the `.btn`-style CSS-class pattern (one `*.css` per component) referencing tokens directly.

---

## Components

All components are token-driven, keyboard-accessible, and dark-theme native.

**Form & input** — Button · Input · Textarea · Select · Checkbox · Radio (+ RadioGroup) · Switch
**Display & navigation** — Card · Badge · Chip · Avatar · Tabs
**Overlays** — Tooltip · Popover · Modal

Each lives under `src/app/components/<Name>/` with:

```
Name.tsx            component
name.css            token-driven styles
Name.stories.tsx    Storybook stories
```

### Documentation pages

Browsable in Storybook under **Get started**, **Foundations**, and **Styles**: Design Principles, Colors, Typography, Spacing, Token Architecture.

---

## Project structure

```
src/
  styles/
    tokens.css      design tokens (ref → sys → comp)
    app.css         Tailwind entry + @theme token bridge
  app/
    components/
      <Name>/       one folder per component
      docs/         documentation pages + shared Primitives
.storybook/         Storybook config
```

---

## Conventions

- One component per folder; one `*.css` per component (token references only).
- Reuse before duplicating — if the same styled element appears 3+ times, extract a shared component.
- Missing a token? Don't invent one inline — add it to `tokens.css` at the right tier (or raise with the design lead).

---

## License

Private / unpublished. Strava branding is used for design-system demonstration only.
