---
title: Webhooks & Exports
description: Set up content webhooks, verify signatures, configure static site rebuild presets, and run data exports.
category: headless-cms
audience: user
updated: 2026-05-25
related:
  - /headless-cms/index
  - /headless-cms/content-management
  - /static-sites/github-deployments
---

# Webhooks & Exports

Mincemeat provides webhooks to notify external services when content changes, and backup tools to export your project schemas and entries at any time.

## Webhooks

Webhooks let you build event-driven workflows. When content is updated, Mincemeat dispatches an HTTP POST request containing the event data payload to your endpoint.

### Supported events

You can configure webhooks to trigger on the following events:

- `entry.created` / `entry.updated`
- `entry.published` / `entry.unpublished`
- `entry.trashed` (moved to Trash) / `entry.restored` (restored from Trash)
- `entry.purged` (permanently deleted)
- `media.uploaded` / `media.deleted`
- `schema.published` (schema structure modified)

### Queue-backed delivery

To prevent loss of delivery notifications during destination server outages, Mincemeat runs webhooks through an asynchronous edge queue:

- **Retries**: If your destination server returns a non-2xx response, Mincemeat retries delivery using an exponential back-off strategy for up to **24 hours**.
- **HMAC Signatures**: Every webhook payload is signed. Mincemeat adds an `X-Mincemeat-Signature` header containing a SHA-256 HMAC hex hash calculated using the webhook's private secret and the raw request body:

  ```http
  X-Mincemeat-Signature: sha256=a1b2c3d4...
  ```

  Your receiving server should compute the same signature using your secret to verify that the request originated from Mincemeat.

### Static site rebuild preset

If you want content changes to trigger a static site rebuild on Mincemeat automatically:

1. Open the project workspace in the Headless CMS Hub and go to the **Operations** tab.
2. Under the **Webhooks** section, select **Create Webhook**.
3. Select the **Trigger Rebuild** preset.
4. Choose the target static site from the dropdown list.
5. Mincemeat configures a special internal URL: `mincemeat://static-sites/{site_id}`.
6. Whenever a content publish event occurs, the webhooks engine translates this URL and triggers a new deployment pipeline for your static site.

---

## Data backups and exports

You can export your entire project database and configurations at any time.

### Export format

An export produces a single compressed archive (`.tar.gz`) containing:

- `manifest.json`: Schema version metadata, collection definitions, and field types.
- `entries.ndjson`: Every content entry (including drafts and trashed records) saved as a newline-delimited JSON list.
- `media.ndjson`: Metadata records for all files in your media library.

::: note Media Files
Exports contain the *metadata* index for media files (allowing you to rebuild database relationships), but do not package the original binary assets. Original files remain hosted in R2 storage under their respective hashes.
:::

### Steps: Export project data

1. Open the project workspace in the Headless CMS Hub and select the **Operations** tab.
2. Under the **Data Export** section, select **Create Export**.
3. The control plane enqueues a background task to package your database tables.
4. Once the export is generated, click **Download** next to the export record in the export history table.

The download link is signed and remains valid for **24 hours** before expiring.

## Related

- [Headless CMS Overview](/headless-cms/index)
- [Deploy from GitHub](/static-sites/github-deployments)
