---
title: Content model
description: Required frontmatter fields, page types, and the metadata standard for every Mincemeat documentation page.
category: contributing
audience: contributor
updated: 2026-05-18
related:
  - /contributing/style-guide
  - /contributing/pull-request-checklist
---

# Content model

Every Markdown page in this repository follows a small, consistent
content model. The model exists so readers, search, and automated
checks can rely on a predictable shape.

## Page types

| Type | Purpose | Example |
| --- | --- | --- |
| `overview` | Section landing page that explains what is in the section and links to the most important pages. | `static-sites/index.md` |
| `task` | Step-by-step procedure that ends in a concrete result. | `static-sites/create-site.md` |
| `concept` | Explains a status, term, or behavior the user sees in the UI. | `instances/instance-status.md` |
| `reference` | A lookup page: status tables, error code matrices, configuration options. | `static-sites/redirects-headers-404.md` |
| `troubleshooting` | Problem → cause → fix matrix for one product area. | `static-sites/troubleshooting.md` |

Set the page type in the `category` and `audience` fields below. If a
page does not fit one of these types, talk to a maintainer before
adding it.

## Frontmatter standard

Every page **must** include the following frontmatter fields. The
markdown lint step and the frontmatter check script enforce this on
pull requests.

```yaml
---
title: Connect a custom domain
description: Add a custom domain to a static site and confirm DNS validation.
category: static-sites
audience: user
updated: 2026-05-18
related:
  - /account/sign-in
  - /static-sites/shared-subdomains
---
```

### Required fields

| Field | Type | Notes |
| --- | --- | --- |
| `title` | string | Sentence case. Matches the page H1. Max 60 characters. Used for `<title>` and search. |
| `description` | string | One sentence describing the outcome. 60-160 characters. Used for `<meta name="description">` and social previews. |
| `category` | string | One of: `get-started`, `account`, `instances`, `static-sites`, `domains`, `troubleshooting`, `contributing`. Must match the top-level folder. |
| `audience` | string | One of: `user`, `contributor`. Use `user` for product docs and `contributor` for everything under `contributing/`. |
| `updated` | string | ISO date `YYYY-MM-DD` of the last meaningful content change. Update whenever you change steps, labels, or accuracy-sensitive prose. |

### Optional fields

| Field | Type | Notes |
| --- | --- | --- |
| `related` | string[] | Site-relative paths to closely related pages. Rendered as a "Related" block by the theme. 2-5 items. |
| `head` | array | VitePress head injection. Use only for per-page SEO or canonical overrides. |
| `aside` | boolean | Set to `false` only on home or section landing pages. |
| `outline` | array \| number | Override the default outline depth. The site default is `[2, 3]`. |

### Field rules

- **Do not** add fields that are not in this list. Unknown fields are
  removed by the build to avoid leaking internal metadata.
- Do not put internal owner names, ticket IDs, or review reminders in
  frontmatter. Use the pull request description for that.
- `updated` is **not** the file creation date. It is the last meaningful
  content change. Cosmetic edits (typo fixes) do not require an update.

## Page anatomy

After the frontmatter, every page must have:

1. A single `# H1` that matches `title`.
2. A short outcome paragraph (one or two sentences).
3. The structural sections defined by the [style
   guide](/contributing/style-guide) for that page type.
4. A final `## Related` section for non-trivial pages, mirroring the
   `related` frontmatter list as Markdown links.

## Folder and URL conventions

- The top-level folder name is the URL prefix and the `category` value.
- Use lowercase, hyphen-separated file names: `connect-custom-domain.md`,
  not `connectCustomDomain.md` or `connect_custom_domain.md`.
- Each section has an `index.md` overview page. The overview links to
  the most important pages and matches the sidebar order.
- Do not introduce nested folders without coordinating with a
  maintainer; the sidebar is configured in `.vitepress/config.ts` and
  must be updated to match.

## Linking

- Use site-relative paths: `/static-sites/custom-domains`.
- Do not include `.md` or `.html` extensions in links; VitePress strips
  them and `cleanUrls` is on.
- Anchor links use lowercase with hyphens, matching VitePress slug
  generation: `[See the steps](#steps)`.

## Validation

Run the content model check locally:

```bash
npm run lint:frontmatter
```

The check fails when a page is missing a required field, uses an
unknown `category`, uses an invalid `audience`, or has an invalid
`updated` date. The same script runs in CI on every pull request.

## Related

- [Style guide](/contributing/style-guide)
- [Pull request checklist](/contributing/pull-request-checklist)
- [Local development](/contributing/local-development)
