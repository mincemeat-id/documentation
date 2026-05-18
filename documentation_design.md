# Mincemeat User Documentation Site Design & Implementation Plan

## Purpose

Create a public, end-user-oriented documentation site for `docs.mincemeat.id`.
The site should help Mincemeat users understand everyday workflows: managing
their account, using assigned cloud instances, deploying static sites, connecting
domains, reading status/errors, and contributing documentation improvements.

The documentation must avoid admin-only and operations-only runbook content.
Coreapp technical documentation and the `web-landing` VitePress implementation
are source references, but the published site should be written for the `user`
role first.

## Source Inputs

| Source | Use |
| --- | --- |
| `../web-landing` | Base VitePress setup, custom theme structure, IBM Plex fonts, SEO scripts, Cloudflare-ready build conventions |
| `../coreapp/docs/README.md` | Technical documentation index and canonical feature inventory |
| `../coreapp/docs/design-system.md` | Carbon-inspired design tokens, typography, layout density, accessibility conventions |
| `../coreapp/docs/frontend.md` | Actual frontend routes, account flows, instance views, static site views, component vocabulary |
| `../coreapp/docs/auth.md` | User-facing login, password, 2FA, recovery code, logout, audit trail concepts |
| `../coreapp/docs/static-sites/*` | Static Sites feature behavior, deployments, GitHub integration, custom domains, edge serving |
| `../coreapp/docs/domain-management.md` | User-facing domain setup, DNS validation, proxy settings, cache purge behavior |
| `../web-landing/platform/*.md` | Marketing positioning for Cloud Instances and Static Sites |

## Product Scope

### In Scope

- Public VitePress documentation repository for `docs.mincemeat.id`.
- End-user docs for the `user` role.
- Cloud Instances documentation:
  - Viewing assigned instances.
  - Reading status, metrics, configuration, and activity.
  - Starting, stopping, restarting, and using lifecycle controls when available.
  - Using the web terminal.
  - Understanding snapshots when visible to users.
  - Understanding assigned domains and user-editable proxy settings.
- Static Sites documentation:
  - Creating a static site.
  - Uploading HTML or zip artifacts.
  - Connecting GitHub repositories through the Mincemeat GitHub App.
  - Understanding no-build deployments.
  - Reading deployment history and pipeline status.
  - Activating and rolling back immutable deployments.
  - Connecting shared subdomains and custom domains.
  - SPA fallback, redirects, custom headers, and custom 404 behavior.
- Account documentation:
  - Login and logout.
  - Changing password.
  - Enabling, verifying, and disabling 2FA.
  - Storing and using recovery codes.
  - Reviewing personal audit history.
  - Reporting errors with correlation IDs.
- Documentation style guide and contribution guide.
- Public-repository security guardrails.
- CC BY 4.0 license for documentation content.
- MIT license for site code.
- Cloudflare Pages deployment plan.

### Out of Scope

- Operator runbooks, deployment internals, Terraform/Nomad setup, secrets setup,
  database migrations, or LXD host administration.
- Admin-only user management, server management, storage target administration,
  and system audit log management.
- Public API reference for backend internals, unless a short user-facing API
  integration page is later requested.
- Pricing, billing, and SLA docs unless they are intentionally mirrored from
  the company site.

## Site Architecture

Recommended repository layout from `/home/nerdv2/work/Mincemeat/documentation`:

```text
.
├── .vitepress/
│   ├── config.ts
│   ├── seo.ts
│   └── theme/
│       ├── index.ts
│       ├── Layout.vue
│       ├── components/
│       └── styles/
├── account/
├── instances/
├── static-sites/
├── domains/
├── troubleshooting/
├── contributing/
├── public/
├── package.json
├── LICENSE
├── LICENSE-CONTENT
├── CONTRIBUTING.md
├── SECURITY.md
└── index.md
```

Recommended top-level navigation:

| Section | Purpose |
| --- | --- |
| Get Started | Product overview, account access, first steps |
| Account | Login, password, 2FA, sessions, audit history |
| Instances | User workflows for assigned cloud instances |
| Static Sites | Static hosting, deployments, GitHub, domains |
| Domains | DNS, custom domains, proxy options, validation states |
| Troubleshooting | Common errors, correlation IDs, support-ready checklists |
| Contribute | Style guide, contribution guide, issue/PR process |

## Design Direction

Use the `../web-landing` VitePress implementation as the base, then adapt it for
documentation:

- Keep IBM Plex Sans and IBM Plex Mono.
- Keep the Carbon-inspired token vocabulary: productive spacing, crisp borders,
  restrained color, strong focus states, and blue interactive accents.
- Favor readable docs layout over marketing presentation:
  - persistent left sidebar,
  - page table of contents,
  - clear previous/next navigation,
  - compact callouts,
  - status tables,
  - procedure steps,
  - screenshots or UI diagrams where they clarify workflows.
- Use VitePress local search first; consider Algolia DocSearch only after the
  public site has enough content and indexing is approved.
- Use light theme by default. Dark theme may remain available if inherited from
  `../web-landing`, but all custom docs components must meet contrast requirements
  in both modes.
- Avoid exposing operational terminology in primary navigation. For example,
  prefer "Connect a custom domain" over "Cloudflare for SaaS hostname
  reconciliation".

## Content Voice & Style Guide

Documentation style should be practical, calm, and contributor-friendly.

- Write to "you".
- Start pages with the user outcome, then prerequisites, then steps.
- Prefer UI labels and product terms users can see in the app.
- Use short paragraphs and numbered procedures.
- Include expected results after each workflow.
- Add "What to check next" sections for workflows with waiting states.
- Explain statuses in plain language before showing exact status names.
- Use code blocks only for user-entered values, DNS examples, or file layouts.
- Do not publish internal secrets, real customer domains, private repository
  names, credentials, tokens, account IDs, provider IDs, private IP addresses,
  or screenshots with sensitive data.
- Mark feature availability clearly when a capability depends on plan,
  assignment, role, or platform configuration.
- Keep admin/operations background out of user docs unless it explains a
  user-visible delay or status.
- Prefer "contact support" only after the user has clear self-check steps.

Recommended page template:

```markdown
# Page Title

Short outcome-focused introduction.

## Before You Start

- Requirement or permission.
- Required file/account/domain.

## Steps

1. Do the first action.
2. Do the second action.
3. Confirm the expected result.

## What Happens Next

Explain status changes, waiting time, or notifications.

## Troubleshooting

| Problem | What to Check |
| --- | --- |
| Example issue | Practical next step |
```

## Licensing Plan

- Add `LICENSE` with the MIT License for code, theme, scripts, and build
  configuration.
- Add `LICENSE-CONTENT` with Creative Commons Attribution 4.0 International
  Public License text or a clear link plus SPDX marker.
- Add `README.md` license summary:
  - Code: MIT.
  - Documentation content, prose, and diagrams: CC BY 4.0.
  - Trademarks and logos remain property of their owners and are not granted
    under either license.
- Add frontmatter defaults or footer text that surfaces the CC BY 4.0 content
  license on documentation pages.
- Add a contribution acknowledgement that inbound prose/content contributions
  are accepted under CC BY 4.0 and code contributions under MIT.

## Public Repository Security Guardrails

- Add `SECURITY.md` explaining how to report vulnerabilities privately.
- Add `CONTRIBUTING.md` with a "Before you submit" checklist for sensitive
  information.
- Add `.gitignore` for `.env`, local VitePress output, Playwright reports, logs,
  and temporary files.
- Add secret scanning to CI with gitleaks or an equivalent action.
- Add link checking that fails on private/internal links, localhost links outside
  approved examples, and links into private repositories.
- Add a screenshot policy:
  - use seeded demo data only,
  - blur account identifiers,
  - avoid real customer domains and real deployment IDs,
  - regenerate screenshots when UI labels change.
- Add a content review rule: no operational credentials, provider account IDs,
  API keys, JWTs, private hostnames, internal IPs, or stack traces with secrets.
- Keep canonical source docs in `../coreapp/docs`, but manually adapt content for
  public use rather than copying internal runbooks wholesale.

## Cloudflare Pages Deployment

Recommended Cloudflare Pages settings:

| Setting | Value |
| --- | --- |
| Project name | `mincemeat-docs` |
| Production domain | `docs.mincemeat.id` |
| Framework preset | VitePress |
| Build command | `npm run build` |
| Build output directory | `.vitepress/dist` |
| Node version | Match `../web-landing`/repo `.nvmrc`, preferably Node 24 |
| Install command | `npm ci` |

Deployment guardrails:

- Require successful CI before production deployment.
- Build previews for pull requests.
- Disable secrets in the docs build unless there is a documented need.
- Use only public environment variables for analytics or search.
- Configure redirects and headers in `public/_redirects` and `public/_headers`.
- Add security headers where compatible with VitePress assets:
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy` with unnecessary browser features disabled
  - conservative `Content-Security-Policy` after analytics/search choices are
    known

## Initial Information Architecture

### Get Started

- `index.md` - Welcome to Mincemeat Docs
- `get-started/what-is-mincemeat.md`
- `get-started/sign-in.md`
- `get-started/first-steps.md`
- `get-started/roles-and-access.md`

### Account

- `account/index.md`
- `account/change-password.md`
- `account/two-factor-authentication.md`
- `account/recovery-codes.md`
- `account/audit-history.md`
- `account/sign-out.md`

### Instances

- `instances/index.md`
- `instances/view-instances.md`
- `instances/instance-status.md`
- `instances/start-stop-restart.md`
- `instances/metrics.md`
- `instances/web-terminal.md`
- `instances/snapshots.md`
- `instances/instance-domains.md`
- `instances/proxy-settings.md`
- `instances/troubleshooting.md`

### Static Sites

- `static-sites/index.md`
- `static-sites/create-site.md`
- `static-sites/upload-deployment.md`
- `static-sites/github-deployments.md`
- `static-sites/deployment-history.md`
- `static-sites/rollback.md`
- `static-sites/shared-subdomains.md`
- `static-sites/custom-domains.md`
- `static-sites/spa-fallback.md`
- `static-sites/redirects-headers-404.md`
- `static-sites/troubleshooting.md`

### Domains

- `domains/index.md`
- `domains/dns-basics.md`
- `domains/connect-custom-domain.md`
- `domains/domain-status.md`
- `domains/cache-and-proxy.md`
- `domains/troubleshooting.md`

### Troubleshooting

- `troubleshooting/index.md`
- `troubleshooting/error-messages.md`
- `troubleshooting/correlation-ids.md`
- `troubleshooting/login-and-2fa.md`
- `troubleshooting/deployments.md`
- `troubleshooting/domains.md`
- `troubleshooting/contact-support.md`

### Contribute

- `contributing/index.md`
- `contributing/style-guide.md`
- `contributing/content-model.md`
- `contributing/local-development.md`
- `contributing/pull-request-checklist.md`
- `contributing/security-and-privacy.md`

## Implementation Stages

### Stage 1 - Repository Foundation

Goal: Create a working public VitePress docs repository modeled after
`../web-landing`.

| Task | Complexity | Estimate |
| --- | --- | --- |
| [ ] Create repository scaffold with VitePress, Vue, TypeScript, and npm scripts | Medium | 3 h |
| [ ] Port selected `../web-landing` config patterns: clean URLs, sitemap, SEO head, favicon, preview scripts | Medium | 3 h |
| [ ] Add Cloudflare Pages-ready `package.json`, lockfile, `.nvmrc`, `.gitignore`, and README | Low | 2 h |
| [ ] Add MIT `LICENSE` and CC BY 4.0 `LICENSE-CONTENT` | Low | 1 h |
| [ ] Add `SECURITY.md` and public repository safety checklist | Low | 1 h |
| [ ] Add baseline CI: install, build, typecheck, link check, secret scan | Medium | 4 h |

Stage estimate: 14 hours.

### Stage 2 - Documentation Theme & UX

Goal: Build a docs-first UI that keeps Mincemeat's Carbon-inspired identity.

| Task | Complexity | Estimate |
| --- | --- | --- |
| [ ] Adapt IBM Plex fonts and Carbon-inspired tokens from `../web-landing` and `../coreapp/docs/design-system.md` | Medium | 3 h |
| [ ] Build docs layout: header, sidebar, mobile nav, page TOC, previous/next links, footer license block | High | 8 h |
| [ ] Create reusable docs components: callout, status table, prerequisite list, step card, screenshot frame, copyable DNS record | Medium | 6 h |
| [ ] Add accessible focus states, skip link, keyboard navigation checks, and reduced-motion handling | Medium | 4 h |
| [ ] Add VitePress local search and tune sidebar labels | Low | 2 h |
| [ ] Run visual QA on desktop and mobile breakpoints | Medium | 3 h |

Stage estimate: 26 hours.

### Stage 3 - Content Standards & Contribution Experience

Goal: Make the repository welcoming and consistent for public contributors.

| Task | Complexity | Estimate |
| --- | --- | --- |
| [ ] Write documentation style guide with voice, structure, terminology, examples, and screenshot rules | Medium | 5 h |
| [ ] Write contribution guide with local development, branch, issue, PR, review, and licensing expectations | Medium | 4 h |
| [ ] Add PR template with docs quality checklist and sensitive-data checklist | Low | 1 h |
| [ ] Add issue templates for typo, missing docs, confusing docs, and feature docs request | Low | 2 h |
| [ ] Add content frontmatter standard: title, description, category, audience, updated date, related pages | Low | 2 h |
| [ ] Add Vale or markdownlint rules if the team wants automated prose checks | Medium | 4 h |

Stage estimate: 18 hours.

### Stage 4 - Core User Account Docs

Goal: Cover baseline account workflows before product feature docs.

| Task | Complexity | Estimate |
| --- | --- | --- |
| [ ] Write sign in and sign out docs | Low | 2 h |
| [ ] Write change password doc, including password minimum and session revocation behavior | Low | 2 h |
| [ ] Write 2FA setup doc with authenticator app guidance and recovery code warning | Medium | 4 h |
| [ ] Write 2FA login, recovery code, and disable 2FA docs | Medium | 4 h |
| [ ] Write personal audit history doc | Low | 2 h |
| [ ] Write correlation ID and support-ready error reporting doc | Low | 2 h |

Stage estimate: 16 hours.

### Stage 5 - Cloud Instances Docs

Goal: Make assigned instance usage clear for non-admin users.

| Task | Complexity | Estimate |
| --- | --- | --- |
| [ ] Write Instances overview and "what you can do with user access" page | Medium | 3 h |
| [ ] Write view/filter/search assigned instances page | Low | 2 h |
| [ ] Write instance status guide with user-friendly meanings and waiting states | Medium | 4 h |
| [ ] Write lifecycle controls guide: start, stop, restart, unavailable actions | Medium | 4 h |
| [ ] Write metrics guide: CPU, memory, disk, polling delay, stale data | Medium | 3 h |
| [ ] Write web terminal guide with safety notes and troubleshooting | High | 6 h |
| [ ] Write snapshots guide focused on what user role can see/do | Medium | 4 h |
| [ ] Write instance domain and proxy settings docs based on user-visible controls | High | 6 h |
| [ ] Add instance troubleshooting matrix | Medium | 4 h |

Stage estimate: 36 hours.

### Stage 6 - Static Sites Docs

Goal: Deliver the most comprehensive documentation set for Static Sites.

| Task | Complexity | Estimate |
| --- | --- | --- |
| [ ] Write Static Sites overview and mental model: site, deployment, active deployment, domain | Medium | 4 h |
| [ ] Write create static site guide | Medium | 3 h |
| [ ] Write upload deployment guide for single HTML and zip archives | Medium | 5 h |
| [ ] Write GitHub connection guide with GitHub App install, repo selection, branch, root directory, and no-build behavior | High | 8 h |
| [ ] Write deployment history, pipeline status, and failed deployment troubleshooting | High | 7 h |
| [ ] Write activate and rollback deployment guide | Medium | 4 h |
| [ ] Write shared subdomain guide | Medium | 3 h |
| [ ] Write custom domain guide for subdomain and apex flows | High | 8 h |
| [ ] Write SPA fallback, redirects, headers, and custom 404 docs | High | 8 h |
| [ ] Add Static Sites troubleshooting matrix and support checklist | Medium | 5 h |

Stage estimate: 55 hours.

### Stage 7 - Screenshots, Examples, and Review

Goal: Add trustworthy visuals and validate content against the app.

| Task | Complexity | Estimate |
| --- | --- | --- |
| [ ] Define seeded demo account, demo instance, demo site, and demo domain names for screenshots | Medium | 3 h |
| [ ] Capture account workflow screenshots | Low | 2 h |
| [ ] Capture instance workflow screenshots | Medium | 4 h |
| [ ] Capture static site workflow screenshots | High | 6 h |
| [ ] Add alt text and captions for all images | Low | 2 h |
| [ ] Validate every procedure against the current frontend | High | 8 h |
| [ ] Review all pages for public-repo safety | Medium | 4 h |

Stage estimate: 29 hours.

### Stage 8 - Launch Readiness

Goal: Ship a reliable public site on Cloudflare Pages.

| Task | Complexity | Estimate |
| --- | --- | --- |
| [ ] Configure Cloudflare Pages project and `docs.mincemeat.id` custom domain | Medium | 3 h |
| [ ] Add production redirects, headers, sitemap, robots.txt, and canonical URLs | Medium | 4 h |
| [ ] Run build, link, accessibility, SEO, and secret-scan checks | Medium | 4 h |
| [ ] Review preview deployment with product/support stakeholders | Medium | 4 h |
| [ ] Fix launch review issues | Medium | 6 h |
| [ ] Publish initial release and tag repository | Low | 1 h |
| [ ] Add post-launch feedback link and contribution callout | Low | 2 h |

Stage estimate: 24 hours.

## Estimated Timeline

| Workstream | Estimate |
| --- | ---: |
| Repository foundation | 14 h |
| Theme and UX | 26 h |
| Contribution standards | 18 h |
| Account docs | 16 h |
| Cloud Instances docs | 36 h |
| Static Sites docs | 55 h |
| Screenshots and review | 29 h |
| Launch readiness | 24 h |
| **Total** | **218 h** |

Recommended delivery shape:

- MVP: Stages 1-4 plus Static Sites overview/create/upload/custom domain basics.
  Estimate: 90-110 hours.
- Full v1: All stages. Estimate: 200-230 hours.

## Definition of Done

- Site builds locally with `npm run build`.
- Cloudflare Pages preview deployment succeeds.
- Public domain `docs.mincemeat.id` resolves to the production deployment.
- All pages have title and description metadata.
- Sidebar and search cover all published pages.
- No public page contains admin/operations runbook instructions as primary
  guidance.
- No public page contains secrets, private hostnames, internal IPs, private
  provider IDs, customer data, or real tokens.
- License files and contribution terms are present.
- Security reporting path is present.
- Link check, secret scan, typecheck, and build pass in CI.
- Account, Instances, and Static Sites docs are validated against the current
  frontend UI.
- Static Sites has complete coverage for upload, GitHub, deployments, rollback,
  shared subdomains, custom domains, SPA behavior, redirects, headers, custom
  404s, and troubleshooting.

## Open Questions

- Should the docs site inherit dark mode from `../web-landing` or ship light-only
  to match the current `../coreapp/docs/design-system.md` document?
- Which analytics provider, if any, is acceptable for public docs?
- Should screenshots be generated from a seeded local environment, staging, or
  static mocked components?
- What support channel should be linked from troubleshooting pages?
- Are Static Sites custom-domain docs allowed to mention Cloudflare-specific
  validation details, or should those details be abstracted behind Mincemeat UI
  language?
