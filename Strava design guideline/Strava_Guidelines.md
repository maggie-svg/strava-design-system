# Design System Guidelines

> 本文件為專案的 **強制性開發規範**。所有 UI / 元件開發（含 AI 協作）皆需嚴格遵守。
> Token 來源： [`src/styles/tokens.css`](../src/styles/tokens.css)

---

## 1. Architecture Philosophy（設計體系哲學）

### 1.1 三層結構

我們的 Design Tokens 以三層原子化結構組織，命名空間統一為 `--sv-{layer}-...`：

| Layer | 命名前綴 | 角色 | 範例 |
| --- | --- | --- | --- |
| **Reference (ref)** | `--sv-ref-*` | 原子值，定義「物理屬性」（純色票、純數值），不帶語意 | `--sv-ref-color-orange-500`, `--sv-ref-number-padding-16` |
| **System (sys)** | `--sv-sys-*` | 語意化角色，定義「在 UI 中的職責」 | `--sv-sys-color-primary`, `--sv-sys-spacing-padding-lg` |
| **Component (comp)** | `--sv-comp-*` | 元件專屬 token，鎖定到具體元件與狀態 | `--sv-comp-button-background-hover` |

### 1.2 單向繼承原則（Strict One-way Inheritance）

```
comp  ──▶  sys  ──▶  ref
```

- ✅ `comp` 可以引用 `sys`
- ✅ `sys` 可以引用 `ref`
- ❌ **禁止** 反向引用（`ref → sys`、`sys → comp`）
- ❌ **禁止** 跨層引用（`comp → ref`，元件層不可越過 sys 直接綁原子值）
- ❌ **禁止** 同層互相引用（除少數合理的別名情境，需經 review）

任何破壞此繼承方向的修改，都會讓設計系統失去抽象能力，視同 bug。

### 1.3 提取哲學（Atomization）

> 「相同的 UI 元素，只能寫一次。」

- 當「相同視覺與行為的元素」（按鈕、輸入框、卡片、Chip、Avatar 等）在 **兩個以上的頁面** 出現時，必須抽取為 `src/app/components/` 下的全域共用元件。
- **嚴禁** 在不同頁面內各自手刻一份相同樣式的 JSX/CSS。
- 元件即是「設計意圖的原子」，token 是「視覺值的原子」，兩者組合構成可組合的 UI。

---

## 2. Usage Guidelines（使用守則）

### 2.1 優先級規範（Token Lookup Priority）

開發任一元件、頁面區塊時，**依下列順序** 尋找可用 token：

1. **第一優先： `comp.*`** — 若該元件已定義專屬 token，必須使用之。
2. **第二優先： `sys.*`** — 若 `comp` 中尚未涵蓋，使用語意層 token。
3. **最後選項： `ref.*`** — **僅允許在 `tokens.css` 中** 為 `sys` / `comp` 提供原子值；元件 CSS / TSX 內 **嚴禁** 直接引用 `ref.*`。

> 例外：定義新的 `sys` 或 `comp` token 本身就是在引用 `ref`，這是合法的。

### 2.2 嚴禁 Hard-coding

- ❌ 禁止寫入任何具體數值或色票，例如：
  ```css
  /* 禁止 */
  padding: 12px;
  color: #fc4c02;
  border-radius: 8px;
  font-size: 16px;
  ```
- ✅ 必須改為引用 token：
  ```css
  padding: var(--sv-sys-spacing-padding-md);
  color: var(--sv-sys-color-primary);
  border-radius: var(--sv-sys-shape-corner-radius-sm);
  font-size: var(--sv-sys-typescale-body-font-size);
  ```
- 同樣禁止在 inline style、Tailwind 任意值（`p-[12px]`、`text-[#fc4c02]`）中夾帶 hard-coded 數值。

### 2.3 缺失處理（Missing Token Protocol）

當你找不到合適的 token 時：

1. **先停下**。不要自行揣測、不要建立臨時變數、不要 hardcode。
2. **回報並詢問** Design System Lead，描述使用情境與候選命名。
3. 由 Lead 決定：補上新的 `sys` / `comp` token，或指引使用既有 token。
4. 確認後再行實作。

> 「找不到 token」是設計系統演進的訊號，不是繞過規範的理由。

---

## 3. Component Extraction & Reuse（元件複用規範）

### 3.1 DRY 原則（Don't Repeat Yourself）

- 若 **同一段樣式邏輯出現在三處或以上**，必須立即抽取為共用元件，置於 `src/app/components/`。
- 抽取的判斷依據是「**樣式 + 行為**」是否相同，而非檔名或資料來源。
- 抽取後，原本的三處皆改為 import 同一個元件。

### 3.2 參數化設計（Parameterization）

共用元件需透過 **Props / Variant Class** 涵蓋差異，**禁止** 為每種場景複製出 `ButtonA`、`ButtonB`、`ButtonProfilePage` 等微調版本。

允許的差異化方式：

- **Props**： `variant="primary" | "secondary" | "ghost"`、`size="sm" | "md" | "lg"`、`disabled`
- **Composable Class**： `.btn` + `.btn--primary` + `.btn--lg`
- **Slots / Children**： 用 children 接收任意內容，避免為每種圖示組合開新元件

不允許：
- 為單一頁面複製整支元件後改幾個 token。
- 用 `if (page === 'X')` 在元件內分支處理頁面差異。

---

## 4. Specific Implementation Rules（具體實作規則）

### 4.1 Colors — 狀態處理

| 狀態 | 引用 Token | 說明 |
| --- | --- | --- |
| Default | `--sv-comp-button-background-default` / `--sv-sys-color-primary` | 預設狀態 |
| Hover | `--sv-comp-button-background-hover` / `--sv-sys-color-primary-hover` | 滑鼠移入提亮 |
| Pressed / Active | `--sv-comp-button-background-pressed` / `--sv-sys-color-primary-pressed` | 點擊瞬間加深 |
| Disabled | `--sv-comp-button-background-disabled` + `--sv-comp-button-label-text-color-disabled` | 同時切換背景與文字色 |
| Focus Ring | `--sv-sys-color-border-focus` + `--sv-sys-shape-border-width-focus` | 必須具備鍵盤可見焦點 |

規則：
- 狀態切換 **絕不** 透過調整 opacity 或 hardcoded 顏色實現。
- 文字 / icon 顏色必須對應背景使用 `--sv-sys-color-on-*` 系列。
- 深色背景上嚴禁出現黑色文字。

### 4.2 Spacing & Geometry

| 用途 | 規範 |
| --- | --- |
| **Padding（內距）** | 一律使用 `--sv-sys-spacing-padding-*`（xs/sm/md/lg/xl/2xl）或 `--sv-comp-{component}-padding-*` |
| **Gap（Flex/Grid）** | 一律使用 `--sv-sys-spacing-gap-*` |
| **Margin（外距）** | 偏好以父層 `gap` / `padding` 取代 margin。確需使用時，沿用 `--sv-sys-spacing-padding-*` 同一刻度 |
| **Border Radius** | 使用 `--sv-sys-shape-corner-radius-*`：藥丸/CTA → `full`；卡片 → `md`/`lg`；小型 UI → `sm` |
| **Border Width** | 使用 `--sv-sys-shape-border-width-*`，預設 `default`，focus 時切到 `focus` |

禁止項目：
- 禁止 `padding: 13px` 這類非刻度值。
- 禁止對互動元素使用 `< 6px` 的圓角；CTA / Chip / 搜尋框必須 `corner-radius-full`。

### 4.3 Typography — 字級與字重對應

| 用途 | Token 組合 |
| --- | --- |
| 一般內文、Input 文字 | `--sv-sys-typescale-body-*` (16 / 24 / 400) |
| 小標籤、metadata | `--sv-sys-typescale-label-small-*` (12 / 16 / 400) |
| 表單欄位標題、次要按鈕 | `--sv-sys-typescale-label-medium-*` (14 / 20 / 500) |
| 主要 CTA、頁面標題 | `--sv-sys-typescale-label-large-*` (24 / 36 / 500) |
| 數據展示（距離、時間、配速） | `--sv-sys-typescale-numeric-display-*` (48 / 56 / 900) |

規則：
- 字級、行高、字重 **必須三者成組** 引用同一 typescale，不得混搭。
- 數字展示 **必須** 使用 `numeric-display`（粗體 900），對應標籤文字使用 `body` 或 `label-small`，靠字重對比建立資訊階層。
- 禁止以 `font-weight: bold` / `font-size: 18px` 等 hardcode 寫法覆寫 typescale。

---

## 5. Code Examples（程式碼範例）

### 5.1 Button — 基於 Token 的標準寫法

```css
/* src/app/components/button/button.css */

.btn {
  /* Geometry */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--sv-comp-button-item-spacing);
  border: var(--sv-sys-shape-border-width-none) solid transparent;
  border-radius: var(--sv-comp-button-corner-radius);

  /* Spacing */
  padding-inline: var(--sv-comp-button-padding-left) var(--sv-comp-button-padding-right);
  padding-block:  var(--sv-comp-button-padding-top)  var(--sv-comp-button-padding-bottom);

  /* Typography */
  font-size:   var(--sv-comp-button-label-font-size);
  line-height: var(--sv-comp-button-label-line-height);
  font-weight: var(--sv-comp-button-label-font-weight);

  /* Default colors */
  background-color: var(--sv-comp-button-background-default);
  color:            var(--sv-comp-button-label-text-color);

  cursor: pointer;
  transition: background-color 120ms ease;
}

/* States */
.btn:hover    { background-color: var(--sv-comp-button-background-hover); }
.btn:active   { background-color: var(--sv-comp-button-background-pressed); }
.btn:focus-visible {
  outline: var(--sv-sys-shape-border-width-focus) solid var(--sv-sys-color-border-focus);
  outline-offset: var(--sv-sys-spacing-padding-xs);
}
.btn:disabled,
.btn[aria-disabled="true"] {
  background-color: var(--sv-comp-button-background-disabled);
  color:            var(--sv-comp-button-label-text-color-disabled);
  cursor: not-allowed;
}
```

### 5.2 共用邏輯：以 Variant Class 達成複用

**❌ 反例 — 在多個頁面重複撰寫相似按鈕：**

```tsx
// pages/profile.tsx
<button style={{ background: '#fc4c02', padding: '10px 24px', borderRadius: 999 }}>Edit</button>

// pages/feed.tsx
<button style={{ background: '#FC4C02', padding: '10px 24px', borderRadius: 999 }}>Follow</button>
```
此寫法同時違反：hardcoded 數值、未抽取共用元件、未引用 token。

**✅ 正例 — 單一 `.btn` 加上 variant / size 組合：**

```css
/* src/app/components/button/button.css 續 */

/* Variants — 切換語意角色，僅覆蓋顏色 token */
.btn--primary {
  background-color: var(--sv-comp-button-background-default);
  color:            var(--sv-comp-button-label-text-color);
}
.btn--primary:hover  { background-color: var(--sv-comp-button-background-hover); }
.btn--primary:active { background-color: var(--sv-comp-button-background-pressed); }

.btn--secondary {
  background-color: var(--sv-sys-color-surface-elevated);
  color:            var(--sv-sys-color-on-surface);
}

.btn--ghost {
  background-color: transparent;
  color:            var(--sv-sys-color-on-surface);
}

/* Sizes — 僅切換 spacing 與 typescale token */
.btn--sm {
  padding-inline: var(--sv-sys-spacing-padding-md);
  padding-block:  var(--sv-sys-spacing-padding-xs);
  font-size:      var(--sv-sys-typescale-label-medium-font-size);
  line-height:    var(--sv-sys-typescale-label-medium-line-height);
  font-weight:    var(--sv-sys-typescale-label-medium-font-weight);
}
.btn--lg {
  padding-inline: var(--sv-sys-spacing-padding-2xl);
  padding-block:  var(--sv-sys-spacing-padding-lg);
}
```

```tsx
// src/app/components/button/Button.tsx
type Variant = 'primary' | 'secondary' | 'ghost';
type Size    = 'sm' | 'md' | 'lg';

export function Button({
  variant = 'primary',
  size = 'md',
  disabled,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const className = [
    'btn',
    `btn--${variant}`,
    size !== 'md' && `btn--${size}`,
  ].filter(Boolean).join(' ');

  return (
    <button className={className} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}
```

```tsx
// 各頁面只引用同一個 Button：
<Button variant="primary">Edit</Button>
<Button variant="primary">Follow</Button>
<Button variant="secondary" size="sm">Cancel</Button>
<Button variant="ghost" disabled>Saved</Button>
```

### 5.3 檢查清單（Pull Request 自我審查）

提交 PR 前，逐項確認：

- [ ] CSS / TSX 中沒有任何 hardcoded 顏色、數值、px、rem。
- [ ] 元件 CSS 沒有直接引用 `--sv-ref-*`。
- [ ] 重複出現 ≥ 3 次的樣式塊已抽取為共用元件。
- [ ] 互動元素具備 default / hover / pressed / disabled / focus-visible 五態。
- [ ] 字級、行高、字重三者成組引用同一 typescale。
- [ ] 找不到的 token 已先詢問 Lead，未自行命名。

---

> 本規範會隨設計系統演進更新。任何規範變更或例外，須經 Design System Lead 同意並回填本文件。
