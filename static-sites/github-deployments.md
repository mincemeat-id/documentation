---
title: Deploy from GitHub
description: Connect a GitHub repository to your static site through the Mincemeat GitHub App for automatic deployments on push.
category: static-sites
audience: user
updated: 2026-05-18
related:
  - /static-sites/create-site
  - /static-sites/deployment-history
  - /static-sites/rollback
---

# Deploy from GitHub

Connect a GitHub repository to your static site so Mincemeat deploys
your files automatically when you push to your production branch.
Mincemeat uses a **no-build** model — the files in your repository
are treated as ready-to-serve static content. If your project uses a
build tool, run the build in your own CI pipeline and commit or push
the output.

## Before you start

- You must be signed in.
- You must have a static site. See [Create a site](/static-sites/create-site).
- You need a GitHub account with access to the repository you want to
  connect.
- The repository must contain an `index.html` file in the publish
  directory you choose.

## Step 1: Connect your GitHub account

Before you can select a repository, connect your GitHub identity to
Mincemeat.

1. Open your user menu and go to **Integrations → GitHub**.
2. Select **Connect GitHub**.
3. GitHub opens an authorization page. Review the permissions and
   select **Authorize**.
4. You are redirected back to Mincemeat. The integrations page shows
   your connected GitHub account.

You only need to do this once. Your GitHub connection persists across
sessions.

## Step 2: Install the Mincemeat GitHub App

The GitHub App gives Mincemeat read access to the repositories you
choose. It does not have access to any repository until you
explicitly grant it.

1. On the integrations page, select **Install GitHub App**.
2. GitHub opens the App installation page. Choose whether to install
   on your personal account or an organization.
3. Select **All repositories** or **Only select repositories** and
   pick the ones you want to use with Mincemeat.
4. Select **Install**.
5. You are redirected back to Mincemeat. The integrations page shows
   the installation.

::: tip Permissions
The Mincemeat GitHub App requests **Contents: Read-only** access.
It reads your repository files to deploy them. It does not modify
your code, create branches, or open pull requests.
:::

## Step 3: Connect a repository to your site

1. Open the site detail view.
2. Select **Connect GitHub** (or open the **Source** section).
3. Choose the GitHub account or organisation where the App is
   installed.
4. Select a repository from the list. Only repositories visible to
   both your GitHub account and the App installation are shown.
5. Choose a **Branch** — this is the production branch that triggers
   automatic deployments. Defaults to the repository's default branch.
6. Set the **Publish directory** — the folder within the repository
   that contains your site files. Use `/` for the repository root, or
   a path like `dist` or `public` if your built output is in a
   subfolder.
7. Choose whether to enable **Auto deploy**. When enabled, pushing to
   the selected branch triggers a deployment automatically.
8. Select **Connect**.

Mincemeat queues an initial deployment pipeline. You can follow its
progress in the pipeline detail view.

## Pipeline stages

Each GitHub deployment runs through a series of stages:

| Stage | What happens |
| --- | --- |
| **Prepare** | Mincemeat verifies App access to the repository and resolves the commit. |
| **Fetch** | The repository content is downloaded from GitHub. |
| **Validate** | The archive is checked for structure, size, and safety — the same rules as zip uploads. The publish directory must contain `index.html`. |
| **Upload** | Files from the publish directory are uploaded to storage under an immutable deployment path. |
| **Activate** | The new deployment becomes active and your site starts serving the new content. |
| **Finalise** | The deployment is marked as successful and the previous active deployment is superseded. |

You can watch the pipeline progress in real time on the pipeline
detail page.

## Automatic deployments

When **Auto deploy** is enabled and you push to the configured branch,
Mincemeat receives a webhook from GitHub and starts a new deployment
pipeline automatically. The pipeline uses the latest commit on the
branch.

If multiple pushes arrive in quick succession, Mincemeat coalesces
them so only the latest commit is deployed.

## Manual redeployment

You can trigger a deployment manually at any time:

1. Open the site detail view.
2. Select **Redeploy** (or **Deploy from HEAD**).
3. Mincemeat resolves the current HEAD of your configured branch and
   starts a new pipeline.

This is useful when you want to deploy without pushing a new commit,
or when auto-deploy is disabled.

## Cancel a pipeline

You can cancel a pipeline that is queued or in progress:

1. Open the pipeline detail view.
2. Select **Cancel**.
3. The pipeline stops at the next stage boundary. Remaining stages
   are skipped and the pipeline is marked as **Cancelled**.

Cancelling does not affect the current active deployment.

## Update source settings

After connecting, you can change the branch, publish directory, or
auto-deploy setting:

1. Open the site detail view.
2. Open the **Source** section.
3. Update the settings you want to change.
4. Save. Changes take effect on the next deployment.

## Disconnect GitHub

To remove the GitHub source from your site:

1. Open the site detail view.
2. Open the **Source** section.
3. Select **Disconnect**.

Disconnecting does not delete your existing deployments. Your current
active deployment continues serving. You can reconnect later or
switch to upload-based deployments.

## Broken connections

A GitHub connection can become **broken** if:

- The Mincemeat GitHub App is uninstalled from the repository's
  account or organisation.
- Repository access is revoked in the App's installation settings.
- The repository is deleted or made inaccessible.

When a connection is broken, the site shows a **Reconnect** prompt.
Automatic deployments stop until you restore access.

### Restore a broken connection

1. Open the site detail view. You will see a broken-connection warning.
2. Go to **Integrations → GitHub**.
3. Select **Install GitHub App** or **Configure** to update the
   installation and restore access to the repository.
4. Return to the site and select **Redeploy** to confirm the
   connection is restored.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| GitHub account or organisation is not shown during install | Make sure you have permission to install Apps on that account. Organisation owners or members with App manager rights can install Apps. |
| Repository is missing from the picker | Check that the repository is included in the App installation. Go to GitHub → Settings → Applications → Mincemeat and confirm repository access. |
| Pipeline fails in Prepare | The App may have lost access to the repository. Check the App installation and restore repository access. |
| Pipeline fails in Validate | The publish directory may not contain `index.html`, or the archive exceeds size or file count limits. |
| Automatic deployments are not triggering | Confirm **Auto deploy** is enabled and you are pushing to the configured branch. Check the pipeline list for any recent cancelled or failed pipelines. |
| Connection shows as broken | Restore the GitHub App installation and repository access, then redeploy. See [Broken connections](#broken-connections) above. |

## Related

- [Create a site](/static-sites/create-site)
- [Deployment history](/static-sites/deployment-history)
- [Activate and rollback](/static-sites/rollback)
