---
title: Create a site
description: Create a new static site on Mincemeat by choosing a name, slug, and optional settings.
category: static-sites
audience: user
updated: 2026-05-18
related:
  - /static-sites/
  - /static-sites/upload-deployment
  - /static-sites/github-deployments
---

# Create a site

Create a static site to get a URL where you can host your website.
You choose a display name and a slug that becomes part of your shared
subdomain.

## Before you start

- You must be signed in.
- You need a name for your site (for display in the dashboard).
- You need a slug — a short, URL-safe identifier for your shared
  subdomain.

## Create a new site

1. Select **Static Sites** in the main navigation.
2. Select **Create site**.
3. Enter a **Name** for your site. This is a display name you can
   change later.
4. Enter a **Slug**. The slug becomes your shared subdomain:
   `your-slug.mincemeat.app`. The slug cannot be changed after
   creation.
5. Optionally configure site settings:
   - **SPA mode** — enable to serve `index.html` for any path that
     does not match a file. Useful for React, Vue, and other
     single-page applications.
   - **Custom 404 path** — the path to your custom 404 page (for
     example, `/404.html`).
6. Select **Create**.

Your site is created and the detail view opens. The site does not
serve any content yet — you need to make your first deployment.

## Slug rules

The slug is a permanent part of your site identity. Choose carefully:

| Rule | Example |
| --- | --- |
| 3 to 63 characters | `my-site` ✓, `ab` ✗ |
| Lowercase letters, numbers, and hyphens only | `docs-v2` ✓, `My_Site` ✗ |
| Cannot start or end with a hyphen | `my-site` ✓, `-my-site` ✗ |
| Must be globally unique | If `blog` is taken, choose `my-blog` |
| Cannot be a reserved word | `www`, `api`, `admin`, `app`, `static`, `cdn`, and other system names are reserved |

If the slug you want is already taken, the form shows an error. Try a
different slug.

## What happens next

After creating your site, make your first deployment:

- [Upload a deployment](/static-sites/upload-deployment) to deploy a
  single HTML file or zip archive.
- [Deploy from GitHub](/static-sites/github-deployments) to connect a
  repository and deploy automatically on push.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Slug is rejected | Check the slug rules above. The slug may already be taken, or it may contain invalid characters. |
| Create button is disabled | Make sure both name and slug are filled in and the slug passes validation. |
| Site was created but shows no content | A new site has no deployments. Upload files or connect GitHub to make your first deployment. |

## Related

- [Static Sites overview](/static-sites/)
- [Upload a deployment](/static-sites/upload-deployment)
- [Deploy from GitHub](/static-sites/github-deployments)
