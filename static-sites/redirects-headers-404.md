---
title: Redirects, headers, and custom 404
description: Configure redirect rules, custom response headers, and a custom 404 page for your static site.
category: static-sites
audience: user
updated: 2026-05-19
related:
  - /static-sites/spa-fallback
  - /static-sites/create-site
  - /static-sites/troubleshooting
---

# Redirects, headers, and custom 404

Mincemeat lets you configure redirect rules, custom response headers,
and a custom 404 page for your static site. These settings are applied
at the edge — they take effect before files are served and work
consistently across all your domains.

## Before you start

- You must be signed in.
- You must own the static site.

## Redirect rules

Redirect rules let you send visitors from one path to another. Use
them when you rename or move pages, consolidate URLs, or redirect
from an old path to a new one.

### How redirects work

When a visitor requests a URL, Mincemeat checks your redirect rules
**before** looking up files. If a rule matches the request path, the
visitor is redirected to the destination path with the configured
status code.

### Add a redirect rule

1. Open the site detail view.
2. Open the **Settings** section.
3. In the **Redirect rules** area, select **Add rule**.
4. Enter the **Source** path — the path visitors may request (for
   example, `/old-page`).
5. Enter the **Destination** path — where visitors should be sent (for
   example, `/new-page`).
6. Choose a **Status code**:
   - **301** — permanent redirect. Search engines update their index.
   - **302** — temporary redirect. Search engines keep the original
     URL.
7. Save.

### Redirect rule examples

| Source | Destination | Status | Effect |
| --- | --- | --- | --- |
| `/blog` | `/articles` | 301 | Permanently redirect `/blog` to `/articles`. |
| `/old-page` | `/new-page` | 301 | Permanently redirect a renamed page. |
| `/promo` | `https://shop.example.com/sale` | 302 | Temporarily redirect to an external URL. |

### Evaluation order

Redirect rules are evaluated in the order you define them. The first
matching rule wins. If no rule matches, request processing continues
to file lookup and SPA fallback.

## Custom response headers

Custom headers let you add HTTP response headers to every response
from your site. Use them for security policies, caching hints, or
custom metadata.

### Add a custom header

1. Open the site detail view.
2. Open the **Settings** section.
3. In the **Custom headers** area, add a header name and value.
4. Save.

### Allowed headers

You can set most standard and custom headers. However, Mincemeat does
not allow you to override platform-managed headers:

| Blocked header | Reason |
| --- | --- |
| `Content-Length` | Set automatically based on file size. |
| `Content-Encoding` | Managed by the serving infrastructure. |
| `Host` | Set by the visitor's request. |

If you try to set a blocked header, it is silently ignored.

### Common custom headers

| Header | Value | Purpose |
| --- | --- | --- |
| `X-Frame-Options` | `DENY` | Prevent your site from being embedded in iframes. |
| `X-Content-Type-Options` | `nosniff` | Prevent MIME-type sniffing. |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Control referrer information. |
| `Permissions-Policy` | `camera=(), microphone=()` | Disable unused browser features. |

## Custom 404 page

By default, when a visitor requests a path that does not match any
file, Mincemeat returns a generic 404 response. You can replace this
with your own HTML page.

### Set a custom 404 page

1. Include a 404 page in your deployment (for example, `404.html` at
   the root of your site files).
2. Open the site detail view.
3. Open the **Settings** section.
4. Set the **Custom 404 path** to the path of your error page (for
   example, `/404.html`).
5. Save.

When a visitor requests a path with no matching file, Mincemeat
serves your custom page with a `404` status code.

### Custom 404 and SPA fallback

If SPA mode is **enabled**, the custom 404 page is only served for
paths that look like static assets (paths with a file extension). All
other missing paths serve `index.html` through SPA fallback instead.

If SPA mode is **disabled**, the custom 404 page is served for all
missing paths.

## Feature interaction summary

Mincemeat processes each request in this order:

1. **Redirect rules** — if a rule matches, redirect immediately.
2. **File lookup** — if a file exists at the path, serve it.
3. **SPA fallback** — if enabled and the path has no file extension,
   serve `index.html`.
4. **Custom 404** — if configured and no file was found, serve the
   custom 404 page with a `404` status.
5. **Default 404** — return a generic 404 response.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Redirect not working | Check that the source path matches exactly. Redirects are case-sensitive. |
| Redirect loop | Make sure the destination does not redirect back to the source. |
| Custom header not appearing | Check that the header name is not on the blocked list. Inspect response headers in your browser's developer tools. |
| Custom 404 page not showing | Verify the path matches a file in your deployment. Make sure SPA mode is disabled if you want the 404 page for all missing paths. |

## Related

- [SPA fallback](/static-sites/spa-fallback)
- [Create a site](/static-sites/create-site)
- [Troubleshooting](/static-sites/troubleshooting)
