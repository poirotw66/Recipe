# Velnex Skills 使用說明

本文件整理 `velnex/` 內已安裝到 Codex 的 skills。這些 skills 主要分成兩組：

- `vif-*`: Velocity AI Flow，負責需求、規格、開發、驗證、審查到收尾的 AI 開發流程。
- `vul-*`: Vulnerability Unified Lifecycle，負責漏洞掃描分析、決策、修復、PR 與清理。

在 Codex 中使用時，可以直接用自然語言描述你的需求，也可以明確提到 skill 名稱，例如：

```text
使用 vif-prd 幫我整理這個新需求的 PRD
用 vif-spec 針對 Spec.md 做技術規劃
用 vul-analyze 下載並分析漏洞掃描報告
```

> 注意：`velnex/plugins/vex` 目前提供的是 Claude/Cursor agent，不是 Codex skill 格式，因此未列入本文件。

## 建議流程

### 一般功能開發

1. `vif-prd`: 釐清產品需求與問題定義。
2. `vif-bdd`: 用 BDD / Example Mapping 補齊行為規格。
3. `vif-uiux`: 建立或調整 UI/UX 基礎規範。
4. `vif-prototype`: 需要先看畫面時，產出 HTML prototype。
5. `vif-arch`: 做架構決策與 ADR。
6. `vif-spec`: 做技術規劃、影響分析與開發範圍切分。
7. `vif-api-spec`: 撰寫 API、OpenAPI 與 DB schema 規格。
8. `vif-ui-spec`: 撰寫頁面與元件規格。
9. `vif-develop`: 依規格進行 TDD 開發。
10. `vif-verify`: 跑自動化驗證與品質檢查。
11. `vif-review`: 做規格符合度與程式碼品質審查。
12. `vif-close`: 收尾、文件同步、確認可合併。

### 漏洞處理

1. `vul-analyze`: 下載並分析漏洞掃描報告。
2. `vul-decision`: 判斷每個漏洞要修、暫不修或接受風險。
3. `vul-fix`: 依決策報告修復漏洞。
4. `vul-pr`: 建立漏洞修復 PR。
5. `vul-cleanup`: 清理漏洞修復用的 worktree。

## VIF Skills

### vif-flow

**用途**：VIF 開發流程總控與階段判斷。當你不確定下一步該做 PRD、Spec、開發、驗證還是審查時使用。

**適合情境**：

- 新功能剛開始，需要判斷應進入哪個 phase。
- 想初始化或檢查專案流程結構。
- 想讓 Codex 依目前上下文建議下一步。
- 需要了解 VIF 的 Solo、企業輔助、God Mode 等流程模式。

**可這樣說**：

```text
用 vif-flow 幫我判斷這個需求下一步該做什麼
用 vif-flow 檢查目前專案流程是否完整
```

**常見產出**：流程階段判斷、下一步建議、workspace 結構檢查、phase gate 說明。

### vif-prd

**用途**：撰寫或整理 Product Requirements Document，聚焦「為什麼要做、解決什麼問題、成功標準是什麼」。

**適合情境**：

- 有新需求，但問題與目標還不夠清楚。
- 需要把口頭需求整理成 PRD。
- 需要補齊使用者、情境、價值、範圍與驗收方向。

**可這樣說**：

```text
用 vif-prd 幫我根據這段需求寫 PRD
用 vif-prd 檢查 Spec.md 前是否缺 PRD
```

**常見輸入**：需求描述、使用者故事、現有文件、業務背景。

**常見產出**：PRD 草稿、問題定義、目標與非目標、成功指標、待確認問題。

### vif-bdd

**用途**：BDD Discovery、Example Mapping 與 Gherkin feature 撰寫。

**適合情境**：

- 需求需要轉成具體行為案例。
- 想用 Given / When / Then 描述驗收條件。
- 想從 business、rules、examples 三個角度釐清功能。

**可這樣說**：

```text
用 vif-bdd 幫我把這個需求整理成 Gherkin
用 vif-bdd 做 Example Mapping
```

**常見產出**：Example Mapping、`.feature` 檔內容、行為規格與驗收案例。

### vif-uiux

**用途**：建立或調整 UI/UX 設計基礎，例如 design system、色系、字型、版面、design tokens。

**適合情境**：

- 專案剛開始，需要定義 UI 風格。
- 既有 UI 需要設計規範化。
- 需要整理元件層級、token、layout、互動原則。

**可這樣說**：

```text
用 vif-uiux 幫我建立這個系統的 UI guideline
用 vif-uiux 檢查目前畫面風格是否一致
```

**常見產出**：UI guideline、design token 建議、版面與互動原則、設計調整建議。

### vif-prototype

**用途**：產出互動式 HTML prototype，讓需求方先看畫面與流程。

**適合情境**：

- 需求還在討論，需要先做畫面原型。
- 想快速驗證 layout、資訊架構或操作流程。
- 有 PRD 或草稿，想轉成可互動 prototype。

**可這樣說**：

```text
用 vif-prototype 幫我做一版 HTML 原型
用 vif-prototype 根據 PRD 產出頁面 mockup
```

**常見輸入**：PRD、流程描述、頁面清單、既有 UI guideline。

**常見產出**：HTML prototype、頁面互動草稿、可回饋的畫面方案。

### vif-arch

**用途**：架構決策、技術選型與 ADR 紀錄。

**適合情境**：

- 新專案或新模組需要決定架構。
- 要比較技術方案或記錄取捨。
- 需要留下 ADR，說明為何選擇某個方案。

**可這樣說**：

```text
用 vif-arch 幫我整理這個功能的架構決策
用 vif-arch 寫一份 ADR
```

**常見產出**：架構建議、技術選型比較、ADR、風險與替代方案。

### vif-spec

**用途**：技術規格與影響分析，將需求轉成可開發的設計文件。

**適合情境**：

- PRD 已大致確認，準備進入技術規劃。
- 需要分析會影響哪些頁面、API、資料表、批次或外部系統。
- 需要拆解開發範圍與風險。

**可這樣說**：

```text
用 vif-spec 針對 Spec.md 做技術規劃
用 vif-spec 幫我做影響分析與實作範圍切分
```

**常見輸入**：PRD、既有 Spec、程式碼結構、系統背景。

**常見產出**：技術規格、影響分析、scope、風險、待確認問題。

### vif-api-spec

**用途**：API specification、OpenAPI / Swagger 與 DB schema 規格撰寫。

**適合情境**：

- 需要設計或調整後端 API。
- 需要補 OpenAPI / Swagger。
- 需要規劃資料表、欄位、關聯與 migration。

**可這樣說**：

```text
用 vif-api-spec 幫我設計這個功能的 API
用 vif-api-spec 根據 Spec.md 補 openapi.yaml 和 DB schema
```

**常見產出**：API 規格、request / response、錯誤碼、OpenAPI 更新建議、DB schema 設計。

### vif-ui-spec

**用途**：UI page / component specification，將畫面需求轉成前端可實作規格。

**適合情境**：

- 已有 Figma、prototype 或 PRD，需要前端規格。
- 需要定義頁面狀態、欄位、互動、錯誤處理、空狀態。
- 需要把使用者流程落成頁面與元件規格。

**可這樣說**：

```text
用 vif-ui-spec 幫我寫頁面規格
用 vif-ui-spec 根據 prototype 產出前端實作規格
```

**常見產出**：頁面規格、元件規格、互動狀態、驗收條件、前端實作注意事項。

### vif-guideline

**用途**：解析並套用專案規範，例如 coding standard、目錄慣例、測試規範、命名規則。

**適合情境**：

- 開發前需要讀取專案規範。
- 不確定某個任務應遵守哪些 guideline。
- 想讓 Codex 先找出相關規範再實作。

**可這樣說**：

```text
用 vif-guideline 幫我找這個任務要遵守的規範
用 vif-guideline 讀取專案 coding standard
```

**常見產出**：適用 guideline 清單、規範摘要、任務上下文中的規範提醒。

### vif-develop

**用途**：TDD 開發流程，依規格進行 RED / GREEN / REFACTOR。

**適合情境**：

- Spec 與設計文件已準備好，開始實作。
- 需要先寫測試，再逐步讓測試通過。
- 需要把任務拆成可執行的開發步驟。

**可這樣說**：

```text
用 vif-develop 依 Spec.md 開始實作
用 vif-develop 走 TDD 幫我完成這個功能
```

**常見輸入**：Spec、API/UI spec、BDD feature、既有程式碼。

**常見產出**：測試策略、測試碼、實作碼、重構建議、開發進度紀錄。

### vif-verify

**用途**：自動化驗證 pipeline，負責 build、test、lint、品質檢查與 pre-review check。

**適合情境**：

- 功能實作後要確認是否可交付。
- PR 前要跑品質檢查。
- 需要整理驗證結果與失敗項目。

**可這樣說**：

```text
用 vif-verify 幫我跑驗證
用 vif-verify 檢查這次改動是否通過 build/test/lint
```

**常見產出**：驗證報告、失敗原因、修復建議、可否進入 review 的判斷。

### vif-review

**用途**：兩階段 code review，先看規格符合度，再看程式碼品質。

**適合情境**：

- PR 前要審查程式碼。
- 需要確認實作是否符合 Spec / API Spec / UI Spec。
- 需要找 bug、風險、缺測試、可維護性問題。

**可這樣說**：

```text
用 vif-review 幫我 review 這次改動
用 vif-review 檢查是否符合 Spec.md
```

**常見產出**：依嚴重度排序的 review findings、缺失風險、測試缺口、改善建議。

### vif-close

**用途**：開發完成收尾，確認文件、驗證、審查、版控與合併準備狀態。

**適合情境**：

- 功能已完成，要準備 merge。
- 需要同步設計文件、進度文件或 completion checklist。
- 需要確認還有沒有未完成項目。

**可這樣說**：

```text
用 vif-close 幫我做收尾檢查
用 vif-close 確認這個功能是否 merge ready
```

**常見產出**：completion checklist、文件同步結果、剩餘風險、merge readiness。

### vif-god

**用途**：God Mode，一次編排 Spec -> Design -> Develop -> Verify -> Review。

**適合情境**：

- PRD 已 approved，希望從規格一路做到 review。
- 想讓 Codex 按 VIF phase 自動推進。
- 任務範圍明確，且允許較高自主度。

**可這樣說**：

```text
用 vif-god 根據已核准 PRD 一路做到 review
用 vif-god 幫我全自動完成這個功能
```

**使用提醒**：God Mode 是編排器，適合需求清楚、風險可控的任務。若需求仍模糊，先用 `vif-prd` 或 `vif-spec`。

## VUL Skills

### vul-analyze

**用途**：從 GCS 下載漏洞掃描報告，分析 Checkmarx、Mend 與 Docker image 類型的掃描結果。

**適合情境**：

- 要分析安全掃描報告。
- 要從 GCS 下載掃描結果。
- 要產出漏洞分析報告，供後續決策與修復使用。

**可這樣說**：

```text
用 vul-analyze 下載並分析漏洞掃描報告
用 vul-analyze 分析 Checkmarx 和 Mend 結果
```

**常見前置條件**：

- 目前目錄是 Git repository。
- 已設定 `gsutil` 或可存取 GCS。
- `.claude/CLAUDE.md` 或環境變數中有 scan bucket / scan branch 設定。

**常見產出**：漏洞分析報告、依工具分類的問題清單、後續處理建議。

### vul-decision

**用途**：根據漏洞分析報告決定處理策略，記錄「修復、暫不修、接受風險」與理由。

**適合情境**：

- 已有 `vul-analyze` 的分析結果。
- 需要判斷哪些漏洞真的要修。
- 需要留下審計可追蹤的決策紀錄。

**可這樣說**：

```text
用 vul-decision 審查漏洞分析報告
用 vul-decision 幫我決定哪些漏洞要修
```

**常見產出**：漏洞決策報告、修復清單、不修理由、風險接受紀錄。

### vul-fix

**用途**：依照決策報告進行漏洞修復，涵蓋程式碼漏洞、套件漏洞與 image 漏洞。

**適合情境**：

- 已完成 `vul-decision`。
- 需要實際修改程式碼、套件版本或容器設定。
- 需要產出修復摘要。

**可這樣說**：

```text
用 vul-fix 依決策報告修復漏洞
用 vul-fix 修 Checkmarx 和 Mend 問題
```

**常見產出**：修復後的程式碼或設定、測試/驗證結果、fix summary。

### vul-pr

**用途**：為漏洞修復建立 Pull Request，支援 Azure DevOps 與 GitHub。

**適合情境**：

- 漏洞已修完，需要提交審核。
- 需要根據修復結果整理 PR 標題與內容。
- 需要依平台建立 PR。

**可這樣說**：

```text
用 vul-pr 幫我建立漏洞修復 PR
用 vul-pr 整理這次漏洞修復的 PR 描述
```

**常見產出**：PR 標題、PR body、平台偵測結果、建立 PR 的操作結果。

### vul-cleanup

**用途**：管理與清理漏洞修復用的 Git worktree。

**適合情境**：

- 漏洞修復 PR 已處理完，要清掉 worktree。
- 想列出目前所有漏洞修復 worktree。
- 想確認哪些 worktree 可以刪除。

**可這樣說**：

```text
用 vul-cleanup 幫我清理漏洞修復 worktree
用 vul-cleanup 列出目前所有 worktree 狀態
```

**常見產出**：worktree 清單、PR 狀態檢查、可刪除項目、清理結果。

## 快速選擇表

| 我想做的事 | 使用 skill |
| --- | --- |
| 不知道下一步該做什麼 | `vif-flow` |
| 寫產品需求 | `vif-prd` |
| 寫 BDD / Gherkin | `vif-bdd` |
| 建 UI/UX 規範 | `vif-uiux` |
| 做 HTML 原型 | `vif-prototype` |
| 做架構決策 / ADR | `vif-arch` |
| 做技術規格與影響分析 | `vif-spec` |
| 寫 API / OpenAPI / DB schema | `vif-api-spec` |
| 寫頁面與元件規格 | `vif-ui-spec` |
| 找專案開發規範 | `vif-guideline` |
| 開始 TDD 實作 | `vif-develop` |
| 跑驗證 | `vif-verify` |
| 做 code review | `vif-review` |
| 功能收尾 | `vif-close` |
| 從 PRD 一路自動做到 review | `vif-god` |
| 分析漏洞掃描報告 | `vul-analyze` |
| 決定漏洞處理策略 | `vul-decision` |
| 修復漏洞 | `vul-fix` |
| 建漏洞修復 PR | `vul-pr` |
| 清理漏洞 worktree | `vul-cleanup` |
