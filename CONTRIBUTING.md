# Contributing to Mincemeat Documentation

Thank you for helping improve the Mincemeat user documentation. This
repository is the source for the public site at
<https://docs.mincemeat.id>. It is **public** - every commit and every
published page is visible to anyone on the internet.

The full, browsable version of this guide lives on the docs site itself:

- [Contribute overview](https://docs.mincemeat.id/contributing/)
- [Style guide](https://docs.mincemeat.id/contributing/style-guide)
- [Content model](https://docs.mincemeat.id/contributing/content-model)
- [Local development](https://docs.mincemeat.id/contributing/local-development)
- [Pull request checklist](https://docs.mincemeat.id/contributing/pull-request-checklist)
- [Security and privacy](https://docs.mincemeat.id/contributing/security-and-privacy)

This file is a fast reference for first-time contributors.

## Quick start

```bash
# Use Node 24 (matches .nvmrc)
nvm use

# Install
npm ci

# Start the dev server at http://localhost:5173
npm run dev
```

## Before you submit

Run these checks locally. CI runs the same ones and will block the
merge if any of them fail.

```bash
npm run typecheck
npm run build
npm run lint:links
npm run scan:secrets
npm run lint:frontmatter
npm run lint:markdown
```

## What changes are welcome

- Fixing typos, broken links, or stale UI labels.
- Clarifying confusing steps or adding missing prerequisites.
- Adding a new page that fits one of the [section
  scopes](https://docs.mincemeat.id/) and matches a recognized [page
  type](https://docs.mincemeat.id/contributing/content-model#page-types).
- Improving accessibility (alt text, heading order, color contrast).
- Updating screenshots when the UI changes.

## What does not belong here

This repository is for **end-user** documentation only. Operator
runbooks, infrastructure provisioning, internal API references,
incident response notes, admin-only workflows, and anything involving
real customer data belong in private repositories instead.

## Before you submit checklist (sensitive data)

Confirm your change does **not** include any of the following:

- [ ] Production or staging credentials, API tokens, JWTs, session
      cookies, or access keys.
- [ ] Real customer account identifiers, email addresses, project
      names, or deployment IDs.
- [ ] Real customer domains or DNS records.
- [ ] Private hostnames, internal IP addresses, or non-public service
      URLs.
- [ ] Provider account IDs, organization IDs, zone IDs, or other
      operator-only identifiers.
- [ ] Stack traces, logs, or error messages that contain any of the
      items above.
- [ ] Screenshots that contain any of the items above.
- [ ] Internal-only runbook content, incident details, or operations
      tooling instructions.
- [ ] Private repository names, internal Git remotes, or links into
      private GitHub repositories.

When in doubt, redact and ask a maintainer before merging.

## Branching, commits, pull requests

- Fork the repository and create a feature branch from `main`.
- Use short, descriptive branch names: `docs/connect-custom-domain`,
  `fix/recovery-code-typo`.
- Keep each pull request focused on one change.
- Use plain, present-tense commit messages. Conventional Commit
  prefixes (`docs:`, `fix:`, `chore:`) are encouraged but not required.
- Rebase on `main` rather than merging `main` into your branch.
- Do not force-push after a maintainer starts reviewing; add follow-up
  commits and we will squash on merge.

## Review and merge

- A maintainer will respond within a few business days.
- Address review comments by pushing follow-up commits to the same
  branch.
- A pull request can only merge when CI is green and at least one
  maintainer approves.
- Pull requests merge with a squash so each change is one clean commit
  on `main`.

## Licensing

By opening a pull request you agree that:

- Your prose, tables, diagrams, and other documentation content are
  licensed under
  [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Your code, theme, scripts, and build configuration changes are
  licensed under [MIT](https://opensource.org/licenses/MIT).

See [LICENSE](https://github.com/mincemeat-id/documentation/blob/main/LICENSE)
and
[LICENSE-CONTENT](https://github.com/mincemeat-id/documentation/blob/main/LICENSE-CONTENT)
for full text.

## Reporting security or sensitive-data issues

Do not open a public issue for security concerns. See
[SECURITY.md](https://github.com/mincemeat-id/documentation/blob/main/SECURITY.md)
for the private reporting channels.
