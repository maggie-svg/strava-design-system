import { PageHeader, Section, Card, Code, Table, UsageList } from "../Primitives";

const scales = [
  {
    name: "Numeric Display",
    tokenPrefix: "--sv-sys-typescale-numeric-display",
    size: 48,
    line: 56,
    weight: 900,
    when: "核心數據展示：距離、時間、配速、心率、卡路里。",
    examples: ["12.4 km", "01:23:45", "5'30\"/km"],
    do: "與小字級的 metric label（label-small）成對使用，建立粗細對比。",
    dont: "不用於一般標題；不用於正文裡的數字。",
  },
  {
    name: "Label Large",
    tokenPrefix: "--sv-sys-typescale-label-large",
    size: 24,
    line: 36,
    weight: 500,
    when: "頁面 / 區塊大標題，主要 CTA 按鈕文字。",
    examples: ["Recent Activities", "Start Workout"],
    do: "頁面 H1、Modal 標題、主要 CTA 按鈕。",
    dont: "不用於正文；不用於小型 chip。",
  },
  {
    name: "Label Medium",
    tokenPrefix: "--sv-sys-typescale-label-medium",
    size: 14,
    line: 20,
    weight: 500,
    when: "次要按鈕、表單欄位標題、Tab 標籤、Chip。",
    examples: ["Distance", "Following", "All", "This week"],
    do: "Form Label、Filter Chip、Tab。",
    dont: "不用於正文段落（會顯得擁擠）。",
  },
  {
    name: "Label Small",
    tokenPrefix: "--sv-sys-typescale-label-small",
    size: 12,
    line: 16,
    weight: 400,
    when: "metadata、輔助提示、徽章、圖表座標軸標籤、卡片角落時間戳。",
    examples: ["3 hours ago", "v1.2.0", "12 km · 1:05:00"],
    do: "輔助文字、列表項時間戳、helper text。",
    dont: "不作為唯一資訊承載（過小，可讀性低）。",
  },
  {
    name: "Body",
    tokenPrefix: "--sv-sys-typescale-body",
    size: 16,
    line: 24,
    weight: 400,
    when: "段落內文、Input 輸入文字、長敘述內容。",
    examples: ["Your weekly summary is ready to view…"],
    do: "卡片內描述、設定頁說明、Input value。",
    dont: "不用於數據展示；不要把 body 加粗來偽裝標題。",
  },
];

export function TypographyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Typography"
        description="字體系統以「字級 + 行高 + 字重」三屬性成組（typescale）為單位。所有文字必須引用整組 typescale，不得獨立調整其中一項。"
      />

      <Section
        title="核心邏輯"
        description="資訊階層由「字重對比」建立，而非靠多種顏色。深色主題下，主文白色 + 次要灰色 + 數字粗黑就足以撐起層次。"
      >
        <UsageList
          doItems={[
            "整組引用 typescale，例如 body 的 font-size / line-height / font-weight 必須三者一起。",
            "數據（距離、時間）使用 numeric-display（900）；對應標籤使用 label-small（400）建立對比。",
            "主要文字 on-surface（白）、次要文字 on-surface-variant（淺灰），用顏色而非字級表達次要性。",
          ]}
          dontItems={[
            "禁止 font-weight: bold 直接覆寫；改用更高層級的 typescale。",
            "禁止使用未定義的字級（17px、22px）；只能使用刻度上的數值。",
            "禁止以放大或縮小 typescale 表達強調；強調靠顏色或粗細層級切換。",
          ]}
        />
      </Section>

      <Section title="Type Scale" description="所有可用的字級組合與其應用場景。">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sv-sys-spacing-gap-md)" }}>
          {scales.map((s) => (
            <Card key={s.name}>
              <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 320px) 1fr", gap: "var(--sv-sys-spacing-padding-xl)", alignItems: "start" }}>
                <div>
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
                    {s.name}
                  </div>
                  <div
                    style={{
                      color: "var(--sv-sys-color-on-surface)",
                      fontSize: s.size,
                      lineHeight: `${s.line}px`,
                      fontWeight: s.weight,
                    }}
                  >
                    {s.examples[0]}
                  </div>
                  <div
                    style={{
                      color: "var(--sv-sys-color-on-surface-muted)",
                      fontSize: "var(--sv-sys-typescale-label-small-font-size)",
                      marginTop: "var(--sv-sys-spacing-padding-sm)",
                      fontFamily: "ui-monospace, monospace",
                    }}
                  >
                    {s.size}px / {s.line}px / {s.weight}
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      color: "var(--sv-sys-color-on-surface-variant)",
                      marginBottom: "var(--sv-sys-spacing-padding-sm)",
                    }}
                  >
                    <strong style={{ color: "var(--sv-sys-color-on-surface)" }}>When：</strong> {s.when}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: "var(--sv-sys-spacing-padding-md)" }}>
                    {s.examples.map((e) => (
                      <span
                        key={e}
                        style={{
                          padding: "4px 12px",
                          background: "var(--sv-sys-color-surface-elevated)",
                          borderRadius: "var(--sv-sys-shape-corner-radius-full)",
                          fontSize: "var(--sv-sys-typescale-label-small-font-size)",
                          color: "var(--sv-sys-color-on-surface-variant)",
                        }}
                      >
                        {e}
                      </span>
                    ))}
                  </div>
                  <div style={{ color: "var(--sv-sys-color-success)", fontSize: "var(--sv-sys-typescale-label-small-font-size)" }}>✓ {s.do}</div>
                  <div style={{ color: "var(--sv-sys-color-error)", fontSize: "var(--sv-sys-typescale-label-small-font-size)", marginTop: 4 }}>✗ {s.dont}</div>
                  <div style={{ marginTop: "var(--sv-sys-spacing-padding-sm)" }}>
                    <Code>{s.tokenPrefix}-font-size</Code>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section title="字重原子（ref.font-weight）" description="不可在元件中直接引用，僅供 typescale 組合使用。">
        <Table
          headers={["Weight", "Token", "用途"]}
          rows={[
            ["400", <Code>--sv-ref-number-font-weight-regular</Code>, "正文、Input、輔助文字"],
            ["500", <Code>--sv-ref-number-font-weight-medium</Code>, "Label、按鈕、表單欄位標題"],
            ["700", <Code>--sv-ref-number-font-weight-bold</Code>, "區塊強調標題"],
            ["900", <Code>--sv-ref-number-font-weight-black</Code>, "數據展示（numeric-display）"],
          ]}
        />
      </Section>
    </>
  );
}
