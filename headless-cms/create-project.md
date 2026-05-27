---
title: Creating a CMS Project
description: Learn how to create, configure, and provision Headless CMS projects with isolated databases and edge-based routing.
category: headless-cms
audience: user
updated: 2026-05-27
related:
  - /headless-cms/index
  - /headless-cms/schema-designer
  - /headless-cms/api-keys
---

# Creating a CMS Project

A Headless CMS project is the top-level container for your content, schemas, media library, API credentials, and webhooks. Every project is provisioned with a dedicated, isolated database and served directly at the global edge.

## Before you start

- You must be signed in to your Mincemeat account.
- Prepare a project name (display name) and a unique project slug.
- Know which locales (languages) your content needs to support.

## Create a new project

Follow these steps to create and provision your CMS workspace:

1. Select **Headless CMS** in the main Mincemeat dashboard navigation.
2. Select **+ Add CMS Project** (or **Create Project**).
3. In the creation wizard:
   - **Project Name**: Enter a friendly display name (e.g., `Corporate Blog`). You can change this later.
   - **Project Slug**: Enter a URL-safe lowercase slug (e.g., `corp-blog`). The slug is permanent and is used to resolve your project's REST API endpoints.
   - **Default Locale**: Select the default language for your content (e.g., `en`).
   - **Enabled Locales**: Select any additional languages you plan to translate content into (e.g., `es`, `fr`).
   - **Plan Tier**: Choose a plan (e.g., `Free`, `Starter`, `Pro`, or `Enterprise`) that fits your usage and rate-limiting needs.
4. Select **Create**.

Your project starts in a `provisioning` state. Mincemeat automatically creates your database, writes routing keys, and activates the workspace in a few seconds.

## Behind-the-scenes provisioning

When you click **Create**, the control plane automates the following architecture steps:

1. **Slug Validation**: The system validates the slug format and verifies it is globally unique. It also checks that the slug does not collide with any existing static-site shared subdomains.
2. **Database Provisioning**: An isolated, dedicated database instance is created specifically for your project. This ensures strict multi-tenant data isolation—your content is never stored alongside another project's tables.
3. **Table Bootstrapping**: The system runs database migration scripts to initialize the core tables (`entries`, `relations`, `media`, and `meta`).
4. **Edge Routing Setup**: The system registers routing lookup tags in edge memory. This allows edge workers to resolve incoming API requests to your database instantly based on your project slug or hostname.
5. **Ownership Permissions**: The creator of the project is registered as the database `owner` with full administrative privileges.

## Manage project settings

Once your project is active, select **Open Workspace** on the project card to access settings:

- **General Settings**: Update your project name, add or remove enabled locales, change your default locale, or adjust the soft-delete Trash retention window (from 1 to 365 days).
- **Access & CORS**: Create REST API keys and register allowed frontend domains to bypass CORS blocks in client browsers.
- **Cache Control**: Instantly purge cached edge responses after updating content structure or entry records.

## Project deletion

If you no longer need a project, you can delete it:

::: danger Permanent Data Loss
Deleting a project permanently destroys its isolated database, revokes all API keys, removes all uploaded files from storage, and deletes edge routing keys. This action is irreversible.
:::

1. Open the project workspace and navigate to **Settings -> General Settings**.
2. Scroll to the **Danger Zone**.
3. Select **Delete Project** and confirm the prompt.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Slug is rejected | The slug must be 3-63 characters, lowercase letters, numbers, and hyphens only, and cannot start or end with a hyphen. It may also already be in use. |
| Project stuck in provisioning | If a transient network error occurs during edge infrastructure setup, refresh the page. If the status remains unchanged, contact your system administrator. |

## Related

- [Headless CMS Overview](/headless-cms/index)
- [Schema Designer](/headless-cms/schema-designer)
- [API Keys & Security](/headless-cms/api-keys)
