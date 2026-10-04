# Corporate Gifts — Static Homepage

A modular Next.js static-export homepage for a corporate gifting catalogue.

## Run

```bash
npm install
npm run dev
```

Static production build:

```bash
npm run build
```

The generated static site is written to `out/` because `next.config.ts` uses `output: "export"`.

## Current scope
- Homepage only
- Modular Navbar/Footer and homepage sections
- Mock category/product data
- Responsive celebratory wood-brown / cream / peach theme
- Category dropdown generated from data
- Horizontal trending-products scroller
- FAQ accordion without client-side JavaScript
- Links already follow the future category/product URL structure

## Required-field rule
`lib/validation.ts` contains the rule that mirrors the future Google Sheets sync: an item is included only if every required field is valid. Incomplete rows are filtered out and never enter the static-site dataset.

When Google Sheets/Drive integration is added, validation should happen in the build-time sync script before JSON/images are generated. The browser will never receive Google credentials.

## Mock assets
The SVGs under `public/images/mock/` are local placeholders only. They can later be replaced by images downloaded from Google Drive during the GitHub Actions build.
