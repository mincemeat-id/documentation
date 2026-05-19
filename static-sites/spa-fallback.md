---
title: SPA fallback
description: Configure single-page application fallback mode so your static site serves index.html for client-side routes.
category: static-sites
audience: user
updated: 2026-05-19
related:
  - /static-sites/create-site
  - /static-sites/redirects-headers-404
  - /static-sites/troubleshooting
---

# SPA fallback

Single-page applications (SPAs) built with frameworks like React, Vue,
Angular, or Svelte use client-side routing. When a visitor requests a
path like `/about`, the server needs to serve `index.html` so the
framework's JavaScript router can handle the URL.

SPA fallback mode tells Mincemeat to serve your `index.html` file
whenever a visitor requests a path that does not match an actual file
in your deployment.

## Before you start

- You must be signed in.
- You must own the static site.
- Your site must be a single-page application with client-side routing.

## How SPA fallback works

When SPA mode is **enabled** and a visitor requests a path:

1. Mincemeat checks if a file exists at the requested path.
2. If the file exists, it is served normally.
3. If no file exists **and** the path does not look like a static
   asset (no file extension like `.js`, `.css`, `.png`), Mincemeat
   serves `/index.html` instead.
4. Your application's JavaScript router renders the correct view.

When SPA mode is **disabled**, requests for missing paths return a 404
response (or your custom 404 page, if configured).

## Enable SPA fallback

### During site creation

1. When creating your site, expand the settings section.
2. Enable **SPA mode**.
3. Complete the site creation.

### On an existing site

1. Open the site detail view.
2. Open the **Settings** section.
3. Enable **SPA mode**.
4. Save.

The change takes effect immediately for new requests.

## Disable SPA fallback

1. Open the site detail view.
2. Open the **Settings** section.
3. Disable **SPA mode**.
4. Save.

## What counts as a static asset path

Mincemeat uses the file extension to decide whether a path looks like
a static asset. Paths with common asset extensions are not redirected
to `index.html`, even in SPA mode.

| Request path | SPA mode behaviour |
| --- | --- |
| `/about` | Serve `index.html` (no file extension) |
| `/dashboard/settings` | Serve `index.html` (no file extension) |
| `/styles/app.css` | Return 404 if file missing (asset extension) |
| `/assets/logo.png` | Return 404 if file missing (asset extension) |

## SPA fallback and other features

| Feature | Interaction |
| --- | --- |
| **Redirects** | Evaluated **before** SPA fallback. If a redirect matches, the visitor is redirected. |
| **Custom 404** | If SPA mode is disabled and no file matches, the custom 404 page is served. With SPA mode enabled, the 404 page is only served for asset paths. |
| **Custom headers** | Applied to all responses, including the `index.html` served by SPA fallback. |

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Deep links return 404 | Make sure SPA mode is enabled in site settings. |
| Missing assets serve HTML instead of 404 | Check that your asset paths are correct in your build output. Files with extensions are not affected by SPA fallback. |

## Related

- [Create a site](/static-sites/create-site)
- [Redirects, headers, and custom 404](/static-sites/redirects-headers-404)
- [Troubleshooting](/static-sites/troubleshooting)
