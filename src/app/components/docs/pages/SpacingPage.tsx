import { PageHeader, Section, Card, Code, Table, UsageList } from "../Primitives";

const paddingScale = [
  { name: "xs", token: "--sv-sys-spacing-padding-xs", value: 4, when: "極窄內距：Icon 與文字之間、Chip 內部緊湊組合。" },
  { name: "sm", token: "--sv-sys-spacing-padding-sm", value: 8, when: "次小內距：小按鈕、緊湊表格欄位、Toggle padding。" },
  { name: "md", token: "--sv-sys-spacing-padding-md", value: 12, when: "預設輸入元件 padding（Input vertical）、列表項內距。" },
  { name: "lg", token: "--sv-sys-spacing-padding-lg", value: 16, when: "卡片內距、區塊預設左右 padding（頁面 16–20）、Modal 內容。" },
  { name: "xl", token: "--sv-sys-spacing-padding-xl", value: 20, when: "頁面左右 padding 寬版、大型卡片內距。" },
  { name: "2xl", token: "--sv-sys-spacing-padding-2xl", value: 32, when: "大型區塊垂直分隔、Hero 區塊上下內距。" },
];

const gapScale = [
  { name: "xs", token: "--sv-sys-spacing-gap-xs", value: 4, when: "Icon 與 label、Chip 之間。" },
  { name: "sm", token: "--sv-sys-spacing-gap-sm", value: 8, when: "Button group、欄內元素群組。" },
  { name: "default", token: "--sv-sys-spacing-gap-default", value: 10, when: "Button 內部 icon-text gap（沿用既有 Button 規範）。" },
  { name: "md", token: "--sv-sys-spacing-gap-md", value: 16, when: "區塊內列表項目之間、表單欄位之間。" },
  { name: "lg", token: "--sv-sys-spacing-gap-lg", value: 24, when: "區塊與區塊之間、頁面段落之間。" },
];

export function SpacingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Spacing"
        description="間距系統以 4px 為基底，刻度由近至遠對應「元件內 → 元件間 → 區塊間 → 頁面段」四個階層。"
      />

      <Section
        title="核心邏輯"
        description="間距是資訊階層的呼吸。同一階層使用同一間距；越靠近視覺核心，間距越緊湊；越外層越寬鬆。"
      >
        <UsageList
          doItems={[
            "用 padding-xs/sm 處理元件內部（icon ↔ label、chip 內距）。",
            "用 padding-md/lg 處理元件之間或卡片內距。",
            "用 padding-xl/2xl 處理區塊或頁面段落分隔。",
            "Flex/Grid 內部請優先使用 gap，不用 margin 製造間距。",
          ]}
          dontItems={[
            "禁止使用刻度外的數值（13px、18px、22px）。",
            "禁止用 margin 互相疊加堆疊間距（用 gap / padding 取代）。",
            "禁止用 padding 充當 margin（區塊外距）反之亦然。",
            "禁止對列表項目使用 < 48px 的觸控高度。",
          ]}
        />
      </Section>

      <Section title="Padding Scale" description="容器內距（content ↔ container）。">
        <Table
          headers={["Name", "Token", "Value", "When to use", "Visual"]}
          rows={paddingScale.map((s) => [
            <strong style={{ color: "var(--sv-sys-color-on-surface)" }}>padding-{s.name}</strong>,
            <Code>{s.token}</Code>,
            <span style={{ fontFamily: "ui-monospace, monospace" }}>{s.value}px</span>,
            s.when,
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: s.value * 4,
                  height: 16,
                  background: "var(--sv-sys-color-primary)",
                  borderRadius: "var(--sv-sys-shape-corner-radius-xs)",
                }}
              />
            </div>,
          ])}
        />
      </Section>

      <Section title="Gap Scale" description="Flex / Grid 子元素之間的距離（item ↔ item）。">
        <Table
          headers={["Name", "Token", "Value", "When to use"]}
          rows={gapScale.map((s) => [
            <strong style={{ color: "var(--sv-sys-color-on-surface)" }}>gap-{s.name}</strong>,
            <Code>{s.token}</Code>,
            <span style={{ fontFamily: "ui-monospace, monospace" }}>{s.value}px</span>,
            s.when,
          ])}
        />
      </Section>

      <Section title="間距語意對照（從近到遠）" description="決定間距時，先問自己：這兩個東西在資訊階層上有多近？">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--sv-sys-spacing-gap-md)" }}>
          {[
            { level: "元件內", scale: "xs / sm (4–8px)", ex: "Icon ↔ Label" },
            { level: "元件間", scale: "md / default (10–12px)", ex: "Button group、欄位群組" },
            { level: "卡片內 / 區塊內", scale: "lg (16px)", ex: "卡片內 list 之間、表單欄位之間" },
            { level: "區塊 / 頁面段", scale: "xl / 2xl (20–32px)", ex: "區塊與區塊、Hero 上下" },
          ].map((s) => (
            <Card key={s.level}>
              <div
                style={{
                  color: "var(--sv-sys-color-primary)",
                  fontSize: "var(--sv-sys-typescale-label-small-font-size)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {s.level}
              </div>
              <div
                style={{
                  color: "var(--sv-sys-color-on-surface)",
                  fontSize: "var(--sv-sys-typescale-label-medium-font-size)",
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                {s.scale}
              </div>
              <div
                style={{
                  color: "var(--sv-sys-color-on-surface-muted)",
                  fontSize: "var(--sv-sys-typescale-label-small-font-size)",
                }}
              >
                {s.ex}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="Margin 政策" description="專案預設以父層 gap / padding 取代 margin。">
        <Card>
          <div style={{ color: "var(--sv-sys-color-on-surface-variant)", lineHeight: 1.6 }}>
            <p style={{ margin: 0, marginBottom: 12 }}>
              <strong style={{ color: "var(--sv-sys-color-on-surface)" }}>原則：</strong> 父容器負責決定子元素之間的距離（透過 <Code>gap</Code>），子元素本身不背 margin。
            </p>
            <p style={{ margin: 0, marginBottom: 12 }}>
              這能避免 margin collapse、讓元件可在不同情境重複使用、同一個 Card 在 grid / list / sidebar 中都不需要重新調 margin。
            </p>
            <p style={{ margin: 0 }}>
              <strong style={{ color: "var(--sv-sys-color-on-surface)" }}>例外：</strong> 跨容器的對齊（如 Section 與 Page header 之間），可使用 <Code>--sv-sys-spacing-padding-2xl</Code> 同刻度的 margin-bottom，但僅用於頁面排版層，不下沉到元件內部。
            </p>
          </div>
        </Card>
      </Section>
    </>
  );
}
