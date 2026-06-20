import { PageHeader, Section, Card } from "../Primitives";

const principles = [
  { n: "01", t: "Dark-First", d: "主背景接近純黑（neutral-950 / 900），佔畫面 70%。卡片以 neutral-800/700 製造層次。" },
  { n: "02", t: "Single Brand Accent", d: "Orange-500 是唯一品牌色，用於 CTA、選中狀態、圖表線條，面積控制在 5–10%。" },
  { n: "03", t: "Pill-Shaped Interactives", d: "Chips、CTA、搜尋欄使用 corner-radius-full；卡片使用 md/lg；嚴禁互動元素使用 < 6px。" },
  { n: "04", t: "Heavy Numeric Contrast", d: "關鍵數據使用 numeric-display（48 / 900）；標籤使用 body / label-small（400），靠字重對比建立階層。" },
  { n: "05", t: "Generous Spacing", d: "頁面左右 16–20px、區塊垂直間距 ≥ 16px、列表觸控目標 ≥ 48px。" },
  { n: "06", t: "Depth Over Borders", d: "用背景色差取代邊框分隔；如需邊框，使用 transparent-white-08 / 10。" },
  { n: "07", t: "Branded Charts", d: "折線使用 orange-500、寬度 2–3px、低透明度漸層填充；座標軸使用 transparent-white-10。" },
];

export function PrinciplesPage() {
  return (
    <>
      <PageHeader eyebrow="Get started" title="Design Principles" description="七條核心原則指引所有 UI 決策。新元件設計與既有元件演進皆以此為驗收基準。" />
      <Section title="七條原則">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "var(--sv-sys-spacing-gap-md)" }}>
          {principles.map((p) => (
            <Card key={p.n}>
              <div
                style={{
                  color: "var(--sv-sys-color-primary)",
                  fontSize: 32,
                  fontWeight: 900,
                  lineHeight: 1,
                  marginBottom: "var(--sv-sys-spacing-padding-sm)",
                }}
              >
                {p.n}
              </div>
              <div
                style={{
                  color: "var(--sv-sys-color-on-surface)",
                  fontSize: "var(--sv-sys-typescale-label-large-font-size)",
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                {p.t}
              </div>
              <div
                style={{
                  color: "var(--sv-sys-color-on-surface-variant)",
                  fontSize: "var(--sv-sys-typescale-body-font-size)",
                  lineHeight: "var(--sv-sys-typescale-body-line-height)",
                }}
              >
                {p.d}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
