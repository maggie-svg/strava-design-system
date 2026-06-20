import { PageHeader, Section, Card, Code, Table, UsageList } from "../Primitives";

const semanticRoles = [
  {
    role: "Background",
    token: "--sv-sys-color-background",
    when: "整個畫面的最底層背景。",
    do: "用於 <body> / 頁面最外層容器。",
    dont: "不用於任何浮起內容（卡片、Modal、Tooltip）。",
  },
  {
    role: "Surface",
    token: "--sv-sys-color-surface",
    when: "卡片、區塊容器、Input 背景。比 background 亮一階，用於承載內容。",
    do: "卡片、表單欄位、列表項目背景。",
    dont: "不直接用於頁面背景；不要與 background 同階使用造成扁平。",
  },
  {
    role: "Surface Elevated",
    token: "--sv-sys-color-surface-elevated",
    when: "需要再浮起一層的元素：Modal、Popover、Dropdown、Sticky Header。",
    do: "視覺需與下層 surface 區隔的浮層。",
    dont: "不取代 surface 作為一般卡片背景。",
  },
  {
    role: "Primary",
    token: "--sv-sys-color-primary",
    when: "唯一品牌互動色。主要 CTA、選中標籤、品牌圖示、圖表主線。",
    do: "整頁僅 1–2 處主要動作；當前選中標籤；橙色品牌徽章。",
    dont: "不用於整片大面積背景；不用於次要按鈕；不用於純文字段落。",
  },
  {
    role: "Primary Hover / Pressed",
    token: "--sv-sys-color-primary-hover / -pressed",
    when: "Primary 元件的互動狀態切換。",
    do: ":hover → primary-hover（提亮）；:active → primary-pressed（加深）。",
    dont: "不要用 opacity 製造 hover；不要 hardcode 顏色。",
  },
  {
    role: "Primary Disabled",
    token: "--sv-sys-color-primary-disabled",
    when: "禁用狀態的主要按鈕背景。",
    do: "搭配 on-primary-disabled 同時切換背景與文字。",
    dont: "不要僅降低 opacity 表達 disabled。",
  },
  {
    role: "On Primary",
    token: "--sv-sys-color-on-primary",
    when: "放置在 primary 背景上的文字 / icon。",
    do: "Primary 按鈕的 label。",
    dont: "不用於 surface / background 上的文字。",
  },
  {
    role: "On Surface",
    token: "--sv-sys-color-on-surface",
    when: "surface 上的主要文字（標題、核心內容、Input 輸入文字）。",
    do: "標題、數據、主要段落。",
    dont: "深色背景上嚴禁使用黑色文字。",
  },
  {
    role: "On Surface Variant",
    token: "--sv-sys-color-on-surface-variant",
    when: "次要說明、輔助資訊、表格內文。",
    do: "副標、metadata、列表中的描述文字。",
    dont: "不用於主要 CTA 文字。",
  },
  {
    role: "On Surface Muted",
    token: "--sv-sys-color-on-surface-muted",
    when: "更弱的輔助文字、disabled 文字、placeholder 之上的提示。",
    do: "圖表座標軸標籤、disabled 標題。",
    dont: "不用於關鍵資訊或正文閱讀。",
  },
  {
    role: "Border Subtle",
    token: "--sv-sys-color-border-subtle",
    when: "幾乎不可見的分隔線（rgba 白 8%）。",
    do: "卡片之間、列表 row 之間的視覺結構。",
    dont: "不用於需要明顯分隔的 Input border。",
  },
  {
    role: "Border Default",
    token: "--sv-sys-color-border-default",
    when: "Input、可互動容器的預設邊框。",
    do: "Input、Select、Textarea 預設外框。",
    dont: "不用於卡片裝飾邊（卡片優先以背景層次取代邊框）。",
  },
  {
    role: "Border Focus",
    token: "--sv-sys-color-border-focus",
    when: "鍵盤焦點 / Input 取得焦點時的高亮。等同 primary。",
    do: "搭配 border-width-focus 形成 focus ring。",
    dont: "不用於 hover；hover 改變背景而非邊框。",
  },
  {
    role: "Success",
    token: "--sv-sys-color-success",
    when: "完成、成功提示、上升趨勢、達成目標。",
    do: "Toast 成功訊息、達成徽章、上升箭頭。",
    dont: "不用於主要 CTA（CTA 一律使用 primary）。",
  },
  {
    role: "Warning",
    token: "--sv-sys-color-warning",
    when: "提醒但非錯誤的訊息：未同步、即將過期、資料不完整。",
    do: "Banner 警告、未完成欄位提示。",
    dont: "不用於破壞性確認（改用 error）。",
  },
  {
    role: "Error",
    token: "--sv-sys-color-error",
    when: "錯誤訊息、表單驗證失敗、破壞性動作（刪除）。",
    do: "Form helper text 錯誤狀態、刪除確認的強調。",
    dont: "不用於一般警告或非錯誤的紅色裝飾。",
  },
  {
    role: "Placeholder",
    token: "--sv-sys-color-placeholder",
    when: "Input / Textarea / Search 的提示文字。",
    do: "Search bar 提示「Search activities…」。",
    dont: "不用於正常文字內容。",
  },
];

function Swatch({ varName, label }: { varName: string; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div
        style={{
          height: 64,
          borderRadius: "var(--sv-sys-shape-corner-radius-md)",
          background: `var(${varName})`,
          border: "var(--sv-sys-shape-border-width-default) solid var(--sv-sys-color-border-subtle)",
        }}
      />
      <div
        style={{
          color: "var(--sv-sys-color-on-surface)",
          fontSize: "var(--sv-sys-typescale-label-medium-font-size)",
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div
        style={{
          color: "var(--sv-sys-color-on-surface-muted)",
          fontSize: "var(--sv-sys-typescale-label-small-font-size)",
          fontFamily: "ui-monospace, monospace",
        }}
      >
        {varName}
      </div>
    </div>
  );
}

const refScales: { name: string; tokens: string[] }[] = [
  { name: "Neutral", tokens: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900", "950"] },
  { name: "Orange (Brand)", tokens: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] },
  { name: "Green (Success)", tokens: ["100", "300", "500", "700", "900"] },
  { name: "Yellow (Warning)", tokens: ["100", "300", "500", "700", "900"] },
  { name: "Red (Error)", tokens: ["100", "300", "500", "700", "900"] },
];

export function ColorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Foundations"
        title="Colors"
        description="顏色系統由 ref（色階）→ sys（語意角色）→ comp（元件專屬）三層組成。UI 開發請優先使用 sys.* 與 comp.*。"
      />

      <Section
        title="使用原則"
        description="在你寫下任何顏色之前，先確認語意（在 UI 中扮演什麼角色），而不是先選色票。"
      >
        <UsageList
          doItems={[
            "依據語意選用 sys.color.* — 例如「主要動作」一律用 primary，不論在哪個畫面。",
            "在深色背景上使用 on-surface / on-surface-variant，永遠不使用黑色。",
            "Hover 改變背景顏色（primary-hover），而不是改 opacity。",
            "需要分隔感時優先使用背景層次（surface vs background），最後才考慮 border-subtle。",
          ]}
          dontItems={[
            "禁止直接引用 ref.color.*（除非你正在定義 sys 或 comp token）。",
            "禁止 hardcode 色票（#fc4c02、rgba(...)）。",
            "禁止把 success / error 當作裝飾色任意使用。",
            "禁止讓 primary 大面積平塗，控制在畫面 5–10%。",
          ]}
        />
      </Section>

      <Section title="Semantic Roles（sys.color.*）" description="這是元件開發時最常引用的一層。先讀完整個對照表，再開始實作。">
        <Table
          headers={["Role", "Token", "When to use", "Do / Don't"]}
          rows={semanticRoles.map((r) => [
            <strong style={{ color: "var(--sv-sys-color-on-surface)" }}>{r.role}</strong>,
            <Code>{r.token}</Code>,
            r.when,
            <div>
              <div style={{ color: "var(--sv-sys-color-success)" }}>✓ {r.do}</div>
              <div style={{ color: "var(--sv-sys-color-error)", marginTop: 4 }}>✗ {r.dont}</div>
            </div>,
          ])}
        />
      </Section>

      <Section title="關鍵語意色預覽">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "var(--sv-sys-spacing-gap-md)" }}>
          <Swatch varName="--sv-sys-color-background" label="Background" />
          <Swatch varName="--sv-sys-color-surface" label="Surface" />
          <Swatch varName="--sv-sys-color-surface-elevated" label="Surface Elevated" />
          <Swatch varName="--sv-sys-color-primary" label="Primary" />
          <Swatch varName="--sv-sys-color-primary-hover" label="Primary Hover" />
          <Swatch varName="--sv-sys-color-primary-pressed" label="Primary Pressed" />
          <Swatch varName="--sv-sys-color-success" label="Success" />
          <Swatch varName="--sv-sys-color-warning" label="Warning" />
          <Swatch varName="--sv-sys-color-error" label="Error" />
          <Swatch varName="--sv-sys-color-border-subtle" label="Border Subtle" />
          <Swatch varName="--sv-sys-color-border-default" label="Border Default" />
          <Swatch varName="--sv-sys-color-border-focus" label="Border Focus" />
        </div>
      </Section>

      <Section title="Reference Palette（ref.color.*）" description="原子色階。僅供 sys / comp token 引用，元件中嚴禁直接使用。">
        <div style={{ display: "flex", flexDirection: "column", gap: "var(--sv-sys-spacing-gap-md)" }}>
          {refScales.map((scale) => (
            <Card key={scale.name}>
              <div
                style={{
                  color: "var(--sv-sys-color-on-surface)",
                  fontWeight: 700,
                  marginBottom: "var(--sv-sys-spacing-padding-md)",
                }}
              >
                {scale.name}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: `repeat(${scale.tokens.length}, 1fr)`, gap: 8 }}>
                {scale.tokens.map((t) => {
                  const cssVar = `--sv-ref-color-${scale.name.toLowerCase().split(" ")[0]}-${t}`;
                  return (
                    <div key={t} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <div
                        style={{
                          height: 48,
                          borderRadius: "var(--sv-sys-shape-corner-radius-sm)",
                          background: `var(${cssVar})`,
                          border: "var(--sv-sys-shape-border-width-default) solid var(--sv-sys-color-border-subtle)",
                        }}
                      />
                      <div
                        style={{
                          color: "var(--sv-sys-color-on-surface-muted)",
                          fontSize: "var(--sv-sys-typescale-label-small-font-size)",
                          textAlign: "center",
                        }}
                      >
                        {t}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </>
  );
}
