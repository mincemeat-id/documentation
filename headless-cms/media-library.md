---
title: Media Library
description: Upload files, manage assets, and request on-demand image transformations at the edge.
category: headless-cms
audience: user
updated: 2026-05-25
related:
  - /headless-cms/index
  - /headless-cms/content-management
  - /headless-cms/query-dsl
---

# Media Library

The Media Library is a central file manager built directly into the Mincemeat CMS. All uploaded assets are stored securely in Cloudflare R2 and served with high-performance on-demand transformations directly from edge locations.

## Before you start

- You must have the necessary access permissions (Editor or Administrator role) to upload or manage assets.
- Your files must be under the **100 MB** upload limit.

## Upload workflow and details

When you upload a file via the dashboard or the media REST API:

1. **Magic bytes verification**: The system sniffs the file's binary stream (magic bytes) to verify its actual MIME type. This prevents malicious files from masquerading as safe file extensions.
2. **SHA-256 deduplication**: The system computes a SHA-256 hash of the uploaded stream. If the hash matches an asset already in your project's library, the system skips uploading duplicate bytes and associates the existing asset with your collection.
3. **Metadata tracking**: Asset properties (file size, width, height, mime type, hash) are saved to your SQLite database for quick lookup.

## On-demand image variants

For images, Mincemeat uses an edge-based processing engine (`@cf-wasm/photon` compiled from Rust) to transform images on the fly.

To request a custom variant, append query parameters to the file retrieval URL:

`GET https://{project}.cms.mincemeat.app/v1/{project}/media/{id}/file?w=800&h=600&fit=cover&fmt=webp&q=85`

### Query parameters

- `w` (width): Requested width in pixels.
- `h` (height): Requested height in pixels.
- `fit`: How the image fits the dimensions. Options:
  - `cover`: Crops the image to fit the aspect ratio (default).
  - `contain`: Resizes the image to fit entirely within the box without cropping.
  - `fill`: Stretches the image to match the dimensions.
- `fmt` (format): Output image format. Options: `webp` (recommended), `avif`, `jpeg`, `png`.
- `q` (quality): Compression quality from `1` (smallest file size) to `100` (highest quality). Defaults to `85`.

### CPU protection guardrails

Because edge-based processing runs on constrained serverless execution threads, Mincemeat enforces safety caps to prevent CPU limits from being exceeded:

::: warning Megapixel Limit
Source images used for on-demand transformations must not exceed **8 megapixels (8 MP)** (for example, a `2000 x 4000` image).
:::

- If you attempt to transform an image larger than 8 MP on the fly, the request fails with a `413 Payload Too Large` error.
- For images larger than 8 MP, a background worker automatically pre-generates common default sizes (small, medium, large) and saves them in R2, or serves the original file directly.

### Performance and caching

Once an image variant is generated, it is:

1. Written back to R2 storage under `variants/{w}x{h}_{fit}.{ext}`.
2. Cached in the global Cloudflare Cache API.
Subsequent requests for the same dimensions are served instantly from the edge cache without running any image processing compute.

## Related

- [Headless CMS Overview](/headless-cms/index)
- [Content management](/headless-cms/content-management)
- [Query DSL reference](/headless-cms/query-dsl)
