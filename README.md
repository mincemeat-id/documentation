# Mincemeat Documentation

Source for the public Mincemeat user documentation site at
<https://docs.mincemeat.id>.

This site is written for the `user` role in Mincemeat. It covers
day-to-day workflows: account access, cloud instances, static sites,
custom domains, and troubleshooting. Operator runbooks, admin-only
features, and internal infrastructure documentation live in the private
`coreapp/docs` directory and are intentionally out of scope here.

## Tech stack

- **Framework:** [VitePress](https://vitepress.dev) 1.6.4
- **UI:** Vue 3.5
- **Typography:** IBM Plex Sans and IBM Plex Mono
- **Hosting:** Cloudflare Pages

## Getting started

Requirements:

- Node.js 24 (matches `.nvmrc`)
- npm 10 or later

```bash
# Install dependencies
npm ci

# Start development server (http://localhost:5173)
npm run dev

# Type-check VitePress config and theme
npm run typecheck

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

The build output is written to `.vitepress/dist`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the VitePress dev server. |
| `npm run build` | Build the static site into `.vitepress/dist`. |
| `npm run preview` | Preview the production build. |
| `npm run typecheck` | Type-check VitePress config and theme. |
| `npm run lint:links` | Check for forbidden private, localhost, or internal links. |
| `npm run scan:secrets` | Scan tracked files for tokens, keys, and secret-shaped strings. |

## Repository layout

```text
.
├── .vitepress/        # VitePress config, SEO helpers, theme
├── account/           # Account workflows (login, password, 2FA, audit)
├── instances/         # Cloud Instance workflows
├── static-sites/      # Static Sites workflows
├── domains/           # Custom domain workflows
├── troubleshooting/   # Errors, correlation IDs, support readiness
├── contributing/      # Style guide and contribution guide
├── public/            # Static assets, redirects, headers, robots.txt
├── scripts/           # Local + CI guardrail scripts
├── LICENSE            # MIT license for site code
├── LICENSE-CONTENT    # CC BY 4.0 license for documentation content
├── SECURITY.md        # Security and sensitive-data reporting policy
└── index.md           # Documentation home page
```

## Cloudflare Pages

| Setting | Value |
| --- | --- |
| Framework preset | VitePress |
| Build command | `npm run build` |
| Build output directory | `.vitepress/dist` |
| Install command | `npm ci` |
| Node version | 24 (`.nvmrc`) |

Production domain: `docs.mincemeat.id`.

## Licensing

- **Site code, theme, scripts, build configuration:** [MIT](./LICENSE)
- **Documentation content (prose, tables, diagrams, examples):**
  [CC BY 4.0](./LICENSE-CONTENT)
- **Trademarks and logos:** property of their respective owners; not
  granted under either license.

By contributing, you agree that your prose and content contributions are
licensed under CC BY 4.0, and your code contributions are licensed under
MIT.

## Reporting security or sensitive-data issues

See [SECURITY.md](./SECURITY.md). Do not open a public issue for
security or sensitive-data concerns.
