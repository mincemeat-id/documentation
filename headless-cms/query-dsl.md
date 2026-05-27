---
title: Query DSL Reference
description: Complete REST API guide, query parameters, filtering, pagination, and relationship inclusion.
category: headless-cms
audience: user
updated: 2026-05-27
related:
  - /headless-cms/index
  - /headless-cms/schema-designer
  - /headless-cms/api-keys
---

# Query DSL Reference

The Headless CMS exposes a clean, edge-cached REST API generated dynamically for your project. You can filter, sort, paginate, and join relationships using Mincemeat's query parameters.

## API Host and Base URL

All requests must include your bearer API key in the authorization header:

```http
Authorization: Bearer <your-api-key>
```

Depending on your DNS routing, the REST API is accessible at:

- **Subdomain Routing**: `https://{project-slug}.cms.mincemeat.app/v1/`
- **Path Fallback Routing**: `https://cms.mincemeat.app/v1/{project-slug}/`

### Example Endpoint Resolution

When querying a collection named `posts` in a project with the slug `my-blog`:

- Using subdomain: `GET https://my-blog.cms.mincemeat.app/v1/collections/posts`
- Using path fallback: `GET https://cms.mincemeat.app/v1/my-blog/collections/posts`

---

## Endpoint Index

### Content collections

| Method | Route (Subdomain Mode) | Required Scope | Description |
| --- | --- | --- | --- |
| **GET** | `/v1/collections/{collection}` | `content:read` | List entries (paginated, filtered). |
| **GET** | `/v1/collections/{collection}/{id}` | `content:read` | Retrieve a single content entry. |
| **POST** | `/v1/collections/{collection}` | `content:write` | Create a new entry (saves as draft). |
| **PATCH** | `/v1/collections/{collection}/{id}` | `content:write` | Partially update fields on an entry. |
| **PUT** | `/v1/collections/{collection}/{id}` | `content:write` | Replace an entire entry. |
| **DELETE** | `/v1/collections/{collection}/{id}` | `content:write` | Soft-delete an entry to the Trash bin. |
| **POST** | `/v1/collections/{collection}/{id}/publish` | `content:write` | Transition an entry from Draft to Published. |

### Media library

| Method | Route (Subdomain Mode) | Required Scope | Description |
| --- | --- | --- | --- |
| **GET** | `/v1/media` | `content:read` | List media asset metadata records. |
| **POST** | `/v1/media` | `content:write` | Upload a new file (multipart/form-data). |
| **GET** | `/v1/media/{id}` | `content:read` | Retrieve metadata for one media file. |
| **GET** | `/v1/media/{id}/file` | `content:read` | Fetch the binary file (supports resizing query parameters). |
| **DELETE** | `/v1/media/{id}` | `content:write` | Hard-delete a media asset. |

### Utilities

| Method | Route (Subdomain Mode) | Required Scope | Description |
| --- | --- | --- | --- |
| **GET** | `/v1/openapi.json` | None (Public) | Fetch the dynamically generated OpenAPI schema. |
| **POST** | `/v1/cache/purge` | `cache:purge` | Instantly invalidate edge caches for the project. |

---

## Query DSL Parameters

The `GET /v1/collections/{collection}` endpoint accepts query parameters to filter, sort, paginate, and expand relations.

### 1. Filtering

Filters are applied as exact matches on fields using the format `?filter[field_slug]=value`.

::: important Filterable Check
You can only filter on fields that have been configured with **Filterable** (`is_filterable: true`) in the Schema Designer. Attempting to filter on non-indexed fields returns a `400 Bad Request` error to protect edge database performance.
:::

#### Exact-Match Constraint

The REST API in V1 checks for strict equality. Comparison operators (such as `[eq]`, `[gt]`, `[contains]`, or `[in]`) are not supported. You can combine multiple exact filters on different fields.

#### Example Filter Query

To find entries in `posts` where the custom filterable field `category` equals `news`:

```http
GET https://my-blog.cms.mincemeat.app/v1/collections/posts?filter[category]=news
```

To search across the full JSON document text block (equivalent to a SQL `LIKE %query%` search), use the `q` parameter:

```http
GET https://my-blog.cms.mincemeat.app/v1/collections/posts?q=searchterm
```

To filter entries by their lifecycle status, use the `status` parameter (supported values are `draft` or `published`):

```http
GET https://my-blog.cms.mincemeat.app/v1/collections/posts?status=published
```

### 2. Sorting

Sort results using `?sort=field_slug` (ascending) or `?sort=-field_slug` (descending).

- Sorting is supported for a single field slug at a time. Multi-field comma-separated sorting is not supported.
- Like filtering, you can only sort by fields marked as **Filterable** in your schema.
- If no sort parameter is provided, listings default to sorting by `updated_at DESC`.

```http
GET https://my-blog.cms.mincemeat.app/v1/collections/posts?sort=-published_date
```

### 3. Pagination

API listings are paginated using `limit` and `offset` constraints to protect edge compute:

- `limit`: The number of items to return. Defaults to `25`, clamped between `1` and `100`.
- `offset`: The number of items to skip. Defaults to `0`, clamped between `0` and `10000`.

The paginated result is returned in the following envelope format:

```json
{
  "items": [
    {
      "id": "7ca6473e-324c-4fb2-a5e2-6bb51b54a71b",
      "collection": "posts",
      "locale": "en",
      "status": "published",
      "version": 2,
      "data": {
        "title": "First Blog Post",
        "category": "news",
        "published_date": "2026-05-27"
      },
      "created_at": "2026-05-27T10:00:00Z",
      "updated_at": "2026-05-27T10:30:00Z",
      "published_at": "2026-05-27T10:30:00Z",
      "deleted_at": null
    }
  ],
  "total": 1,
  "limit": 25,
  "offset": 0
}
```

### 4. Relationship Inclusion

Fields of type `relation` or `media` normally return only the UUID string referencing the target entry or media asset. You can expand these references inline by adding the `include` parameter with comma-separated field slugs:

```http
GET https://my-blog.cms.mincemeat.app/v1/collections/posts/7ca6473e-324c-4fb2-a5e2-6bb51b54a71b?include=author,cover_image
```

This returns the full referenced record directly inside the parent object:

```json
{
  "id": "7ca6473e-324c-4fb2-a5e2-6bb51b54a71b",
  "collection": "posts",
  "data": {
    "title": "First Blog Post",
    "author": {
      "id": "e96ab2c3-4318-47fb-ba8e-cbb96ee4ba81",
      "collection": "authors",
      "locale": "en",
      "status": "published",
      "version": 1,
      "data": {
        "name": "Jane Doe"
      }
    },
    "cover_image": {
      "id": "d0fbc05c-1919-450a-8a03-7cbdfa2c2ef1",
      "filename": "banner.webp",
      "content_type": "image/webp",
      "size_bytes": 14205,
      "sha256": "abcdef...",
      "alt_text": "Post Banner"
    }
  }
}
```

---

## Concurrency & Optimistic Locking

To prevent editing conflicts when multiple users or systems edit the same content simultaneously:

- **Schema Version**: Every API response contains the `X-CMS-Schema-Version` header. If a client attempts to save changes using a stale schema configuration, the request is rejected.
- **Optimistic Concurrency Control (OCC)**: `GET` endpoints return a strong `ETag` header (e.g. `"2"` representing the version). When sending a modifying request (`PATCH`, `PUT`, or `DELETE`), you must include the matching `If-Match: "<etag>"` header (e.g. `If-Match: "2"`).
  - If the content version has incremented in the database since you fetched it, the edge worker aborts with a `412 Precondition Failed` error, allowing you to handle the conflict safely.

## Related

- [Schema Designer](/headless-cms/schema-designer)
- [API Keys & Security](/headless-cms/api-keys)
