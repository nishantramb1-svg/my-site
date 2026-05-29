@AGENTS.md

# my-site — Claude Guidelines

## 1 · Knowledge Compression (Workspace Map)

A Next.js 16 PDF-tools web app. All features run **client-side only** (no server PDFs). Auth via Clerk v7.

```
my-site/
├── app/                        ← Next.js App Router root
│   ├── layout.tsx              ← Root layout: ClerkProvider + Syne/Outfit fonts
│   ├── page.tsx                ← Landing page — tool grid + features strip + footer
│   ├── globals.css             ← Design tokens (CSS vars) + utility classes (.card, .btn-primary, .gradient-text)
│   ├── components/
│   │   └── Navbar.tsx          ← Sticky nav: logo, tool links, Clerk auth buttons, mobile drawer
│   ├── compress-pdf/
│   │   └── page.tsx            ← Single-file upload → compression level picker → jsPDF download
│   ├── image-to-pdf/
│   │   └── page.tsx            ← Multi-image upload → reorder (Reorder.Group) → jsPDF download
│   └── merge-pdf/
│       └── page.tsx            ← Multi-PDF upload → reorder (Reorder.Group) → jsPDF merge download
├── dashboard/
│   └── page.tsx                ← Minimal Clerk UserButton; inherits root layout
├── AGENTS.md                   ← Stack versions + hard rules (read first)
├── next.config.ts
├── postcss.config.mjs          ← Tailwind v4 lives here — no tailwind.config.js
├── tsconfig.json
└── package.json
```

**Active tools (routes):** Merge PDF · Compress PDF · Image to PDF  
**Planned tools (href="#"):** Split PDF · PDF to Word · Rotate PDF · Watermark PDF · Unlock PDF

**Key dependencies (exact versions — do not assume older APIs):**

| Package | Version |
|---|---|
| next | 16.2.6 |
| react | 19.2.4 |
| @clerk/nextjs | ^7.3.7 |
| tailwindcss | ^4 |
| framer-motion | ^12 |
| jspdf | ^4 |
| lucide-react | ^1 |
| react-dropzone | ^15 |
| react-hot-toast | ^2 |

---

## 2 · Preferences & Conventions

### Routing
- App Router **only** — never `pages/`.
- Each tool is a self-contained route (`app/<tool-name>/page.tsx`). No shared tool layout; they all use `<Navbar />`.
- `dashboard/` is a top-level directory **outside** `app/` — it still works because Next 16 supports sibling route roots. Do not move it inside `app/`.

### Styling
- Tailwind v4 directive is `@import "tailwindcss"` (line 1 of `globals.css`). The `@tailwind` directives are gone.
- Design tokens live as CSS vars in `:root` (globals.css): `--bg`, `--bg-card`, `--bg-hover`, `--border`, `--accent`, `--text`, `--muted`, `--muted-2`.
- Shared utility classes defined in globals.css: `.card`, `.btn-primary`, `.gradient-text`, `.glow-ring`.
- Each tool page has its own accent colour (purple = merge, cyan = compress, emerald = image-to-pdf) — keep this palette consistent.
- No `tailwind.config.js/ts` — Tailwind v4 reads postcss.config.mjs.
- Prefer CSS vars over raw hex wherever a token exists.

### Components
- Functional components only; no class components.
- Animations: always `framer-motion` variants (`motion.*`, `AnimatePresence`, `Reorder`). Never CSS `@keyframes`.
- Icons: always `lucide-react`. Never inline SVG.
- File uploads: always `react-dropzone` (see existing `useDropzone` pattern).
- User feedback: always `react-hot-toast`. Include `<Toaster>` in each tool page (not in layout).
- Images in JSX: `next/image` (`<Image>`). The one exception already in the codebase is the image thumbnail in `image-to-pdf/page.tsx` (raw `<img>` with eslint-disable comment) — that's intentional for blob preview URLs that `next/image` can't handle.

### File operations (jsPDF)
- Dynamic import pattern used everywhere: `const { jsPDF } = await import('jspdf')`.
- All PDF work is client-side. Do **not** add server actions or API routes for binary file data.
- For image sizing in jsPDF, use the existing proportional-fit algorithm in `image-to-pdf/page.tsx` (lines 80–96) as the reference.

### Auth (Clerk v7)
- Check `node_modules/@clerk/nextjs` exports before using any Clerk hook — v7 API differs from v4/v5.
- Route protection lives in `middleware.ts`. Component-level auth is supplementary.
- `UserButton afterSignOutUrl="/"` is the current prop pattern in both Navbar mobile and desktop.

### Code style
- TypeScript throughout. Interfaces over `type` aliases for object shapes.
- `fmt(size)` utility is duplicated in each tool page (KB/MB formatter) — do not extract to a shared file unless asked.
- Toaster `toastOptions` style matches theme: `{ background: 'var(--bg-card)', color: 'var(--text)', border: '1px solid var(--border)' }`.

---

## 3 · Capability Declarations

You can autonomously:
- **Read any file** in this workspace before editing — always do this first.
- **Read Next.js 16 docs** from `node_modules/next/dist/docs/` before writing Next-specific code.
- **Read Clerk package exports** from `node_modules/@clerk/nextjs` before using any hook or component.
- **Add a new tool route** by creating `app/<tool-name>/page.tsx` following the existing three-page pattern.
- **Run `npm run dev`** to start the dev server at http://localhost:3000.
- **Run `npm run lint`** to check for ESLint errors.
- **Run `npm run build`** only when asked to verify production correctness.
- **Edit globals.css** to add new utility classes or design tokens — Tailwind v4 config is in postcss.config.mjs, not here.

When making widespread changes to a single file, **read the file → rewrite in memory → write once** (one write call, not many sequential edits).

---

## 4 · Lab Notes — What Not To Do Next Time

### Mistakes / Anti-patterns Observed

- **Do not use many sequential edit calls on the same file.** Read the file once, compose the full new content, write it in a single operation.
- **Do not assume `useRouter`, `useSearchParams`, or `usePathname` behave identically to Next.js 13/14.** Always check `node_modules/next/dist/docs/` first.
- **Do not use `<img>` for general images.** Use `next/image`. The only valid exception is blob/object-URL previews (already handled in image-to-pdf).
- **Do not add `tailwind.config.js/ts`.** Tailwind v4 uses PostCSS only. Adding a config file breaks the build.
- **Do not install new major dependencies** without asking the user.
- **Do not add `pages/` directory.** This project is App Router only; the presence of any `pages/` file will cause a routing conflict.
- **Do not use Clerk hooks from memory.** The v7 API is different from v4/v5 and from training data. Always verify exports.
- **`<UserButton>` does NOT accept `afterSignOutUrl` in Clerk v7.** That prop was removed. Post-sign-out redirect is configured on `<ClerkProvider>` or defaults to `/`. Using it causes a TypeScript build error.
- **Framer-motion v12: `ease` in `Transition` must be typed as a literal, not `string`.** Write `ease: 'easeOut' as const` (or similar). Without `as const`, TypeScript infers `string` which fails the strict `Easing` type check at build time.
- **The merge-pdf tool currently uses a jsPDF placeholder** (it writes metadata, not a true binary merge). Do not claim it performs a real binary merge — `pdf-lib` is not installed.
- **The compress-pdf tool renders pages via PDF.js (CDN, `/* webpackIgnore: true */` dynamic import) to canvas, re-encodes as JPEG at the chosen quality, then rebuilds via jsPDF.** This is the real implementation — do not revert to the old placeholder approach.
- **Loading external ESM from CDN inside Next.js requires `/* webpackIgnore: true */`** in the dynamic `import()` call. Without it, webpack tries to bundle the URL and throws.
- **`dashboard/page.tsx` is deliberately minimal** (just `<UserButton />`). Do not add a full layout to it without asking.

### Patterns That Worked Well
- Lazy-loading jsPDF with `await import('jspdf')` avoids SSR errors and reduces initial bundle size.
- `Reorder.Group` + `Reorder.Item` from framer-motion v12 for drag-to-reorder file lists works correctly.
- `crypto.randomUUID()` as stable React keys for uploaded files prevents reorder bugs.
- Tool accent colours declared inline on the tool data object (e.g., `color: '#8b5cf6'`, `glow: 'rgba(...)'`) keeps the home page self-contained.
