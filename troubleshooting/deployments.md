---
title: Deployment troubleshooting
description: Diagnose and fix common issues with static site deployments, GitHub connections, and upload failures.
category: troubleshooting
audience: user
updated: 2026-05-19
related:
  - /static-sites/upload-deployment
  - /static-sites/github-deployments
  - /static-sites/deployment-history
  - /troubleshooting/
---

# Deployment troubleshooting

Diagnose and fix common issues when deploying to static sites through
file uploads or GitHub connections.

## Upload deployment issues

### Upload fails

**Problem**: Your file upload is rejected or fails during processing.

**What to check**:

1. File size limits: Single HTML files and zip archives must be within
   the size limit shown in the interface.
2. File format: Upload a single `.html` file or a `.zip` archive. Other
   formats are not accepted.
3. Zip structure: If uploading a zip, ensure files are at the root or
   in a clear directory structure. Avoid deeply nested archives.

**Fix**: Reduce file size, convert to a supported format, or restructure
your zip archive and try again.

### Upload succeeds but site shows old content

**Problem**: You uploaded a new deployment but visitors still see the
previous version.

**What to check**:

1. Whether the new deployment was activated. Uploads create a new
   deployment but do not always activate it automatically.
2. Browser cache: Your browser may be serving a cached version.

**Fix**:

1. Go to **Deployment History** and activate the new deployment.
2. Clear your browser cache or try an incognito window.

## GitHub deployment issues

### GitHub connection fails

**Problem**: You cannot connect a GitHub repository to your static site.

**What to check**:

1. The Mincemeat GitHub App is installed on the repository.
2. You have permission to access the repository.
3. The repository is public or the GitHub App has been granted access
   to private repositories.

**Fix**:

1. Install or reconfigure the Mincemeat GitHub App at
   `github.com/settings/installations`.
2. Grant access to the specific repository you want to deploy.
3. Return to Mincemeat and retry the connection.

### Deployment does not trigger

**Problem**: You pushed changes to GitHub but no deployment started.

**What to check**:

1. You pushed to the correct production branch configured in Mincemeat.
2. The GitHub App webhook is configured and active.
3. There are no errors in the GitHub App installation.

**Fix**:

1. Verify the branch name matches your Mincemeat configuration.
2. Push a new commit to trigger a deployment.
3. Check the GitHub App settings for any error messages.

### Deployment fails

**Problem**: A GitHub deployment starts but fails during processing.

**What to check**:

1. The repository contains build-ready static files. Mincemeat does not
   run a build step.
2. The root directory setting points to the correct folder if your
   static files are in a subdirectory.
3. There are no large files exceeding size limits.

**Fix**:

1. Build your site locally or in your own CI pipeline before pushing.
2. Update the root directory setting in Mincemeat if your files are in
   a subfolder like `dist/` or `build/`.
3. Remove or reduce oversized files.

## Deployment history issues

### Deployment not visible in history

**Problem**: You completed a deployment but it does not appear in the
deployment history.

**What to check**:

1. You are viewing the correct static site.
2. The deployment completed successfully (check for error messages).
3. There is a delay in the history updating.

**Fix**: Refresh the page. If the deployment still does not appear
after a few minutes, check for error messages during the deployment
process and try again.

### Cannot activate or rollback

**Problem**: You cannot activate a previous deployment or roll back to
an older version.

**What to check**:

1. The deployment exists in the history.
2. The deployment is not already active.
3. You have permission to manage the site.

**Fix**: Select the deployment you want to activate and choose
**Activate**. If the button is disabled, check your permissions or
contact your site administrator.

## Related

- [Upload a deployment](/static-sites/upload-deployment)
- [Deploy from GitHub](/static-sites/github-deployments)
- [Deployment history](/static-sites/deployment-history)
- [Troubleshooting overview](/troubleshooting/)
