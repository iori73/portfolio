# portfolio

## What this codebase does

Personal bilingual (EN/JP) portfolio site for one designer/developer. Next.js App
Router + next-intl, Tailwind, deployed on Vercel from `main`. Almost everything is
static content (case studies, CV from `src/data/cvData.ts`, PDF print pages under
`app/print/`). There are no user accounts, no login, no database writes, and no
forms that persist data. Visitors are anonymous readers.

## Auth shape

- There is intentionally no end-user auth. All `app/api/*` routes are public GET
  endpoints.
- The only gate on API routes is `rateLimit()` from `src/lib/rate-limit.ts`
  (in-memory, keyed on the first `x-forwarded-for` value). A public route that
  does network/file I/O without calling it is worth flagging.
- Server-only secrets: `NOTION_API_KEY` (read-only Notion integration used by
  `app/api/podcast-notes/*`). It must never reach client bundles or responses.
- GitHub Actions use only `secrets.GITHUB_TOKEN` (contents/issues/PR write) to
  open and auto-merge data-refresh PRs into `main`, which triggers a deploy.

## Threat model

1. Server-side request abuse through `app/api/img/route.ts`, an image proxy with a
   hostname allowlist (SSRF, allowlist bypass, open proxy, oversized responses).
2. Leaking Notion content that is not meant to be public: `podcast-notes/[id]`
   takes an id from the URL and fetches that page/blocks with the server key.
   Check it only returns pages from the intended database/status.
3. Supply-chain / CI: scheduled workflows run scrapers (Playwright) and
   auto-merge their output to `main` with no human review, so anything that lets
   scraped content become executable code or HTML is high impact.
4. Stored XSS from external content (Notion blocks, note.com/Medium RSS, podcast
   data JSON) rendered into pages.

## Project-specific patterns to flag

- Fetching a URL derived from a query param without the `isAllowedUrl` check
  (see `app/api/img/route.ts`).
- Notion API calls that use a caller-supplied id without verifying the parent
  database or a published flag.
- `dangerouslySetInnerHTML` fed by Notion/RSS/scraped data rather than by
  repo-authored strings.
- Workflow steps that `git add` more than the single generated data file before
  the auto-merge.

## Known false-positives

- `app/api/linkedin/route.ts` returns a hard-coded public profile URL.
- `app/api/gym-stats/route.ts` reads a CSV from `GYM_CSV_PATH` (set only on the
  owner's machine) and otherwise returns a hard-coded fallback; not user input.
- `scripts/*.mjs` and `scripts/*.js` are owner-run build/CI scripts, not
  reachable from the web.
- `_archive/`, `app/preview/`, `app/print/` are static or non-indexed pages.
- Hard-coded personal links (LinkedIn, note, Substack) are public by design.
