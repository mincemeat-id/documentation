---
title: Content Management
description: Manage collection entries, publish drafts, and use the soft-delete Trash retention system.
category: headless-cms
audience: user
updated: 2026-05-26
related:
  - /headless-cms/index
  - /headless-cms/schema-designer
  - /headless-cms/query-dsl
---

# Content Management

Content Management is where you create, edit, and publish the actual data records in your collections. Mincemeat handles content state changes safely using draft controls and a soft-delete retention system.

## Entry states and lifecycle

Every content entry moves through a defined set of states:

```text
+-----------+    publish    +---------------+
|   Draft   | ------------> |   Published   |
+-----+-----+               +-------+-------+
      |                             |
      | delete                      | delete
      +--------------> +------------v----+
                       |     Trashed     |
                       +--------+--------+
                                |
                                | 30-day purge
                                v
                       +-----------------+
                       | Permanently Lost|
                       +-----------------+
```

- **Draft**: Newly created or edited entries start as drafts. Drafts are stored in the project's SQLite database but are excluded from API requests that require only public-read scope.
- **Published**: Publishing transitions the entry to a live state, making it queryable by public-read API keys.
- **Trashed (Soft-Deleted)**: Deleting an entry moves it to the Trash view. It is immediately removed from all regular API listings.

## Before you start

- You must have published a collection schema.
- You must have the necessary access permissions (Editor or Administrator role) to add or modify content.

## Steps: Create and publish an entry

1. Open the **Headless CMS** Hub from the main sidebar.
2. Select **Open Workspace** on your project. You will land on the **Collections** tab.
3. Select your target collection from the left sidebar.
4. Ensure that the view toggle in the top-right corner of the workspace pane is set to **Entries**.
5. Select **+ New Entry**.
6. Fill in the values for each field defined in your schema. Any validation rules (e.g., character length limits or required fields) are checked as you type. If field translations are enabled, you can switch locales using the translation inputs.
7. Select **Save Draft**. The entry is saved with a status of `draft`.
8. To make the content live, click **Publish** on the entry card.

::: tip Bulk Actions
You can publish or delete multiple entries simultaneously by selecting the checkboxes next to the entries and clicking **Publish** or **Delete** in the floating bulk actions bar.
:::

::: tip Editing Published Entries
Editing a published entry updates the record. If you want to make changes but keep the current published content active, copy the values or save updates as a separate draft entry depending on your team's workflow.
:::

## Soft-delete (Trash) behavior

Mincemeat protects your content from accidental deletion using a soft-delete mechanism:

- **Soft-Deletion**: When you select **Delete** on an entry, the platform sets a `deleted_at` timestamp and marks its status as `trashed`.
- **Trash Bin**: Trashed items are visible only in the Trash Bin tab under settings. To access it, navigate to the **Settings** workspace tab and choose **Trash Bin** from the left navigation menu.
- **Restoring**: You can click **Restore** on any trashed entry in the Trash Bin to return it to a `draft` status in its original collection.
- **Permanent Purges**: If you click **Purge** in the Trash Bin, the record is hard-deleted from the database and any linked media variant files are removed during the next asset cleanup run.

### Nightly retention policy

Mincemeat runs a scheduled cleanup task every night:

- By default, trashed entries are permanently deleted after **30 days**.
- Project administrators can adjust this retention window under **Settings -> General Settings** (Trash Purge Delay field) to any duration between **1 day** and **365 days**.
- Once the retention window passes, the entries are permanently purged from the database and cannot be recovered.

## Related

- [Schema Designer](/headless-cms/schema-designer)
- [Query DSL reference](/headless-cms/query-dsl)
