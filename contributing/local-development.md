---
title: Local development
description: Set up Node, install dependencies, run the docs site locally, and run the required quality checks.
category: contributing
audience: contributor
updated: 2026-05-18
related:
  - /contributing/style-guide
  - /contributing/pull-request-checklist
---

# Local development

This page covers everything you need to preview the Mincemeat
documentation site on your machine and run the same checks CI runs on
your pull request.

## Before you start

- **Node.js 24** (the version in `.nvmrc`). Use `nvm`, `fnm`, `volta`,
  or your distribution's package manager.
- **npm 10 or later** (bundled with Node 24).
- **Git** and a GitHub account with permission to fork
  `mincemeat-id/documentation`.

::: tip
If you have `nvm` installed, run `nvm use` from the repository root to
switch to the pinned Node version automatically.
:::

## Clone and install

```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/<your-username>/documentation.git
cd documentation
npm ci
```

Use `npm ci` rather than `npm install` so the lockfile is honored
exactly. CI also uses `npm ci`.

## Run the dev server

```bash
npm run dev
```

VitePress serves the site at `http://localhost:5173`. Pages hot-reload
when you save Markdown or theme files.

## Build and preview the production output

```bash
npm run build
npm run preview
```

`npm run build` writes the static site to `.vitepress/dist`. The
preview command serves that output the same way Cloudflare Pages will.

## Required checks

Before opening a pull request, run the same checks that CI will:

```bash
npm run typecheck        # VitePress + theme TypeScript
npm run build            # Full production build
npm run lint:links       # Block private, localhost, and internal links
npm run scan:secrets     # Local secret-shaped string scan
npm run lint:frontmatter # Frontmatter required-fields check
npm run lint:markdown    # markdownlint prose and formatting rules
```

If any of these fail, fix the issue locally before pushing. The CI runs
the same commands and will block the merge otherwise.

## Branching

- Create a feature branch from `main`. Use a short, descriptive name:
  `docs/connect-custom-domain`, `fix/recovery-code-typo`,
  `chore/markdownlint-config`.
- Keep each branch focused on one change. Smaller pull requests review
  faster and revert more cleanly.
- Rebase on `main` instead of merging `main` into your branch. The
  history stays linear and the diff stays small.

## Commit messages

We use plain, present-tense commit messages. Conventional Commit
prefixes (`docs:`, `fix:`, `chore:`) are encouraged but not required.

Good:

- `docs(static-sites): add SPA fallback page`
- `fix(account): correct 2FA recovery code count`
- `chore: bump markdownlint-cli2 to 0.13`

Avoid:

- `WIP`
- `fix stuff`
- `update`

## Opening a pull request

1. Push your branch to your fork.
2. Open a pull request against `main` on
   `mincemeat-id/documentation`.
3. Fill out the pull request template. The template includes the docs
   quality checklist and the sensitive-data checklist.
4. Wait for CI to pass. If a check fails, fix it on your branch and
   push; the pull request updates automatically.
5. A maintainer will review within a few business days. Address review
   comments by pushing follow-up commits to the same branch.

::: warning
Do not force-push after a maintainer starts reviewing. It rewrites the
diff they have already read. Add follow-up commits instead; we will
squash on merge.
:::

## What happens after merge

- `main` deploys to a preview environment automatically.
- Production deploys to `docs.mincemeat.id` follow the release schedule
  documented in the repository README.
- Your contribution is licensed under MIT for code and CC BY 4.0 for
  prose. See [Security and privacy](/contributing/security-and-privacy)
  and the [LICENSE files](https://github.com/mincemeat-id/documentation)
  for details.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| `npm ci` fails with a Node version error | Run `node --version`. It must match `.nvmrc` (Node 24). |
| Dev server starts but pages 404 | Restart the dev server. Sidebar and frontmatter changes sometimes need a clean restart. |
| `npm run lint:links` flags a link in code | Move the example out of the body or wrap it in a fenced code block; the link check skips fenced blocks. |
| `npm run lint:markdown` reports many errors on an unrelated file | Pull the latest `main` and rebase. The rules may have changed. |
| Build succeeds locally but fails in CI | Compare Node versions. CI uses the version in `.nvmrc`. |

## Related

- [Style guide](/contributing/style-guide)
- [Content model](/contributing/content-model)
- [Pull request checklist](/contributing/pull-request-checklist)
- [Security and privacy](/contributing/security-and-privacy)
