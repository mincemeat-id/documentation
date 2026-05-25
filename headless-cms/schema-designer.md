---
title: Schema Designer
description: Create CMS projects, configure collections, define field types, and publish database schemas.
category: headless-cms
audience: user
updated: 2026-05-25
related:
  - /headless-cms/index
  - /headless-cms/content-management
  - /headless-cms/query-dsl
---

# Schema Designer

The Schema Designer allows you to model your content structure visually. In Mincemeat, you define collections (like *Posts* or *Products*) and add specific fields to them.

Once your design is complete, publishing the schema creates and updates the underlying tables in your dedicated edge database.

## Before you start

- You must be signed in to your Mincemeat account.
- You must have a CMS project. If you do not have one, click **Add CMS Project** in the Headless CMS Hub and follow the wizard to name and configure the project.

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
- **Filterable/Sortable fields**: If you toggle **Filterable** (`is_filterable: true`) on a field, Mincemeat generates a SQLite expression index for it during publishing:

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
2. Click **Open Workspace** on your project, go to the **Schema** tab, and select **New Collection**.
3. Enter a **Name** (e.g., `Blog Posts`) and a **Slug** (e.g., `posts`). The slug will be used in your REST API endpoints.
4. Select **Create**.

### Step 2: Add fields

1. In the **Schema** tab, select your new collection from the collection list.
2. Select **Add Field**.
3. Enter a field name, slug, and choose the **Field Type**.
4. In the settings panel:
   - Configure any validation rules (such as marking the field as required).
   - Toggle **Filterable** if you plan to search or sort by this field.
5. Select **Save Field**.
6. Repeat for any other fields you want to define.

### Step 3: Publish changes

Your changes are stored as a draft until you publish them.

1. Review your collection layout in the designer.
2. Select **Publish Schema** in the top-right corner.
3. Mincemeat increments your project's active schema version, runs the DDL migrations on D1 SQLite, and clears the edge caches.

## What happens next

Once published:

- The REST API matches your new structure.
- You can begin creating content entries in the **Content** tab.
- Your public OpenAPI specification is automatically regenerated at `https://{project}.cms.mincemeat.app/v1/{project}/openapi.json`.

## Related

- [Headless CMS Overview](/headless-cms/index)
- [Content management](/headless-cms/content-management)
- [Query DSL reference](/headless-cms/query-dsl)
