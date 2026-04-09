# CALENDAR — CHRONOS THEME

A polished calendar dashboard built with Next.js, matching the design spec from the reference image.

## Features

- **Wall Calendar UI** with hero banner per month (unique gradient + orbs for all 12 months)
- **Day Range Selector** — click start date, then end date; in-between days highlighted
- **Strategic Notes** — add, edit, delete notes; persisted in localStorage per month
- **Quick Memos** — fast-add memos from the bottom input
- **Immediate Operations** panel
- **Light / Dark theme toggle** — persisted in localStorage
- **Fully Responsive** — stacks vertically on mobile

## Setup & Run

```bash
cd chronos
npm install
npm run dev
```

Then open http://localhost:3000

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Next.js 14** (Pages Router)
- **React 18**
- **Tailwind CSS** (utility helpers)
- **Plus Jakarta Sans** (Google Fonts)
- **localStorage** for persistence (no backend needed)

## Design System

Follows the "Ethereal Command Center" spec:
- Obsidian surfaces (#131313) with frosted glass overlays
- Violet (#cdbdff → #5d21df) gradient accents
- No solid 1px borders — glass edges only
- Ambient glow shadows, inner light effects
- Plus Jakarta Sans throughout
