---
title: Static Sites
description: Host static websites on Mincemeat with upload or GitHub deployments, immutable versioning, shared subdomains, and custom domains.
category: static-sites
audience: user
updated: 2026-05-18
related:
  - /get-started/
  - /domains/
  - /troubleshooting/
---

# Static Sites

Static Sites lets you host websites on Mincemeat without managing
servers. Upload a pre-built site or connect a GitHub repository, and
Mincemeat serves your files on a shared subdomain or your own custom
domain. Every deployment is immutable — you can roll back to any
previous version instantly.

## Key concepts

Understanding four concepts will help you work with Static Sites
effectively.

### Site

A site is the top-level container for your static website. Each site
has a **name** you choose for display, and an immutable **slug** that
becomes part of your shared subdomain URL. A site holds its deployment
history, domain configuration, and serving settings (SPA fallback,
redirects, custom headers, and custom 404 page).

### Deployment

A deployment is an immutable snapshot of your website files at a point
in time. Each deployment receives a version number and is stored
permanently. You can create deployments by uploading files directly or
by deploying from a connected GitHub repository.

### Active deployment

Only one deployment is **active** at any time — this is the version
visitors see when they open your site URL. Switching the active
deployment is instant and does not modify any files. This is how
rollbacks work: you simply point the active deployment to an older
version.

### Domain

Every site gets a shared subdomain on `mincemeat.app` automatically.
You can also connect one or more custom domains. Domains go through a
validation process before they start serving traffic.

## What you can do

| Capability | What it means |
| --- | --- |
| Create a site | Choose a name and slug, configure SPA and header settings. |
| Upload a deployment | Deploy a single HTML file or a zip archive containing your site files. |
| Deploy from GitHub | Connect a GitHub repository through the Mincemeat GitHub App. Pushes to your production branch deploy automatically. |
| View deployment history | See every deployment with its version, status, timestamp, and file count. |
| Activate and roll back | Switch the active deployment to any previous version instantly. |
| Use a shared subdomain | Your site is available at `your-slug.mincemeat.app` immediately. |
| Connect a custom domain | Attach a subdomain or apex domain with automatic SSL. |
| Configure SPA fallback | Serve `index.html` for any path that does not match a file — useful for single-page applications. |
| Set redirects and headers | Define redirect rules and custom response headers for your site. |
| Customise the 404 page | Serve your own HTML page when a visitor requests a path that does not exist. |

## How deployments work

Mincemeat uses a **no-build** deployment model. Whether you upload a
zip or connect a GitHub repository, Mincemeat treats your files as
ready-to-serve static content. There is no build step — frameworks
like Next.js, Vite, or Hugo must be built locally or in your own CI
pipeline before the output is uploaded or pushed.

When a deployment succeeds, Mincemeat stores the files under an
immutable path and updates the active deployment pointer. The previous
deployment remains available for rollback.

## Getting started

If this is your first time, start with
[Create a site](/static-sites/create-site) to set up your first
static site and make your first deployment.

## Related

- [Get started](/get-started/)
- [Domains](/domains/)
- [Troubleshooting](/troubleshooting/)
