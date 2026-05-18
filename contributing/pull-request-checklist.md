---
title: Pull request checklist
description: Quality and safety checks every documentation pull request must pass before it can merge.
category: contributing
audience: contributor
updated: 2026-05-18
related:
  - /contributing/style-guide
  - /contributing/security-and-privacy
---

# Pull request checklist

Use this checklist before you mark a pull request as ready for review.
The same checklist is part of the pull request template, so you will
see it again when you open the PR.

## Content quality

- [ ] The page uses the structure from the [style
      guide](/contributing/style-guide) for its page type (task,
      concept, reference, troubleshooting, or overview).
- [ ] The page is written to "you" and uses product UI labels.
- [ ] The H1 matches the `title` frontmatter.
- [ ] All required [frontmatter
      fields](/contributing/content-model#frontmatter-standard) are
      present and valid.
- [ ] The `updated` date is the date of this change.
- [ ] The `related` list points to 2-5 closely related pages.
- [ ] Internal links use site-relative paths and do not include
      `.md`/`.html`.
- [ ] Tables, callouts, and components match the style guide
      conventions.
- [ ] Headings follow `##` → `###` order. No skipped levels.
- [ ] The sidebar in `.vitepress/config.ts` is updated if a page is
      added, removed, renamed, or moved.

## Accuracy

- [ ] Every procedure was verified against the current Mincemeat UI.
- [ ] Status names, labels, and error messages match the app exactly.
- [ ] Waiting states list a realistic time range.
- [ ] Feature-availability callouts are present when the feature
      depends on a plan, role, or assignment.

## Security and privacy

- [ ] No production or staging credentials, API tokens, JWTs, session
      cookies, or access keys.
- [ ] No real customer account identifiers, email addresses, project
      names, or deployment IDs.
- [ ] No real customer domains or DNS records. Example data uses
      `example.com`, `example.org`, or IANA reserved ranges.
- [ ] No private hostnames, internal IP addresses, or non-public service
      URLs.
- [ ] No provider account IDs, organization IDs, zone IDs, or other
      operator-only identifiers.
- [ ] No stack traces, logs, or error messages that contain any of the
      items above.
- [ ] No screenshots that contain any of the items above. Screenshots
      were captured from a seeded demo environment.
- [ ] No internal-only runbook content, incident details, or operations
      tooling instructions.
- [ ] No links to private GitHub repositories or internal Git remotes.

## Local checks

Confirm the following commands all pass locally:

```bash
npm run typecheck
npm run build
npm run lint:links
npm run scan:secrets
npm run lint:frontmatter
npm run lint:markdown
```

- [ ] All commands listed above pass without warnings.

## Pull request hygiene

- [ ] The branch is rebased on the latest `main`.
- [ ] Commits are scoped and have descriptive messages.
- [ ] The pull request title summarizes the change in plain language.
- [ ] The pull request description lists user-visible changes and any
      out-of-scope items the reviewer should know about.
- [ ] Screenshots in the pull request description (if any) follow the
      same screenshot policy as the docs themselves.

## After review

- [ ] All reviewer comments are addressed in follow-up commits.
- [ ] You did not force-push after the review started.
- [ ] CI is green on the latest commit.

## Related

- [Style guide](/contributing/style-guide)
- [Content model](/contributing/content-model)
- [Local development](/contributing/local-development)
- [Security and privacy](/contributing/security-and-privacy)
