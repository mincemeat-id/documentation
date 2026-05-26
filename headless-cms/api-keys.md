---
title: API Keys & Security
description: Manage REST API keys, assign access scopes, and configure CORS origins to protect your content.
category: headless-cms
audience: user
updated: 2026-05-26
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
| `content:read` | Fetch entries, list collections, and view media metadata. | Public frontend websites (Astro, Next.js, static sites). |
| `content:write` | Create entries, save drafts, publish content, upload/delete media, and soft-delete entries. | Content editor dashboards or private integration scripts. |
| `cache:purge` | Manually purge edge CDN caches for a project, collection, or entry. | Build triggers or deploy automation scripts. |
| `webhooks:write` | Replay webhook delivery events. | Monitoring and debugging dashboards. |
| `export:write` | Trigger and download project backups. | Automated backup tasks or database sync scripts. |
| `*` | Full CRUD operations and administrative controls. | DevOps tools, CLI agents, or full system integrations. |

## Cross-Origin Resource Sharing (CORS)

CORS is a browser security mechanism that prevents web pages from making API requests to a different domain unless explicitly allowed.

- **Deny-by-Default**: Mincemeat denies all cross-origin requests by default. If a client app running at `https://my-app.example.com` attempts to query your CMS endpoint without a configured CORS origin, the browser blocks the response.
- **CORS Configuration**: You can configure approved origins (such as `https://example.com` or local dev URLs like `http://localhost:3000`) for your project under **Settings -> Access & CORS**. Wildcards (such as `*`) are allowed but not recommended for production.

::: danger Keep Secrets Safe
Never check `content:write` or `*` API keys into source repositories or bundle them in client-side code. Use `content:read` keys for public frontend apps, and keep write/admin keys strictly on secure server environments.
:::

## Steps: Manage keys and CORS origins

### Create an API Key

1. Open the **Headless CMS** Hub from the main sidebar.
2. Select **Open Workspace** on your project card.
3. Select the **Settings** workspace tab, and choose the **Access & CORS** sub-tab.
4. Locate the **API Keys** creation form:
   - **Key Name**: Enter a descriptive name (e.g., `NextJS Production App`).
   - **Type**: Choose **Public** (for client-side browser requests) or **Service** (for secure server-to-server calls).
   - **Scopes**: Specify the required scopes as a comma-separated list (e.g., `content:read`).
5. Select **Create**.
6. Copy the displayed key immediately. **It will not be shown again.**

### Add a CORS Origin

1. Navigate to **Settings -> Access & CORS**.
2. Locate the **CORS Origins** form on the right column.
3. Enter your web application's origin URL (e.g., `https://example.com` or `http://localhost:3000`).
4. Select **Add**.

## Related

- [Headless CMS Overview](/headless-cms/index)
- [Query DSL reference](/headless-cms/query-dsl)
- [CMS Troubleshooting](/headless-cms/troubleshooting)
