# gdimopoulos.eu

Personal website of George Dimopoulos — astrophysicist, NASA Postdoctoral Fellow at
Goddard Space Flight Center. Built with [Astro](https://astro.build).

## Development

Requires Node.js 22+ (installed locally at `~/.local/node-v22.23.2-darwin-arm64`).

```sh
npm install     # first time only
npm run dev     # dev server at http://localhost:4321
npm run build   # production build into dist/
npm run preview # preview the production build
```

## Editing content

All content lives in `src/data/` — edit these JSON files, no HTML knowledge needed:

| File | What it holds |
| --- | --- |
| `profile.json` | Name, title, bio, email, social links |
| `research.json` | Research intro and topic cards |
| `cv.json` | Positions, education, and the CV PDF path |
| `publications.json` | Publication list (add `link`/`arxiv` URLs when available) |
| `photos.json` | Photography gallery entries |

### Adding photos

1. Prepare each photo with the helper script (auto-rotates, resizes to 1800px,
   strips EXIF/GPS metadata):

   ```sh
   node scripts/prep-photo.mjs ~/Pictures/website/original.jpg public/photos/name.jpg
   ```

   The `caption` shows both under the photo in the gallery and in the lightbox.
2. Add an entry to `src/data/photos.json` with `src`, `alt`, `caption`, and `ratio`
   (the width/height aspect ratio, e.g. `"3/2"` for landscape, `"4/5"` for portrait).
3. Add an entry for it in `src/data/photos.json` (newest-first or any order you like).

### Adding the CV PDF

Put the file at `public/cv.pdf` and set `"cvPdf": "/cv.pdf"` in `src/data/cv.json`.

## Structure

- `src/layouts/Base.astro` — shared layout: head, theme handling, scroll-reveal
- `src/components/Header.astro`, `Footer.astro` — navigation and footer
- `src/pages/` — one file per page: `index`, `research`, `cv`, `photography`, `podcast`
- `src/styles/global.css` — design tokens (light/dark themes) and shared styles

## Deployment

Intended to be served via GitHub Pages from the `gdimo/gdimo.github.io` repository
with the custom domain `gdimopoulos.eu` (CNAME). A GitHub Actions workflow for
Astro → Pages will be added at deploy time.
