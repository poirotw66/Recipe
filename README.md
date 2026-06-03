# Bloom Kitchen（今天煮什麼）

台灣一人份、租屋族、懶人料理食譜 SEO 站。

## Tech Stack

- Astro
- TypeScript
- Markdown / JSON content
- Cloudflare Pages Free

## Local Commands

This environment currently has no Node.js/npm installed, so commands must be run on a machine with Node.js 20 or 22.

```bash
export PATH="$PATH:/c/Users/00896102/Desktop/node"

npm install
npm run dev
npm test
npm run build
```

### Git Bash on the old network drive

If this repo is opened from a UNC network path, `npm run ...` may fall back to `C:\Windows` because `cmd.exe` does not support UNC current directories.

On the local copy, prefer the normal npm commands above. On the old network-drive copy, use these Git Bash scripts instead:

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
PUBLIC_SITE_URL=https://recipe.bloss0m.com
PUBLIC_SITE_NAME=Bloom Kitchen
PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
```

Before AdSense submission, replace `public/ads.txt` with the real publisher entry.
