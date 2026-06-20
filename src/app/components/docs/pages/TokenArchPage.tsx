import { PageHeader, Section, Card, UsageList } from "../Primitives";

export function TokenArchPage() {
  return (
    <>
      <PageHeader
        eyebrow="Styles"
        title="Token Architecture"
        description="三層單向繼承：comp → sys → ref。理解這張圖，才能在元件中正確選用 token。"
      />

      <Section title="繼承圖" description="箭頭代表「引用」方向；嚴禁逆向或跨層引用。">
        <Card padding="xl">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 32px 1fr 32px 1fr", alignItems: "center", gap: 0 }}>
            {[
              { layer: "comp", color: "var(--sv-sys-color-primary)", desc: "元件專屬", ex: "--sv-comp-button-background-hover" },
              { layer: "sys", color: "var(--sv-sys-color-on-surface)", desc: "語意角色", ex: "--sv-sys-color-primary-hover" },
              { layer: "ref", color: "var(--sv-sys-color-on-surface-variant)", desc: "原子值", ex: "--sv-ref-color-orange-400" },
            ].map((l, i) => (
              <div key={l.layer} style={{ display: "contents" }}>
                <div
                  style={{
                    background: "var(--sv-sys-color-surface-elevated)",
                    border: "var(--sv-sys-shape-border-width-default) solid var(--sv-sys-color-border-subtle)",
                    borderRadius: "var(--sv-sys-shape-corner-radius-md)",
                    padding: "var(--sv-sys-spacing-padding-lg)",
                    textAlign: "center",
                  }}
                >
                  <div style={{ color: l.color, fontWeight: 900, fontSize: 28, marginBottom: 8 }}>{l.layer}</div>
                  <div style={{ color: "var(--sv-sys-color-on-surface-variant)", marginBottom: 8 }}>{l.desc}</div>
                  <div style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: "var(--sv-sys-color-on-surface-muted)" }}>{l.ex}</div>
                </div>
                {i < 2 && (
                  <div style={{ textAlign: "center", color: "var(--sv-sys-color-primary)", fontSize: 24, fontWeight: 900 }}>→</div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </Section>

      <Section title="優先級規則">
        <UsageList
          doItems={[
            "第一優先：使用 comp.* token（已綁定到具體元件與狀態）。",
            "第二優先：使用 sys.* token（語意化角色）。",
            "ref.* 僅允許在 tokens.css 中為 sys / comp 提供原子值。",
          ]}
          dontItems={[
            "禁止在元件 CSS / TSX 中直接引用 ref.*。",
            "禁止 comp 跨過 sys 直接綁 ref（會破壞中間層的彈性）。",
            "禁止同層互相引用（comp → comp）造成耦合。",
          ]}
        />
      </Section>

      <Section title="範例：一個按鈕的 token 鏈">
        <Card>
          <pre
            style={{
              margin: 0,
              padding: 0,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 13,
              lineHeight: 1.7,
              color: "var(--sv-sys-color-on-surface-variant)",
              overflowX: "auto",
            }}
          >
{`/* 元件層使用 comp token */
.btn:hover {
  background: var(--sv-comp-button-background-hover);
}

/* tokens.css 中 comp 引用 sys */
--sv-comp-button-background-hover: var(--sv-sys-color-primary-hover);

/* sys 引用 ref */
--sv-sys-color-primary-hover: var(--sv-ref-color-orange-400);

/* ref 是純值 */
--sv-ref-color-orange-400: #ff6f31;`}
          </pre>
        </Card>
      </Section>
    </>
  );
}
