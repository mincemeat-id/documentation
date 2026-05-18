---
title: Security and privacy
description: Sensitive-data rules, screenshot policy, and how to report security issues in this public documentation repository.
category: contributing
audience: contributor
updated: 2026-05-18
related:
  - /contributing/style-guide
  - /contributing/pull-request-checklist
---

# Security and privacy

This repository is **public**. Every commit and every published page is
visible to anyone on the internet. The rules on this page exist to keep
real Mincemeat users, customers, and operators safe.

## What never goes in this repository

The following content is never acceptable, even as an example, even in
a draft, even in a code block:

- Production or staging credentials, API tokens, JWTs, refresh tokens,
  session cookies, OAuth client secrets, or access keys.
- Real customer account identifiers, email addresses, organization
  names, project names, site names, or deployment IDs.
- Real customer domain names or DNS records.
- Private hostnames, internal IP addresses, or non-public service URLs.
- Provider account IDs, organization IDs, zone IDs, or other
  operator-only identifiers.
- Stack traces, logs, or error messages that contain any of the items
  above.
- Internal-only runbook content, incident details, or operations
  tooling instructions.
- Private repository names, internal Git remotes, or links into
  private GitHub repositories.
- Localhost or LAN URLs outside the approved DNS examples.

If you are not sure whether something counts as sensitive, treat it as
sensitive. Ask a maintainer in the pull request before merging.

## Safe example data

Use these example values in commands, code blocks, screenshots, and
DNS records:

| Type | Use |
| --- | --- |
| Domains | `example.com`, `example.org`, `example.net` |
| Subdomains | `app.example.com`, `docs.example.com` |
| IPv4 ranges | `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` |
| IPv6 prefix | `2001:db8::/32` |
| Email addresses | `alex@example.com`, `support@example.com` |
| Account / deployment IDs | Made-up values clearly marked as examples (`acct_demo_0001`, `dep_demo_001`) |
| Tokens, keys | `<your-token>`, `REPLACE_ME`, never realistic strings |

## Screenshot policy

- Capture screenshots from a **seeded demo account** only. Never use
  real customer data, even briefly, even with intent to redact later.
- Blur or replace any visible identifiers: real names, email addresses,
  domain names, deployment IDs, IP addresses, account IDs.
- Crop to the smallest useful region. Avoid full-window screenshots
  when a panel will do.
- Store screenshots under `public/screenshots/<section>/` with
  descriptive lowercase filenames.
- Wrap screenshots in `<ScreenshotFrame>` so they get the standard
  border and caption treatment.
- Always provide alt text that describes the action shown, not the
  visual.
- Regenerate the screenshot when the matching UI label or layout
  changes.

## Automated guardrails

The CI runs these checks on every pull request:

| Check | What it blocks |
| --- | --- |
| `npm run lint:links` | Localhost URLs, private/internal hostnames, links to unapproved `mincemeat-id` repositories, unresolved `TODO link` markers. |
| `npm run scan:secrets` | Strings that look like API tokens, JWTs, AWS-style keys, or other high-entropy secrets. |
| Gitleaks action | A second, independent secret scan. |
| `npm run lint:markdown` | Prose and formatting issues, including a small set of safety-related rules. |
| `npm run lint:frontmatter` | Missing or invalid metadata that would leak internal categories. |

These are backstops, not substitutes for review. The reviewer is still
responsible for catching anything the scanners miss.

## Reporting a vulnerability

Do **not** open a public GitHub issue, pull request, or discussion that
includes vulnerability details. Use one of the private channels in
[SECURITY.md](https://github.com/mincemeat-id/documentation/blob/main/SECURITY.md)
instead.

## Reporting sensitive content already in this repository

If you find sensitive data in a published page, a screenshot, a code
sample, or the Git history of this repository, report it through the
same private channels in
[SECURITY.md](https://github.com/mincemeat-id/documentation/blob/main/SECURITY.md).
We will remove the content and, if needed, rewrite history.

## Licensing reminder

By contributing, you agree that:

- Your prose, tables, diagrams, and other documentation content are
  licensed under
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Your code, theme, scripts, and build configuration changes are
  licensed under [MIT](https://opensource.org/licenses/MIT).

If your contribution includes material you did not author, make sure
the original license is compatible and credit the original author in
the pull request description.

## Related

- [Pull request checklist](/contributing/pull-request-checklist)
- [Style guide](/contributing/style-guide)
- [Local development](/contributing/local-development)
