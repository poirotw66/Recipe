# 今天煮什麼

## Codex Project Guide

這個 repo 使用 Codex 協作，文件流程參考 Velnex / VIF，但不依賴 Claude plugin、Claude agents 或 `.claude/CLAUDE.md`。

## 文件結構

- `Spec.md`: 原始第一階段規格。
- `docs/prds/prd-001.md`～`prd-004.md`: 產品需求文件（**prd-004** 為內容第四批回溯登錄）。
- `docs/specs/specs-overview.md`: 全專案 spec 清單與狀態追蹤。
- `guideline/ui/ui-guideline.md`: Codex 使用的 UI/UX 設計基礎。
- `velnex.md`: 已安裝 Velnex skills 的使用說明。

## 開發流程

PRD-001～004 的 spec-001～014 已全部結案（✔️）。

- **PRD-003**（Bloom Kitchen 品牌 + UX）：2026-06-03
- **PRD-004**（100 篇、早午餐、WEBP）：2026-06-03 回溯登錄（實作先於文件）

若需第五階段，請先撰寫 **PRD-005**（`/vif-prd`），再從 `docs/specs/specs-overview.md` 展開新 spec。

已完成批次：

1. `spec-001`～`spec-007`：第一階段 MVP。
2. `spec-008`～`spec-009`：第二階段內容與 SEO。
3. `spec-010`～`spec-013`：第三階段 Bloom Kitchen 品牌與 UX。
4. `spec-014`：第四階段內容擴充（100 篇、早午餐、WEBP）。

## 技術方向

- Language: TypeScript
- Framework: Astro
- Hosting: Cloudflare Pages Free
- Content: Markdown / JSON
- Ads: Google AdSense
- Backend: none for phase 1
- Database: none for phase 1

## Commands

專案骨架尚未建立前，這些指令只是預期值；建立 Astro 專案後需以實際 `package.json` 為準。

- Build: `npm run build`
- Test: `npm test`
- Lint: `npm run lint`
- Type Check: `npx tsc --noEmit`

## Testing Strategy

- 靜態頁面：build 驗證與 route smoke check。
- SEO：檢查 sitemap、robots、canonical、meta、Open Graph。
- Structured data：檢查 Recipe / FAQ / Breadcrumb JSON-LD。
- 工具頁：冰箱剩料工具的食材比對與排序邏輯需有 unit test。

## UI/UX

UI 設計與實作需遵循 `guideline/ui/ui-guideline.md`。整體方向是台灣小廚房的冰箱便條感：溫暖、清楚、好掃讀，避免通用 SaaS 風格、紫色漸層與過度裝飾。

## Git

使用 Conventional Commits：

- `docs: ...` for documentation changes.
- `feat: ...` for user-facing features.
- `fix: ...` for bug fixes.
- `test: ...` for tests and verification.

## Codex Notes

- Velnex skills 可以當作工作流提示使用，但不要硬套 Claude 專屬規則。
- 若 skill 要求 `.claude/CLAUDE.md`，在本 repo 中改讀本檔與 `docs/` 文件。
- Spec 狀態以 `docs/specs/specs-overview.md` 為準。
