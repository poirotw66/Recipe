import { writeFileSync } from "node:fs";
import { join } from "node:path";

const outputPath = join(process.cwd(), "public/images/og-default.svg");

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="Bloom Kitchen default cover">
  <rect width="1200" height="630" fill="#fffdf7"/>
  <rect x="48" y="48" width="1104" height="534" rx="24" fill="#fff6da" stroke="#ddd2c2" stroke-width="4"/>
  <rect x="96" y="120" width="220" height="16" rx="8" fill="#2f7d4f" opacity="0.85"/>
  <text x="96" y="220" fill="#2d2620" font-family="system-ui, 'Noto Sans TC', sans-serif" font-size="72" font-weight="700">Bloom Kitchen</text>
  <text x="96" y="290" fill="#6f6258" font-family="system-ui, 'Noto Sans TC', sans-serif" font-size="40" font-weight="500">今天煮什麼</text>
  <text x="96" y="380" fill="#2d2620" font-family="system-ui, 'Noto Sans TC', sans-serif" font-size="34" font-weight="400">從冰箱剩料出發，快速找到今晚能煮的一人份料理</text>
  <circle cx="980" cy="360" r="120" fill="#f2b84b" opacity="0.35"/>
  <circle cx="1040" cy="300" r="72" fill="#2f7d4f" opacity="0.2"/>
  <rect x="96" y="440" width="180" height="56" rx="12" fill="#2f7d4f"/>
  <text x="126" y="478" fill="#ffffff" font-family="system-ui, 'Noto Sans TC', sans-serif" font-size="24" font-weight="600">recipe.bloss0m.com</text>
</svg>
`;

writeFileSync(outputPath, svg, "utf8");
console.log(`Wrote ${outputPath}`);
