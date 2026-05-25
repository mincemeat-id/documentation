---
title: Headless CMS Overview
description: Retrieve and manage structured content using Mincemeat's edge-cached REST APIs and isolated databases.
category: headless-cms
audience: user
updated: 2026-05-25
related:
  - /headless-cms/schema-designer
  - /headless-cms/content-management
  - /headless-cms/api-keys
---

# Headless CMS Overview

The Mincemeat Headless CMS brings structured content management to the platform. It allows you to define content collections and fields, manage content entries, upload media, and query your data via a high-performance REST API served directly at the Cloudflare edge.

Whether you are building a blog, a documentation site, or a dynamic e-commerce frontend, the Headless CMS abstracts data storage and retrieval so you can focus on building your client application.

## Core capabilities

The CMS platform operates on an edge-first, serverless architecture that provides the following benefits:

- **Isolated databases**: To ensure security and prevent data leaks, every CMS project receives a dedicated Cloudflare D1 database.
- **Edge API delivery**: API requests are resolved at the nearest Cloudflare edge location, providing low-latency responses worldwide.
- **Dynamic OpenAPI specification**: Every project generates a live, public OpenAPI 3.1 schema based on your current content structure.
- **Media variant resizing**: An on-demand media processor resizes and transforms images in memory at the edge, saving you from pre-generating image sizes.
- **Webhook dispatching**: Real-time webhook notifications notify external build engines or services whenever content changes.

## Mental model

To work with the Headless CMS, it is helpful to understand the key parts of the platform:

```text
+--------------------------------------------------------+
|                      Mincemeat UI                      |
|  - Define Schema (Collections & Fields)                |
|  - Manage Content (Create, edit, publish entries)      |
|  - Configure API Keys & Webhooks                      |
+---------------------------+----------------------------+
                            | publishes schema
                            v
+--------------------------------------------------------+
|                     Edge API Plane                     |
|  - Serves {project}.cms.mincemeat.app                  |
|  - Validates scopes & queries against D1 database     |
|  - Runs Photon WASM to resize media files              |
|  - Dispatches webhooks on content changes              |
+--------------------------------------------------------+
```

1. **Project**: The top-level workspace that houses your collections, media, API keys, and settings. Each project corresponds to a dedicated database.
2. **Collection**: A content bucket (like "Articles", "Authors", or "Products") that contains a group of content entries sharing the same structure.
3. **Field**: The individual attributes in a collection, such as a text title, numeric price, or relationship to another collection.
4. **Entry**: An individual content record (like a specific blog post or product listing) with defined values for each field.
5. **API Key**: Scoped credentials that authorize external frontend apps or static builders to read or write project content.

## Limits and guidelines

To protect system resources, the following platform defaults apply:

- **Media Uploads**: Maximum file upload size is **100 MB**.
- **Edge Transformations**: Source images for on-demand variants are capped at **8 megapixels (8 MP)**. Files larger than this are served as originals or pre-processed in the background.
- **Soft-Delete Trash**: Trashed entries are kept in a Trash view for **90 days** by default before being permanently purged.

## Future capabilities (V2 Roadmap)

Advanced features planned for future iterations of the CMS include:

- **GraphQL query interface**: Dynamic GraphQL endpoint per project.
- **Multilingual locales (i18n)**: Field-level translation and localized content workflows.
- **End-user member tokens**: JWT-based user authentication for protected site regions.
- **Custom API endpoints**: Mapping custom domains (like `api.yourdomain.com`) directly to your CMS API host.

## Related

- [Schema Designer](/headless-cms/schema-designer)
- [Content management](/headless-cms/content-management)
- [API keys & security](/headless-cms/api-keys)
