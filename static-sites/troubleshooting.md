---
title: Static Sites troubleshooting
description: Diagnose and resolve common static site problems including deployments, domains, SPA fallback, and serving issues.
category: static-sites
audience: user
updated: 2026-05-20
related:
  - /static-sites/
  - /troubleshooting/correlation-ids
  - /troubleshooting/contact-support
---

# Static Sites troubleshooting

Use this page to diagnose common problems with your static sites.
Each section covers a category of issues with practical steps to
resolve them.

## Site creation problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Slug is rejected | The slug does not meet the slug rules, is already taken, or is a reserved word. | Check the [slug rules](/static-sites/create-site#slug-rules). Try a different slug. |
| Create button is disabled | Required fields are not filled in. | Make sure both name and slug are provided and the slug passes validation. |

## Upload deployment problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Upload fails immediately | Wrong file type. | Only `.html` and `.zip` files are accepted. |
| Deployment fails with validation error | Archive structure issue. | Read the error message. Common causes: missing `index.html`, path traversal, file too large, too many files, symlinks, or executable files. |
| Site shows old content after deployment | Browser cache. | Clear your browser cache or open the site in a private window. |
| Deployment stuck in processing | Large archive taking time to extract. | Wait a few minutes. If it does not complete, check the deployment detail for errors. |

## GitHub deployment problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| GitHub account not shown during install | Insufficient permissions. | You need permission to install Apps on that account. Organisation owners or members with App manager rights can install Apps. |
| Repository missing from picker | Not included in App installation. | Go to GitHub → Settings → Applications → Mincemeat and confirm repository access. |
| Pipeline fails in Prepare | Lost repository access. | Check the App installation and restore repository access. |
| Pipeline fails in Validate | Missing `index.html`, path limits exceeded, or malformed config. | Verify your publish directory contains `index.html` and configuration files (like `package.json`) are valid. |
| Auto-deploy not triggering | Auto-deploy disabled or wrong branch. | Confirm **Auto deploy** is enabled and you are pushing to the configured branch. |
| Connection shows as broken | App uninstalled or access revoked. | Restore the GitHub App installation, then redeploy. |

## Build Engine and compilation problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Pipeline fails in Validate with `BUILD_ROOT_MISSING` | Configure root directory does not exist. | Verify the **Root Directory** path in your Build tab settings matches your repository structure. |
| Pipeline fails in Validate with `PACKAGE_JSON_INVALID` | The `package.json` file is malformed. | Check the JSON syntax of your `package.json` file in your repository. |
| Pipeline fails in Validate with `NEXTJS_REQUIRES_EXPORT` | Next.js is configured for dynamic SSR. | Update your `next.config.js` or `next.config.mjs` to set `output: 'export'`. SSR is not supported. |
| Pipeline fails in Validate with `NUXT_REQUIRES_GENERATE` | Nuxt is not using static generation. | Ensure your Nuxt build script or build command uses `nuxt generate`. |
| Pipeline fails in Build with `NO_ENGINE_AVAILABLE` | No build engine agents are online. | Contact your administrator to ensure build engine agents are running and healthy. |
| Pipeline fails in Build with `NO_ENGINE_AVAILABLE_TIMEOUT` | Saturated queue timed out. | The build sat in the queue for 30 minutes. Retry the deployment or contact your administrator to check capacity. |
| Pipeline fails in Build with command error | The build command exited with a non-zero code. | Select the Build stage to inspect the live compilation logs. Fix the compiler/syntax errors in your code and push again. |
| Build fails due to missing API keys | Missing environment variables. | Define the missing variables as write-only keys in the **Environment** tab, then redeploy. |
| Secret variable is rejected on save | Invalid key format or reserved prefix. | Ensure keys match `[A-Z_][A-Z0-9_]{0,127}` and do not start with reserved prefixes like `MINCEMEAT_`, `GITHUB_`, `AWS_`, or `S3_`. |

## Domain problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Domain stuck on **Pending CNAME** | DNS not propagated. | Verify the record at your provider. Allow up to 30 minutes. |
| Domain shows **CNAME Failed** | DNS validation timed out. | Check the record exists and is correct, then select **Retry**. |
| Domain shows **Error** | Provisioning error. | Note the error message. Select **Retry** or contact support. |
| Custom domain loads wrong content | Domain attached to wrong site. | Check the Domains tab to confirm the domain is on the correct site. |
| SSL certificate warning | Certificate still provisioning. | Wait a few minutes. If status shows **SSL Active** and warning persists, clear browser cache. |
| Apex domain not resolving | DNS provider may not support CNAME flattening. | Check the [apex domain guide](/static-sites/custom-domains#connect-an-apex-domain) for alternatives. |

## SPA and routing problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Deep links return 404 | SPA mode is not enabled. | Enable SPA mode in site settings. |
| All pages show `index.html` content | SPA mode is enabled on a multi-page site. | Disable SPA mode if your site has individual HTML files for each page. |
| Custom 404 page not showing | SPA mode is overriding the 404 or path is wrong. | Disable SPA mode, or check that the custom 404 path matches a file in your deployment. |
| Redirect not working | Source path mismatch. | Check that the source path matches exactly. Redirects are case-sensitive. |
| Redirect loop | Circular redirect configuration. | Make sure the destination does not redirect back to the source. |

## Serving problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Site returns "Site not found" | Wrong URL or slug. | Check the site detail view for the exact URL. |
| Site returns "No active deployment" | No deployment has been activated. | Upload files or deploy from GitHub. |
| Stale content after rollback | Browser or CDN cache. | Clear browser cache. HTML pages revalidate immediately, but previously cached responses may linger briefly. |
| Custom headers not appearing | Header is on the blocked list. | Check that the header name is not platform-managed. Inspect response headers in browser developer tools. |
| Slow site load | Large file sizes or many assets. | Optimise images, minify CSS and JavaScript, and use asset fingerprinting for efficient caching. |

## Before contacting support

When you need help beyond what this page covers:

1. Note the **correlation ID** from any error message. This unique
   reference helps support locate the exact issue.
2. Note the **site name** and **slug**.
3. Note the **deployment version** or **pipeline ID** if relevant.
4. Note the **domain name** if the problem is domain-related.
5. Note the **time** the problem occurred.
6. Describe what you were trying to do and what happened instead.

See [Correlation IDs](/troubleshooting/correlation-ids) for more on
finding and using correlation IDs.

## Related

- [Static Sites overview](/static-sites/)
- [Correlation IDs](/troubleshooting/correlation-ids)
- [Contact support](/troubleshooting/contact-support)
