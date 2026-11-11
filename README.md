This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## ERP CMS integration

The site can pull created pages, navigation, colors and DOM edits from the ERP's
public CMS API. It is fully optional: with the env vars unset, or the ERP down,
every page renders exactly as before.

| Env var | Purpose |
| --- | --- |
| `CMS_API_URL` | ERP public HTTPS base URL, e.g. `https://api.example-erp.com` |
| `CMS_SITE_DOMAIN` | `clickmastersapplicationdevelopment.com` |
| `CMS_ANTI_FLICKER=off` | Don't hide `<main>` (max 1.5s) while edits load |
| `CMS_ALLOW_CUSTOM_JS=true` | Allow a created page's `customCode.js` to execute |
| `CMS_DEBUG=1` | Log ERP fetch failures in production |

- `lib/cms/*` — server fetch client (60s cache, timeout, circuit breaker), sanitizers, SEO, edit algorithm.
- `app/[...slug]/page.tsx` — catch-all for created pages. Code-owned routes always win;
  existing dynamic routes (`/blog/[slug]`, `/services/[slug]`, …) fall back to a created page
  before returning 404.
- `components/cms/CmsSectionRenderer.tsx` + `sections.tsx` — section types.
- `components/cms/ErpPageEdits.tsx` — applies edited-page DOM instructions (mounted in the root layout,
  before `{children}`); the browser loads them via `/api/cms/page-edits?path=…`.

In production, set `PUBLIC_CACHE_SECONDS=60` in the ERP backend's `.env`.
