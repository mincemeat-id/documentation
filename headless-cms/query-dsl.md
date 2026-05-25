---
title: Query DSL Reference
description: Complete REST API guide, query parameters, filtering operators, pagination, and relationship inclusion.
category: headless-cms
audience: user
updated: 2026-05-25
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

- **Plan A (Custom Subdomain)**: `https://{project-slug}.cms.mincemeat.app/v1/{project-slug}/`
- **Plan B (Path-Based Fallback)**: `https://cms.mincemeat.app/v1/{project-slug}/`

## Endpoint Index

### Content collections

| Method | Route | Scope | Description |
| --- | --- | --- | --- |
| **GET** | `/collections/{collection}` | `public-read` | List entries (paginated, filtered). |
| **GET** | `/collections/{collection}/{id}` | `public-read` | Retrieve a single content entry. |
| **POST** | `/collections/{collection}` | `write` | Create a new entry (saves as draft). |
| **PATCH** | `/collections/{collection}/{id}` | `write` | Partially update fields on an entry. |
| **PUT** | `/collections/{collection}/{id}` | `write` | Replace an entire entry. |
| **DELETE** | `/collections/{collection}/{id}` | `write` | Soft-delete an entry to the Trash bin. |
| **POST** | `/collections/{collection}/{id}/publish` | `write` | Transition an entry from Draft to Published. |

### Media library

| Method | Route | Scope | Description |
| --- | --- | --- | --- |
| **GET** | `/media` | `public-read` | List media asset metadata records. |
| **POST** | `/media` | `write` | Upload a new file (multipart/form-data). |
| **GET** | `/media/{id}` | `public-read` | Retrieve metadata for one media file. |
| **GET** | `/media/{id}/file` | `public-read` | Fetch the file (supports resizing query parameters). |
| **DELETE** | `/media/{id}` | `write` | Soft-delete a media asset to the Trash bin. |

### Utilities

| Method | Route | Scope | Description |
| --- | --- | --- | --- |
| **GET** | `/openapi.json` | None (Public) | Fetch the dynamically generated OpenAPI schema. |
| **POST** | `/cache/purge` | `admin` | Instantly invalidate edge caches for the project. |

## Query DSL Parameters

The `GET /collections/{collection}` endpoint accepts query parameters to filter, sort, paginate, and expand relations.

### 1. Filtering

Filters use the format `?filter[field_slug][operator]=value`.

::: important Filterable Check
You can only filter on fields that have been configured with **Filterable** (`is_filterable: true`) in the Schema Designer. Attempting to filter on non-indexed fields returns a `400 Bad Request` error to protect edge performance.
:::

#### Supported operators

- `eq`: Equal to (e.g. `?filter[status][eq]=published`)
- `ne`: Not equal to
- `gt`: Greater than (e.g. `?filter[views][gt]=100`)
- `gte`: Greater than or equal to
- `lt`: Less than
- `lte`: Less than or equal to
- `contains`: Substring search (string fields only, e.g. `?filter[title][contains]=news`)
- `in`: Match any value in a comma-separated list (e.g. `?filter[category][in]=news,events`)

#### Example filter query

```http
GET /v1/my-blog/collections/posts?filter[status][eq]=published&filter[published_at][gte]=1716595200
```

### 2. Sorting

Sort results using `?sort=field_slug` (ascending) or `?sort=-field_slug` (descending).

- You can sort by multiple fields using a comma-separated list: `?sort=-published_at,title`.
- Like filtering, you can only sort by fields marked as **Filterable** in your schema.

### 3. Pagination

API listings are paginated by default:

- `page`: Page index to retrieve (defaults to `1`).
- `pageSize`: Number of entries per page (defaults to `20`, maximum `100`).

The response is returned in a standard envelope:

```json
{
  "data": [
    { "id": "01J...1", "title": "First Post", ... }
  ],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 145
  }
}
```

### 4. Relationship Inclusion

Fields of type `relation` or `media` normally return only the ID of the referenced entry or file. You can expand these references inline by adding the `include` parameter:

```http
GET /v1/my-blog/collections/posts/01HZZ...1?include=author,cover_image
```

This returns the full referenced record directly inside the parent object:

```json
{
  "id": "01HZZ...1",
  "title": "First Post",
  "author": {
    "id": "01HZZ...2",
    "name": "Jane Doe"
  },
  "cover_image": {
    "id": "01HZZ...3",
    "filename": "banner.webp",
    "width": 1200
  }
}
```

## Concurrency & Optimistic Locking

To prevent editing conflicts when multiple users or systems edit the same content simultaneously:

- **Schema Version**: Every API response contains the `X-CMS-Schema-Version` header. If a client attempts to save changes using a stale schema configuration, the request is rejected.
- **Optimistic Concurrency Control (OCC)**: `GET` endpoints return an `ETag` header. When sending a modifying request (`PATCH`, `PUT`, or `DELETE`), include the `If-Match: "<etag>"` header.
  - If the content has changed since you fetched it, the Worker aborts with a `412 Precondition Failed` error, allowing you to handle the conflict safely.

## Related

- [Schema Designer](/headless-cms/schema-designer)
- [API Keys & Security](/headless-cms/api-keys)
