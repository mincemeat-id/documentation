# AGENTS.md

Guidance for AI coding agents (Amp, Claude Code, Cursor, etc.)
working in the public Mincemeat documentation repository.

This file is the operational summary. The authoritative human-facing
sources are:

- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [SECURITY.md](./SECURITY.md)
- [contributing/style-guide.md](./contributing/style-guide.md)
- [contributing/content-model.md](./contributing/content-model.md)
- [contributing/local-development.md](./contributing/local-development.md)
- [contributing/pull-request-checklist.md](./contributing/pull-request-checklist.md)
- [contributing/security-and-privacy.md](./contributing/security-and-privacy.md)
- [documentation_design.md](./documentation_design.md)

When this file and a linked source disagree, the linked source wins.
Update both in the same change.

## What this repository is

- The public source for <https://docs.mincemeat.id>.
- A VitePress 1.6.4 site, Vue 3.5, TypeScript 5.6, deployed to
  Cloudflare Pages.
- Written for the **`user`** role in Mincemeat (and `contributor` for
  the `contributing/` section). Not for operators or admins.

## What never goes in this repository

Treat this as a hard stop. If a task requires any of these, refuse the
write and explain why instead of producing the content:

- Credentials, API tokens, JWTs, session cookies, OAuth secrets,
  access keys.
- Real customer account IDs, email addresses, project names, site
  names, or deployment IDs.
- Real customer domain names or DNS records.
- Private hostnames, internal IP addresses, or non-public service URLs.
- Provider account IDs, organization IDs, zone IDs, or other
  operator-only identifiers.
- Stack traces, logs, or error messages containing any of the above.
- Internal-only runbook content, incident details, or operations
  tooling instructions.
- Links to private GitHub repositories or internal Git remotes.
- Localhost or LAN URLs outside the documented dev-server examples.

Use the safe example data table in
[contributing/security-and-privacy.md](./contributing/security-and-privacy.md#safe-example-data)
(`example.com`, `203.0.113.0/24`, `<your-token>`, etc.).

## Repository map

```text
.
├── .github/                # PR template, issue templates, CI workflow
├── .vitepress/             # VitePress config, SEO, theme, components
├── account/                # Section: account workflows
├── contributing/           # Section: contributor docs (style, content model, PR, security)
├── domains/                # Section: custom domain workflows
├── get-started/            # Section: product overview + first steps
├── instances/              # Section: cloud instance workflows
├── public/                 # Static assets, _redirects, _headers, robots.txt
├── scripts/                # Repository guardrail scripts (links, secrets, frontmatter)
├── static-sites/           # Section: static site workflows
├── troubleshooting/        # Section: errors, correlation IDs, support readiness
├── AGENTS.md               # This file
├── CONTRIBUTING.md         # Human contributor quick start
├── LICENSE                 # MIT (code)
├── LICENSE-CONTENT         # CC BY 4.0 (content)
├── README.md               # Repository overview
├── SECURITY.md             # Private reporting + sensitive-data checklist
├── documentation_design.md # Design + implementation plan (source of truth)
└── index.md                # VitePress home page (uses `layout: home`)
```

The seven top-level section folders mirror the navigation in
[.vitepress/config.ts](./.vitepress/config.ts). When you add, remove,
rename, or move a page, update the matching sidebar entry in that
file.

## How to make changes

### Decide where the change lives

| Change | Goes in |
| --- | --- |
| New end-user docs page or edit | Top-level section folder (`account/`, `instances/`, `static-sites/`, `domains/`, `troubleshooting/`, `get-started/`) |
| Contributor-facing docs | `contributing/` |
| Theme, layout, or Vue component | `.vitepress/theme/` |
| VitePress config (nav, sidebar, SEO, search) | `.vitepress/config.ts` |
| SEO helpers | `.vitepress/seo.ts` |
| Build/CI scripts | `scripts/` and `.github/workflows/ci.yml` |
| Repository-level governance (license, security, PR template) | Repo root or `.github/` |
| Plan / scope changes | `documentation_design.md` |

Do not invent new top-level folders without updating the sidebar
config **and** the `ALLOWED_CATEGORIES` list in
[scripts/check-frontmatter.mjs](./scripts/check-frontmatter.mjs).

### Content rules (for `.md` pages)

1. Add the required frontmatter to every documentation page (all
   `.md` files except the ones in
   [scripts/check-frontmatter.mjs `EXCLUDED_FILES`](./scripts/check-frontmatter.mjs)):

   ```yaml
   ---
   title: Sentence case page title
   description: One sentence outcome. 40-200 characters.
   category: <one of: get-started, account, instances, static-sites, domains, troubleshooting, contributing>
   audience: <user or contributor>
   updated: YYYY-MM-DD
   related:
     - /related/path-one
     - /related/path-two
   ---
   ```

2. The `category` value **must** match the top-level folder.
3. The `audience` is `user` for product docs and `contributor` for
   anything under `contributing/`.
4. `updated` is the date of the current meaningful content change.
5. Do **not** add fields outside the
   [allowed list](./contributing/content-model.md#frontmatter-standard);
   the check will fail and the value would be stripped at build.
6. Follow the page template for the page type (task, concept,
   reference, troubleshooting, overview) in
   [the style guide](./contributing/style-guide.md#page-structure).
7. One `# H1` per page, matching the `title`.
8. Use site-relative paths for internal links
   (`/static-sites/`), no `.md` or `.html` extensions.
9. Use the documented Vue components (`Callout`, `StatusTable`,
   `Prerequisites`, `Steps`, `StepCard`, `ScreenshotFrame`,
   `DnsRecord`) instead of hand-rolled markup.
10. Use only safe example data (see "What never goes in this
    repository" above).

### Code rules (for `.ts`, `.vue`, `.mjs`, configs)

- Match the existing TypeScript style: 2-space indent, single quotes,
  no semicolons (mirror the surrounding file).
- Keep theme components small and accessible: meaningful alt text,
  visible focus states, no color-only signals.
- Do not introduce a new dependency without a clear reason; document
  it in the pull request description.
- Scripts under `scripts/` run on Node 24, are ES modules
  (`type: "module"`), and must exit with non-zero on failure.
- If you change a guardrail script, also update the matching
  documentation in `contributing/` and any CI step in
  `.github/workflows/ci.yml`.

## Verification (run before claiming done)

Always run the full check sequence after any change. They are the same
commands CI runs, and they are not optional:

```bash
npm ci                       # only needed when package.json changes
npm run typecheck
npm run build
npm run lint:links
npm run lint:frontmatter
npm run lint:markdown
npm run scan:secrets
```

All seven must pass. Do not edit a check to make it pass; fix the
underlying content or code instead. If a guardrail is genuinely wrong
for a new case, update the script and explain the change in the pull
request description.

## Pull-request shape

When you produce a diff:

- Keep the change scoped to one logical task. Split unrelated work
  into separate branches.
- Use a short, descriptive branch name: `docs/<topic>`,
  `fix/<topic>`, `chore/<topic>`.
- Write a plain present-tense title:
  `docs(static-sites): add SPA fallback page`.
- Fill out the
  [pull request template](./.github/pull_request_template.md)
  honestly. Both the docs-quality checklist and the sensitive-data
  checklist must be ticked through actual review, not by default.
- Update the sidebar in `.vitepress/config.ts` whenever a page is
  added, removed, renamed, or moved.
- Bump the `updated` field in the frontmatter of any page you change
  meaningfully (steps, labels, accuracy). Cosmetic edits do not
  require it.

## Planning checkpoints

If you are working through `documentation_design.md` (for example,
finishing a stage), mark the checkboxes in that file in the same
commit that delivers the work. Do not mark a task complete unless:

- All files for that task exist with valid frontmatter,
- All seven local checks pass,
- The change has been linked from the section sidebar where
  applicable.

## When in doubt

- Stop and read [contributing/style-guide.md](./contributing/style-guide.md)
  and [contributing/content-model.md](./contributing/content-model.md).
- Prefer the smallest correct change.
- Treat any uncertainty about whether content is sensitive as a stop:
  ask the human, or use the safe example data instead.
- Never bypass CI (no `--no-verify`, no disabling checks, no removing
  ignored paths from `.markdownlintignore` to "make it pass").
