---
title: API Keys & Security
description: Manage REST API keys, assign access scopes, and configure CORS origins to protect your content.
category: headless-cms
audience: user
updated: 2026-05-25
related:
  - /headless-cms/index
  - /headless-cms/query-dsl
  - /headless-cms/troubleshooting
---

# API Keys & Security

To query or modify content via the Mincemeat Headless CMS REST API, requests must be authenticated. The platform implements scoped API keys, write-only credential storage, and CORS (Cross-Origin Resource Sharing) policies to keep your project data secure.

## Key storage and format

All CMS API requests require a bearer token in the HTTP authorization header:

```http
Authorization: Bearer <your-api-key>
```

- **Write-Only Credentials**: For security, Mincemeat hashes your API keys using **Argon2id** on the control plane. You can copy the raw key only *once* immediately after creation. Mincemeat administrators and databases cannot read the raw key back. If you lose a key, you must delete it and create a new one.
- **Immediate Propagation**: When you create or revoke an API key, the changes are published to Cloudflare KV and become active across all edge locations within seconds.

## API Scopes

API keys are restricted by scopes to limit potential damage if a key is exposed:

| Scope | Allowed Operations | Typical Use Case |
| --- | --- | --- |
| `public-read` | Fetch entries, list collections, and view media metadata. | Public frontend websites (Astro, Next.js, static sites). |
| `write` | Create entries, save drafts, publish content, upload media, and soft-delete entries. | Content editor dashboards or private integration scripts. |
| `admin` | Full CRUD operations plus utility controls like purging edge caches. | DevOps tools, build systems, or database migrations. |

You can also restrict keys to **allowed collections** so a key can only access specific slugs (e.g., a key that is only allowed to access `posts` but not `users`).

## Cross-Origin Resource Sharing (CORS)

CORS is a browser security mechanism that prevents web pages from making API requests to a different domain unless explicitly allowed.

- **Deny-by-Default**: Mincemeat denies all cross-origin requests by default. If a client app running at `https://my-app.example.com` attempts to query your CMS endpoint without a configured CORS origin, the browser blocks the response.
- **CORS Configuration**: You can list approved origins (such as `https://example.com` or local dev URLs like `http://localhost:3000`) on your project settings. Wildcards (such as `*`) are allowed but not recommended for production keys.

::: danger Keep Secrets Safe
Never check `write` or `admin` API keys into source repositories or bundle them in client-side code. Use `public-read` keys for public frontend apps, and keep write keys strictly on secure server environments.
:::

## Steps: Create an API Key

1. Go to the CMS dashboard and select your project.
2. Select **Settings** and choose **API Keys**.
3. Select **Create Key**.
4. Configure the key:
   - Provide a descriptive **Name** (e.g., `Production Read Key`).
   - Select the required **Scope** (e.g., `public-read`).
   - Choose the allowed collections (default is all).
   - Enter one or more **Allowed Origins** for CORS validation (one per line).
5. Select **Generate Key**.
6. Copy the displayed key immediately and save it in a secure credential manager or environment file.

## Related

- [Headless CMS Overview](/headless-cms/index)
- [Query DSL reference](/headless-cms/query-dsl)
- [CMS Troubleshooting](/headless-cms/troubleshooting)
