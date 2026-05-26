---
title: CMS Troubleshooting
description: Diagnose and fix API authentication errors, CORS blocks, rate limits, and database query issues.
category: headless-cms
audience: user
updated: 2026-05-26
related:
  - /headless-cms/index
  - /headless-cms/api-keys
  - /headless-cms/query-dsl
---

# CMS Troubleshooting

Diagnose and resolve common errors and behaviors when working with Mincemeat Headless CMS projects, API requests, and media assets.

## Troubleshooting matrix

| Problem / Error | Likely Cause | Recommended Fix |
| --- | --- | --- |
| **CORS block in browser** (e.g. preflight fails) | The domain hosting your frontend application is not registered in the CORS allowed origins list. | 1. Go to the CMS dashboard.<br>2. Open **Settings -> Access & CORS**.<br>3. Under **CORS Origins**, add your application's domain (such as `https://example.com` or `http://localhost:3000`).<br>4. Save the origin. The update propagates to the edge in seconds. |
| **429 Too Many Requests** | Your client has exceeded the edge API rate limit window. | 1. Implement client-side caching (such as SWR or TanStack Query) to reuse responses.<br>2. Check for infinite loops in your frontend data fetching code.<br>3. If your application legitimately requires higher limits, contact your Mincemeat administrator to adjust your plan quotas. |
| **400 Bad Request** during filter or sort query | You are attempting to filter (`?filter[field][eq]`) or sort (`?sort=field`) using a field that is not marked as filterable. | 1. Go to the **Collections** workspace tab.<br>2. Select the collection and toggle the view to **Schema Designer**.<br>3. Edit the target field and toggle the **Filterable** switch on.<br>4. Click **Publish Schema** at the bottom of the left collections sidebar to generate the database column and SQLite index. |
| **412 Precondition Failed** | An optimistic locking conflict occurred. You included the `If-Match: "<etag>"` header, but the entry was mutated by another user since you fetched it. | 1. Retrieve the latest version of the entry using a `GET` request.<br>2. Merge or reconcile the differences between the current version and your updates.<br>3. Retry the `PATCH` or `PUT` mutation using the new `ETag` returned by the `GET` request. |
| **413 Payload Too Large** (during upload) | The uploaded file exceeds the platform's **100 MB** limit. | 1. Compress zip archives or downscale media assets before uploading.<br>2. If uploading videos or large binaries, host them on external storage and save the URLs in a text field. |
| **413 Payload Too Large** (image retrieval) | The source image requested for on-demand resizing exceeds the **8 megapixel (8 MP)** edge CPU protection cap. | 1. Downscale the source image before uploading so its total pixels are under 8,000,000.<br>2. Request the file *without* resizing query parameters to retrieve the original image directly from R2 without edge transformation compute. |
| **API requests return stale data** | The request is hitting the edge CDN cache instead of fetching the latest changes. | 1. If you just updated the schema or content, wait a few seconds for automatic purging to complete.<br>2. Send a `POST /cache/purge` request using an API key containing the `cache:purge` scope to force invalidation.<br>3. For development, append a cache-busting query parameter (e.g. `?t=timestamp`) or use the `Cache-Control: no-cache` header. |
| **API Key returns 401 Unauthorized** | The bearer token header is missing, malformed, or the key was revoked. | 1. Confirm your header matches: `Authorization: Bearer <key>`.<br>2. Check that the key has not been deleted or disabled on the dashboard.<br>3. If you lost the original key, generate a new one. |
| **API Key returns 403 Forbidden** | The key does not have the scope required for the endpoint (e.g. using a `content:read` key to save a draft). | 1. Generate a new API key containing the required scope (such as `content:write`).<br>2. Check that the key is being used for the correct CMS project. |

## Related

- [API Keys & Security](/headless-cms/api-keys)
- [Query DSL reference](/headless-cms/query-dsl)
- [Headless CMS Overview](/headless-cms/index)
