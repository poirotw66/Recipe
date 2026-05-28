# 今天煮什麼

台灣一人份、租屋族、懶人料理食譜 SEO 站。

## Tech Stack

- Astro
- TypeScript
- Markdown / JSON content
- Cloudflare Pages Free

## Local Commands

This environment currently has no Node.js/npm installed, so commands must be run on a machine with Node.js 20 or 22.

```bash
npm install
npm test
npm run build
```

### Git Bash on the network drive

This repo is on a UNC network path. On Windows, `npm run ...` may fall back to `C:\Windows` because `cmd.exe` does not support UNC current directories.

Use these Git Bash scripts instead:

```bash
./scripts/dev-gitbash.sh
./scripts/test-gitbash.sh
./scripts/build-gitbash.sh
```

## Cloudflare Pages

Build settings:

```text
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Root directory: /
Node.js version: 20 or 22
```

Environment variables:

```text
PUBLIC_SITE_URL=https://your-domain.example
PUBLIC_SITE_NAME=今天煮什麼
PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
```

Before AdSense submission, replace `public/ads.txt` with the real publisher entry.
