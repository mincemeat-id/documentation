---
title: Schema Designer
description: Create CMS projects, configure collections, define field types, and publish database schemas.
category: headless-cms
audience: user
updated: 2026-05-27
related:
  - /headless-cms/index
  - /headless-cms/create-project
  - /headless-cms/content-management
  - /headless-cms/query-dsl
---

# Schema Designer

The Schema Designer allows you to model your content structure visually. In Mincemeat, you define collections (like *Posts* or *Products*) and add specific fields to them.

Once your design is complete, publishing the schema creates and updates the underlying tables in your dedicated edge database.

## Before you start

- You must be signed in to your Mincemeat account.
- You must have a CMS project. If you do not have one, click **Add CMS Project** in the Headless CMS Hub and follow the wizard to name and configure the project. See [Creating a CMS Project](/headless-cms/create-project) for details.

## Supported field types

You can customize your collections with the following field types:

| Type | Purpose | Validation Rules |
| --- | --- | --- |
| **Text** | Short string values (e.g., titles, names). | Min/max length, regex patterns. |
| **Rich Text** | Formatted HTML content (e.g., body copy). | Sanitized automatically on the server. |
| **Number** | Numeric values (integers or decimals). | Min/max values. |
| **Boolean** | True or false toggles. | None. |
| **Date** | ISO date/time picker. | Range limits. |
| **Enum** | Select from a predefined list of text options. | Allowed values list. |
| **Media** | Links to uploaded files in the Media Library. | Allowed MIME types. |
| **Relation** | Creates a reference link to entries in another collection. | Target collection. |

## The hybrid schema model

To allow you to add fields quickly without locking your database or slowing down requests, Mincemeat uses a **Hybrid Schema design**:

- **Non-filterable fields**: When you add standard fields, their values are saved inside a single JSON document block (`data` column). This makes adding or removing fields instantaneous—it does not touch your database tables directly.
- **Filterable/Sortable fields**: If you toggle **Filterable** (`is_filterable: true`) on a field, Mincemeat generates a database expression index for it during publishing:

  ```sql
  CREATE INDEX IF NOT EXISTS idx_{collection}_{field} ON entries(collection, locale, json_extract(data, '$.{field}'));
  ```

  This ensures that when you filter or sort by this field in your API queries, the database uses an index rather than scanning every document.

::: warning Performance Warning
Only mark a field as **Filterable** if you intend to filter or sort by it in your API queries (e.g., a post's status, publish date, or slug). Adding too many filterable fields increases storage requirements and indexing overhead on write operations.
:::

## Steps: Create and publish a schema

Follow these steps to create a collection and define its fields:

### Step 1: Create a collection

1. Open the **Headless CMS** Hub from the main sidebar.
2. Click **Open Workspace** on your project. You will automatically land on the **Collections** workspace tab.
3. In the left sidebar of the Collections view, select **+ New** next to the Collections header.
4. You can choose to design a custom collection or select a **Preset Template**:
   - **Preset Templates**: Predefined content schemas for standard use cases (such as a *Blog*, *Contact Form*, or *Job Listing*). Selecting a preset automatically pre-seeds the collection with recommended fields.
5. Enter a **Name** (e.g., `Blog Posts`) and a **Slug** (e.g., `posts`). The slug is used in your REST API endpoints.
6. Select **Create** or **Import**.

### Step 2: Add and manage fields

1. Select your collection from the left sidebar of the **Collections** tab.
2. In the top-right corner of the workspace pane, ensure the view toggle is set to **Schema Designer** (next to **Entries** and **Permissions**).
3. Select **+ Add Field**.
4. Enter a field name, slug, and choose the **Field Type**.
5. In the field settings panel:
   - Configure validation rules (such as marking the field as required).
   - Toggle **Filterable** if you plan to search or sort by this field.
   - Toggle **Localized** if this field should support translated values for enabled project languages (i18n).
6. Select **Save Field**.
7. Repeat this process for any other fields you want to define.

::: tip Reordering and Editing Fields

- **Reordering**: You can drag and drop fields in the Schema Designer list to change their display order (`order_index`).
- **Editing / Deletion**: Click on any field name in the designer view to modify its validations, toggle search indexes, or permanently delete the field schema from draft status.
:::

### Step 3: Publish changes

Your schema changes are stored as a draft until you publish them.

1. Review your collection layouts and fields.
2. Select the **Publish Schema** button at the bottom of the left collections sidebar.
3. Mincemeat increments your project's active schema version, executes database DDL statements on your edge database, and invalidates global CDN caches.

## What happens next

Once published:

- The REST API matches your new structure.
- You can begin creating content entries by toggling the workspace view to **Entries**, or manage access rules under the **Permissions** tab.
- Your public OpenAPI specification is automatically regenerated at:
  - Custom Subdomain: `https://{project-slug}.cms.mincemeat.app/v1/openapi.json`
  - Path Fallback: `https://cms.mincemeat.app/v1/{project-slug}/openapi.json`

## Related

- [Headless CMS Overview](/headless-cms/index)
- [Creating a CMS Project](/headless-cms/create-project)
- [Content management](/headless-cms/content-management)
- [Query DSL reference](/headless-cms/query-dsl)
