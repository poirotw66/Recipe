# AdSense 送審檢查清單（spec-019）

網域：`https://recipe.bloss0m.com`

## 上線前

- [ ] 食譜 ≥ 150 篇且為原創步驟內容
- [ ] `about`、`contact`、`privacy-policy`、`terms` 可正常瀏覽
- [ ] `public/ads.txt` 替換為真實 `google.com, pub-XXXXXXXX, DIRECT, f08c47fec0942fa0`
- [ ] Cloudflare 設定 `PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX`
- [ ] 部署後確認 `AdSlot` 非 placeholder 模式
- [ ] 網站可從 Google 自然搜尋進入（Search Console 有索引）

## 送審後

- [ ] 記錄審核結果與需修正項目
- [ ] 若未通過：補內容、調整廣告位置後再送

## 變現與流量並行

AdSense 不是流量起點。建議先以 Search Console + GA4 觀察 4～8 週，再送審。
