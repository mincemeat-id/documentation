---
title: Activate and rollback
description: Switch the active deployment on your static site to any previous version for instant rollbacks.
category: static-sites
audience: user
updated: 2026-05-19
related:
  - /static-sites/deployment-history
  - /static-sites/upload-deployment
  - /static-sites/github-deployments
---

# Activate and rollback

Every deployment on your static site is stored permanently. You can
switch the active deployment to any previous version at any time.
The switch is instant — no files are re-uploaded or rebuilt.

## Before you start

- You must be signed in.
- You must own the site.
- The site must have at least two deployments (the current active
  version and the version you want to roll back to).

## How activation works

Your static site always has one **active deployment** — the version
visitors see when they open your site URL. When you activate a
different deployment, Mincemeat updates the active pointer. The
previous active deployment is marked as **Superseded**.

Because deployments are immutable snapshots stored under unique paths,
switching between them does not copy or modify any files. This is why
rollbacks are instant.

## Roll back to a previous deployment

1. Open the site detail view.
2. Select the **Deployments** tab.
3. Find the deployment you want to restore. You can identify it by
   version number, timestamp, or commit message (for GitHub
   deployments).
4. Select **Activate** (or **Rollback**) on the deployment row.
5. Confirm the action.

The selected deployment becomes the active version immediately. Your
site starts serving that version's files.

## Promote a deployment

Promoting works the same way as rolling back — you select a
deployment and make it active. The term **promote** is used when you
are activating a newer deployment that was not automatically
activated, such as when you upload a deployment without auto-activation.

1. Open the site detail view.
2. Select the **Deployments** tab.
3. Find the deployment you want to promote.
4. Select **Activate** on the deployment row.
5. Confirm the action.

## What happens after activation

| What changes | Detail |
| --- | --- |
| Active deployment pointer | Updated to the selected deployment. |
| Previously active deployment | Marked as **Superseded**. It remains in the history and can be activated again at any time. |
| Visitor experience | The next page load serves the newly active version. HTML pages use revalidation headers, so visitors see the change quickly. |
| Fingerprinted assets | Assets with content hashes in their filenames (for example, `app.a1b2c3.js`) are cached aggressively. Old asset URLs continue to work because the old deployment files are never deleted. |

## Cache behaviour after rollback

Mincemeat uses different cache strategies for different file types to
make rollbacks safe:

| File type | Cache behaviour |
| --- | --- |
| HTML pages | Always revalidated (`must-revalidate`). Visitors see the new version on the next page load. |
| Fingerprinted assets | Cached for one year. Because the filename includes a content hash, each deployment version uses unique asset URLs — there is no conflict. |
| Non-fingerprinted assets | Cached for a short period. If you use the same filename for different content across deployments, visitors may see the cached version for up to an hour. |

::: tip Use fingerprinted assets
If your build tool supports asset fingerprinting (Vite, Webpack,
Parcel, and most modern bundlers do), enable it. Fingerprinted assets
make rollbacks completely seamless because each deployment version
uses unique filenames.
:::

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Activate button is not visible | Make sure you own the site. Only site owners and administrators can change the active deployment. |
| Site still shows old content after rollback | Clear your browser cache or open the site in a private window. HTML pages revalidate immediately, but your browser may have a stale cached copy. |
| The deployment I want to roll back to shows **Failed** | You can only activate deployments that completed successfully. Failed deployments did not upload all files and cannot be activated. |
| Rollback seems slow | Activation itself is instant, but DNS and CDN caches may add a short delay. Wait a few seconds and try again. |

## Related

- [Deployment history](/static-sites/deployment-history)
- [Upload a deployment](/static-sites/upload-deployment)
- [Deploy from GitHub](/static-sites/github-deployments)
