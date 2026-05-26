@AGENTS.md

# my-site — Claude Guidelines

## Project Overview

A Next.js-based PDF tools web app. Features include PDF merging, compression, and image-to-PDF conversion. Authentication is handled by Clerk.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript 5 |
| Runtime | React 19 |
| Styling | Tailwind CSS v4 |
| Auth | Clerk (`@clerk/nextjs` v7) |
| Animations | Framer Motion v12 |
| PDF | jsPDF v4 |
| Icons | lucide-react v1 |
| File Upload | react-dropzone v15 |
| Toasts | react-hot-toast v2 |

## Critical: Next.js Version Warning

> This project uses **Next.js 16** and **React 19** — both cutting-edge versions with breaking changes from what you may know.
> Always read `node_modules/next/dist/docs/` before writing any Next.js-specific code.
> Do NOT assume APIs, file conventions, or behaviours from older versions.

## Project Structure

```
my-site/
├── app/                        # Next.js App Router root
│   ├── layout.tsx              # Root layout (Clerk provider, fonts)
│   ├── page.tsx                # Landing / home page
│   ├── globals.css             # Global styles + Tailwind directives
│   ├── compress-pdf/           # PDF compression tool route
│   ├── image-to-pdf/           # Image → PDF tool route
│   └── merge-pdf/              # PDF merge tool route
├── dashboard/                  # Dashboard route (outside /app — verify routing)
│   └── page.tsx
├── public/                     # Static assets
├── next.config.ts
├── tsconfig.json
├── postcss.config.mjs
└── eslint.config.mjs
```

## Development Commands

```bash
# Start dev server (http://localhost:3000)
npm run dev

# Lint
npm run lint

# Build (production)
npm run build

# Start production server
npm start
```

## Code Conventions

- **File naming**: kebab-case for directories, PascalCase for component files.
- **Components**: Functional components only; use React 19 patterns.
- **Styling**: Tailwind CSS v4 utility classes. No inline `style={}` unless absolutely necessary.
- **Animations**: Use `framer-motion` for all transitions and micro-animations.
- **Icons**: Use `lucide-react` — do NOT import SVGs manually.
- **Toasts**: Use `react-hot-toast` for user feedback.
- **File uploads**: Use `react-dropzone` for all drag-and-drop / file-picker UIs.

## Authentication (Clerk)

- Clerk v7 is installed — its API differs significantly from v4/v5.
- Always check `node_modules/@clerk/nextjs` exports before using any Clerk hook or component.
- Protect routes via Clerk middleware (`middleware.ts`) rather than inside components where possible.

## Tailwind CSS v4 Notes

- Tailwind v4 config lives in `postcss.config.mjs` (no `tailwind.config.js`).
- The `@tailwind base/components/utilities` directives changed — check `globals.css` for the correct import pattern already in use.
- Do not add a `tailwind.config.js/ts` without verifying it is still supported in v4.

## PDF Features

- **jsPDF v4** is used for client-side PDF generation/manipulation.
- All PDF operations run **in the browser** (no server-side PDF processing).
- Keep file handling client-only; do not introduce server actions for binary file data unless explicitly asked.

## Do's and Don'ts

**Do:**
- Read existing page/component code before adding new features to match the style.
- Use `framer-motion` variants for animations rather than CSS `@keyframes`.
- Keep each tool (compress, merge, image-to-pdf) self-contained in its own route directory.

**Don't:**
- Don't use `pages/` router conventions — this project uses the App Router.
- Don't install new major dependencies without asking the user first.
- Don't use `<img>` directly — use Next.js `<Image>` from `next/image`.
- Don't assume `useRouter` / `usePathname` behave identically to older Next.js versions.
