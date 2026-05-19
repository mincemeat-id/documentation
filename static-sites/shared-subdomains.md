---
title: Shared subdomains
description: Understand how your static site is served on a shared mincemeat.app subdomain using your site slug.
category: static-sites
audience: user
updated: 2026-05-19
related:
  - /static-sites/create-site
  - /static-sites/custom-domains
  - /domains/
---

# Shared subdomains

Every static site on Mincemeat gets a shared subdomain automatically.
The subdomain is based on the slug you chose when creating the site
and is available immediately — no DNS setup required.

## Your shared subdomain URL

Your site is available at:

```text
https://your-slug.mincemeat.app
```

Replace `your-slug` with the actual slug you chose during site
creation. For example, if your slug is `docs-demo`, your site URL is
`https://docs-demo.mincemeat.app`.

## How shared subdomains work

Mincemeat operates a wildcard DNS record on `mincemeat.app` that
routes all subdomain traffic to the Mincemeat serving infrastructure.
When a visitor requests your subdomain, the system:

1. Resolves the hostname to your site using the slug.
2. Looks up the active deployment for your site.
3. Serves the files from that deployment.

SSL is handled automatically through a wildcard certificate — you do
not need to provision or manage any certificates for shared
subdomains.

## Slug and subdomain relationship

The slug you chose when creating your site directly determines your
shared subdomain:

| Slug | Shared subdomain |
| --- | --- |
| `my-portfolio` | `my-portfolio.mincemeat.app` |
| `docs-v2` | `docs-v2.mincemeat.app` |
| `company-blog` | `company-blog.mincemeat.app` |

Because slugs are immutable, your shared subdomain URL never changes.
If you want a different subdomain, create a new site with the desired
slug.

## When to use shared subdomains

Shared subdomains are useful for:

- **Quick previews** — share your site immediately without DNS setup.
- **Development and staging** — use a shared subdomain while
  developing, then add a custom domain for production.
- **Simple projects** — if you do not need a custom domain, the
  shared subdomain works perfectly for personal sites, documentation,
  and side projects.

## Limitations

| Limitation | Detail |
| --- | --- |
| Cannot change the subdomain | The slug is permanent. Create a new site if you need a different slug. |
| Shared domain | All Mincemeat sites share the `mincemeat.app` domain. Your site is identified by the subdomain prefix only. |
| No custom SSL certificate | Shared subdomains use a platform-managed wildcard certificate. You cannot upload your own certificate. |

## Using a custom domain alongside

You can use both a shared subdomain and one or more custom domains at
the same time. Both serve the same active deployment. See
[Custom domains](/static-sites/custom-domains) to connect your own
domain.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Shared subdomain returns "Site not found" | Make sure the slug is correct. Check the site detail view for the exact URL. |
| Shared subdomain returns "No active deployment" | Your site has no active deployment yet. Upload files or deploy from GitHub to create one. |
| SSL certificate error on shared subdomain | This is rare. If you see a certificate warning, clear your browser cache and try again. If the problem persists, contact support. |

## Related

- [Create a site](/static-sites/create-site)
- [Custom domains](/static-sites/custom-domains)
- [Domains overview](/domains/)
