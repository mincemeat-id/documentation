---
title: Deployment history
description: View your static site deployment history, monitor pipeline status, and understand deployment states.
category: static-sites
audience: user
updated: 2026-05-19
related:
  - /static-sites/upload-deployment
  - /static-sites/github-deployments
  - /static-sites/rollback
---

# Deployment history

Every deployment you make is recorded permanently. The deployment
history shows every version of your site, its status, and when it was
deployed. You can use the history to compare versions, diagnose
failures, and decide which version to roll back to.

## Before you start

- You must be signed in.
- You must have a static site with at least one deployment.

## View deployment history

1. Open the site detail view.
2. Select the **Deployments** tab.
3. Review the list of deployments. Each entry shows:
   - **Version** — an incrementing number starting from 1.
   - **Status** — the current state of the deployment.
   - **Deployed at** — when the deployment was created.
   - **File count** — the number of files in the deployment.
   - **Size** — the total size of the deployed files.
   - **Source** — whether the deployment was uploaded manually or
     deployed from GitHub.

The most recent deployment appears at the top of the list. The active
deployment is highlighted.

## Deployment statuses

Each deployment has a status that tells you where it is in its
lifecycle.

| Status | Meaning |
| --- | --- |
| **Queued** | The deployment is waiting to be processed. |
| **Processing** | Files are being validated, extracted, and uploaded to storage. |
| **Live** | This deployment is the active version that visitors see. Only one deployment can be live at a time. |
| **Superseded** | This deployment was previously live but has been replaced by a newer deployment or a rollback. |
| **Failed** | The deployment could not be completed. An error message explains the cause. |
| **Cancelled** | The deployment pipeline was cancelled before it completed. |

## View deployment details

Select any deployment in the list to see its details:

- **Commit message** — for GitHub deployments, the commit message from
  the deployed commit.
- **Commit SHA** — the Git commit reference (GitHub deployments only).
- **Error message** — if the deployment failed, a description of what
  went wrong.
- **Deploy metadata** — additional context about the deployment
  process.

## Pipeline status (GitHub deployments)

GitHub deployments run through a multi-stage pipeline. You can monitor
each stage in real time.

### View a pipeline

1. Open the site detail view.
2. Select the **Pipelines** tab.
3. Select a pipeline to see its stage-by-stage progress.

### Pipeline stages

| Stage | What happens |
| --- | --- |
| **Prepare** | Mincemeat verifies App access and resolves the commit. |
| **Fetch** | Repository content is downloaded from GitHub. |
| **Validate** | Files are checked for structure, size, and safety. |
| **Upload** | Files are uploaded to storage under an immutable path. |
| **Activate** | The new deployment becomes the active version. |
| **Finalise** | The deployment is marked as successful and the previous version is superseded. |

Each stage shows its start time, duration, and outcome. If a stage
fails, the error message appears alongside it.

### Pipeline statuses

| Status | Meaning |
| --- | --- |
| **Queued** | The pipeline is waiting to start. |
| **Running** | The pipeline is actively processing stages. |
| **Succeeded** | All stages completed successfully and the deployment is live. |
| **Failed** | A stage failed. The deployment was not activated. |
| **Cancelled** | The pipeline was cancelled by a user. |

## Failed deployment troubleshooting

When a deployment fails, check the error message for the specific
cause. Common failures include:

| Error | What to do |
| --- | --- |
| Missing `index.html` | Your site files must include an `index.html` at the root. For GitHub deployments, check that your publish directory is correct. |
| Archive exceeds size limit | Reduce the number or size of files in your deployment. Remove unnecessary assets. |
| File count limit exceeded | Reduce the number of files. Consider combining small files or removing unused assets. |
| Path traversal detected | Your zip archive contains `..` path segments or absolute paths. Rebuild the archive without these paths. |
| Symlinks not allowed | Remove symbolic links from your archive. Include the actual files instead. |
| Repository access lost | The GitHub App may have lost access to your repository. Check your GitHub App installation settings. |
| Validation timeout | The validation stage took too long. This may happen with very large archives. Try deploying a smaller set of files. |

## What happens next

- If a deployment succeeded, visit your site URL to confirm the
  content is live.
- If a deployment failed, fix the issue described in the error message
  and deploy again.
- To switch to a previous version, see
  [Activate and rollback](/static-sites/rollback).

## Related

- [Upload a deployment](/static-sites/upload-deployment)
- [Deploy from GitHub](/static-sites/github-deployments)
- [Activate and rollback](/static-sites/rollback)
