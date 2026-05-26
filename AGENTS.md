<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-agent-rules -->
# Project Agent Rules — my-site

## Stack Versions (read before writing any code)

| Package | Version | Notes |
|---|---|---|
| next | 16.2.6 | App Router only — no `pages/` dir |
| react | 19.2.4 | New APIs; check before using hooks |
| @clerk/nextjs | ^7.3.7 | Breaking changes from v4/v5 |
| tailwindcss | ^4 | No `tailwind.config.js`; config via PostCSS |
| framer-motion | ^12 | Use for all animations |
| jspdf | ^4 | Client-side only |
| lucide-react | ^1 | Use for all icons |

## Before Writing Any Code

1. Check `node_modules/next/dist/docs/` for the correct Next.js 16 API.
2. Check `node_modules/@clerk/nextjs` exports before using any Clerk hook or component.
3. Read the existing file you are modifying before making changes.

## File & Routing Conventions

- App lives in `app/` — use the **App Router** exclusively.
- Each PDF tool is a self-contained route: `app/compress-pdf/`, `app/merge-pdf/`, `app/image-to-pdf/`.
- `dashboard/page.tsx` is a separate top-level route — verify its layout inheritance before editing.
- Use `layout.tsx` for shared UI; never duplicate providers across routes.

## Styling Rules

- **Tailwind CSS v4** — directives changed; match the pattern already in `app/globals.css`.
- Do NOT add a `tailwind.config.js/ts` file without checking v4 compatibility first.
- No inline `style={}` props unless there is no Tailwind equivalent.

## Component Rules

- Functional components only.
- Animations: always use `framer-motion` variants, not CSS `@keyframes`.
- Icons: always use `lucide-react`; never import raw SVGs.
- File upload UI: always use `react-dropzone`.
- User feedback: always use `react-hot-toast`.
- Images: always use `next/image`, never `<img>`.

## PDF / File Handling

- All PDF operations run **client-side** via `jsPDF`.
- Do NOT introduce server actions or API routes for binary file data unless explicitly asked.

## Authentication

- Clerk v7 middleware protects routes — check `middleware.ts` before adding new protected routes.
- Do not use Clerk APIs from memory; verify against the installed package.

## Commands

```bash
npm run dev    # dev server → http://localhost:3000
npm run lint   # eslint
npm run build  # production build
npm start      # production server
```

## Hard Rules

- Never use the `pages/` router.
- Never install new major dependencies without asking the user.
- Never assume older Next.js / React / Clerk behaviour — always verify against installed versions.
<!-- END:project-agent-rules -->
