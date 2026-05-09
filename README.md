# FigaroLabs Networking Studio

A bilingual Next.js + Tailwind CSS dashboard showcasing interactive networking mind maps.

## Quick start

```bash
npm install
npm run dev
```

## Add new lectures (local JSON CMS)

Edit `data/mindmaps.json` and add a new entry under `mindmaps`.

Each entry needs:
- `id`: unique string
- `title` and `description` in `en`/`ar`
- `map`: the full node tree (same structure as the current example)

After saving, the new lecture appears in the lecture dropdown automatically.

## Deploy on Vercel

1. Push your repo to GitHub (already done).
2. Go to https://vercel.com/new
3. Import `Yousifkhalid21/my-first-space`.
4. Click **Deploy** (no extra settings needed).

## Highlights

- Interactive SVG mind map with expand/collapse, focus, and search.
- Arabic (RTL) and English language toggle with mirrored layout.
- JSON-based content model for fast lecture updates.
