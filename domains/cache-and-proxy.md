---
title: Cache and proxy
description: Understand how Mincemeat caches content and proxies requests for your custom domains.
category: domains
audience: user
updated: 2026-05-19
related:
  - /domains/connect-custom-domain
  - /domains/domain-status
  - /instances/proxy-settings
---

# Cache and proxy

When you connect a custom domain to Mincemeat, your traffic passes
through a proxy layer that handles SSL termination, caching, and
request routing. Understanding how this works helps you troubleshoot
performance issues and configure your domain correctly.

## How the proxy works

Mincemeat acts as a reverse proxy for your custom domain:

1. A visitor requests your custom domain.
2. DNS resolves the domain to Mincemeat's infrastructure.
3. Mincemeat terminates the SSL connection.
4. Mincemeat routes the request to your site or instance.
5. The response is cached (when applicable) and returned to the visitor.

You do not need to configure the proxy manually. Mincemeat manages it
automatically when you connect a domain.

## Caching behavior

Mincemeat caches static content to improve performance. Cached content
is served faster because it does not need to be fetched from your site
or instance on every request.

### What gets cached

- Static files: HTML, CSS, JavaScript, images, fonts.
- Responses with cache-friendly headers.
- Custom 404 pages.

### What does not get cached

- Responses with `Cache-Control: no-store` or `no-cache` headers.
- Dynamic content generated at request time.
- Responses with authentication requirements.

### Cache duration

Cache duration depends on:

- Headers you set on your files (for static sites).
- Default cache policies for your resource type.
- Whether you have configured custom cache rules.

## Purging the cache

If you update content and visitors still see the old version, you may
need to purge the cache.

### When to purge

- You deployed a new version of your static site and changes are not
  visible.
- You updated files on your instance and the proxy is serving stale
  content.
- You changed redirect rules or headers and they are not taking effect.

### How to purge

For static sites, cache is typically purged automatically when you
deploy a new version. If you need to manually purge:

1. Navigate to your static site settings.
2. Select **Domains**.
3. Find your domain and select **Purge Cache**.

For instances, cache purge availability depends on your administrator's
configuration. Check [Proxy settings](/instances/proxy-settings) for
available controls.

## Proxy settings for instances

Instance proxy settings are managed separately from static sites.
Administrators can configure:

- Authentication mode (public or authenticated access).
- Maintenance mode (temporarily block traffic).
- IP allowlists or blocklists.
- Referrer policies.

As a user, you can view these settings but may not be able to change
them depending on your permissions.

## Headers and caching

For static sites, you can set custom response headers that affect
caching behavior. See
[Redirects, headers, and 404s](/static-sites/redirects-headers-404)
for details on configuring headers.

## Related

- [Connect a custom domain](/domains/connect-custom-domain)
- [Domain status](/domains/domain-status)
- [Proxy settings for instances](/instances/proxy-settings)
- [Redirects, headers, and 404s](/static-sites/redirects-headers-404)
