---
title: Upload a deployment
description: Deploy a static site by uploading a single HTML file or a zip archive containing your site files.
category: static-sites
audience: user
updated: 2026-05-18
related:
  - /static-sites/create-site
  - /static-sites/deployment-history
  - /static-sites/rollback
---

# Upload a deployment

Upload your site files directly to create a new deployment. You can
upload a single HTML file for simple pages or a zip archive for a
complete site with assets.

## Before you start

- You must be signed in.
- You must have an existing static site. If you have not created one
  yet, see [Create a site](/static-sites/create-site).
- Your files must be pre-built. Mincemeat does not run build commands
  — upload the final output from your build tool.

## Upload a single HTML file

Use this option for simple, single-page sites.

1. Open the site detail view.
2. Select **Deploy**.
3. Select or drag a single `.html` file into the upload area.
4. Select **Upload and deploy**.
5. The deployment starts processing. When it finishes, the new
   deployment becomes the active version automatically.

## Upload a zip archive

Use this option for sites with multiple files (HTML, CSS, JavaScript,
images, and other assets).

1. Open the site detail view.
2. Select **Deploy**.
3. Select or drag a `.zip` file into the upload area.
4. Select **Upload and deploy**.
5. The deployment starts processing. Mincemeat extracts the archive,
   validates the contents, and uploads the files.

### Zip archive requirements

Your zip archive must follow these rules:

| Requirement | Detail |
| --- | --- |
| `index.html` at the root | The archive must contain an `index.html` file at the top level of the zip or at the top level of a single root folder. |
| No path traversal | File paths must not contain `..` segments or absolute paths. |
| No symlinks | Symbolic links inside the archive are rejected. |
| No executable files | Server-side scripts and executable files are blocked. |
| Size limits | The archive and extracted contents must be within the platform size limits. |
| File count limits | The total number of files must be within the platform file count limit. |

If your archive fails validation, the deployment is marked as failed
with an error message explaining the issue.

## What happens during upload

1. **Upload** — your file is uploaded to secure storage.
2. **Validation** — the archive is checked for structure, size, and
   safety (zip archives only).
3. **Extraction** — files are extracted and stored under an immutable
   deployment path (zip archives only).
4. **Activation** — the new deployment becomes the active version and
   your site starts serving the new content.

The previous active deployment is marked as **Superseded** but remains
available for [rollback](/static-sites/rollback).

## What happens next

After a successful deployment:

- Visit your site URL to confirm the content is live.
- Check [Deployment history](/static-sites/deployment-history) to see
  all your deployments.
- If something is wrong, [roll back](/static-sites/rollback) to the
  previous version instantly.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Upload fails immediately | Check the file type — only `.html` and `.zip` files are accepted. |
| Deployment fails with a validation error | Read the error message. Common causes: missing `index.html`, path traversal in zip, file too large, or too many files. |
| Site shows old content after deployment | Clear your browser cache or open the site in a private window. HTML pages are served with revalidation headers, but your browser may have a stale cached copy. |
| Deployment is stuck in processing | Wait a few minutes. Large archives take longer to extract and upload. If it does not complete, check the deployment detail for error messages. |

## Related

- [Create a site](/static-sites/create-site)
- [Deployment history](/static-sites/deployment-history)
- [Activate and rollback](/static-sites/rollback)
