---
title: Deploy from GitHub
description: Connect a GitHub repository to your static site through the Mincemeat GitHub App for automatic deployments on push.
category: static-sites
audience: user
updated: 2026-05-20
related:
  - /static-sites/create-site
  - /static-sites/deployment-history
  - /static-sites/rollback
---

# Deploy from GitHub

Connect a GitHub repository to your static site so Mincemeat deploys your files automatically when you push to your branch.

Mincemeat supports two deployment modes for GitHub sources:

- **Build Engine**: Automatically compiles your site from source code (e.g., Astro, Vite, Hugo, VitePress) on Mincemeat's servers whenever you push.
- **No-Build**: Deploys pre-compiled static files from your repository directly. Useful if you prefer running builds in your own external CI pipeline.

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

Mincemeat queues an initial deployment pipeline. You can follow its progress in the pipeline detail view.

## Build configuration

If your site requires a build, Mincemeat automatically classifies the repository on deployment (for example, if a `package.json` or Hugo configuration file is present).

You can customize how Mincemeat builds your site by selecting the **Build** tab in the site detail view:

- **Root Directory** — The subfolder in your repository containing your site's source code (defaults to the repository root `.`). Must reside within the repository.
- **Framework Override** — Force Mincemeat to use a specific framework's build settings. Supported options include: `Astro`, `Vite`, `Eleventy`, `Docusaurus`, `VitePress`, `VuePress`, `Gatsby`, `Hugo`, `Next.js (static export)`, `Nuxt (static generate)`, `SvelteKit (static)`, `Generic`, or `Auto detect` (default).
  - *Note*: Next.js sites must be configured for static export (`output: 'export'`), and Nuxt sites must be configured for static generation.
- **Build Command** — The command Mincemeat runs to build your site (e.g. `npm run build`).
- **Output Directory** — The folder containing your compiled static assets (e.g. `dist`, `build`, `.vitepress/dist`).
- **Node Version** — The Node.js version used for the compilation (defaults to Node `22`).
- **Build Cache** — Toggle dependency caching (such as `node_modules`). Caching is enabled by default to speed up subsequent builds.

### Clear build cache

If your build dependencies become corrupted or you want a completely fresh run, you can select the **Reset cache** button in the **Build** settings tab. This invalidates and removes the build cache across all online build engines.

## Environment variables and secrets

If your build process depends on environment variables (such as API keys or build-time configurations), you can define them in the **Environment** tab:

- **Key Formatting** — Secret keys must consist of uppercase letters, numbers, and underscores only, matching the pattern `[A-Z_][A-Z0-9_]{0,127}`.
- **Reserved Prefixes** — To prevent platform conflicts, keys cannot start with: `MINCEMEAT_`, `BUILD_ENGINE_`, `GITHUB_`, `AWS_`, `S3_`, `CF_`, or `CLOUDFLARE_`.
- **Size Limits** — Individual secrets are capped at 16 KiB, and the total environment payload for a single build cannot exceed 128 KiB.
- **Write-Only Security** — Environment variables are stored encrypted with AES-256-GCM. Once saved, they are write-only and cannot be read back through the dashboard or API. You can overwrite or delete them at any time.

## Pipeline stages

Each GitHub deployment runs through a series of stages:

| Stage | What happens |
| --- | --- |
| **Prepare** | Mincemeat verifies App access to the repository and resolves the commit. |
| **Fetch** | The repository content is downloaded from GitHub. |
| **Validate** | The project structure is validated. Mincemeat detects if a build is required, verifies paths, and checks files against platform safety limits. |
| **Build** | If a build is required or configured, Mincemeat dispatches the job to a build engine. This stage streams compilation logs in real time, and is skipped for no-build deployments. |
| **Upload** | Built or extracted files are validated and uploaded to immutable storage. |
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
| Pipeline fails in Validate | The publish directory may not contain `index.html`, the archive exceeds size/file limits, or the project contains invalid configuration files (e.g. malformed `package.json`). |
| Pipeline fails in Build with `NO_ENGINE_AVAILABLE` | No build engine agents are currently online. Contact your administrator or try deploying again later. |
| Pipeline fails in Build with `NO_ENGINE_AVAILABLE_TIMEOUT` | Build engines are saturated. The job waited in the queue for more than 30 minutes. |
| Pipeline fails in Build with a command error | The build command failed (exited with non-zero status). Select the stage to view the compilation logs and troubleshoot the syntax or configuration error. |
| Next.js build fails | Verify your Next.js site configuration is set for static export (`output: 'export'`). Server-side rendered pages are not supported. |
| Nuxt build fails | Verify your Nuxt configuration is set for static generation, and the build script runs `nuxt generate`. |
| Automatic deployments are not triggering | Confirm **Auto deploy** is enabled and you are pushing to the configured branch. Check the pipeline list for any recent cancelled or failed pipelines. |
| Connection shows as broken | Restore the GitHub App installation and repository access, then redeploy. See [Broken connections](#broken-connections) above. |

## Related

- [Create a site](/static-sites/create-site)
- [Deployment history](/static-sites/deployment-history)
- [Activate and rollback](/static-sites/rollback)
