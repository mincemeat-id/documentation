<!--
Thanks for contributing to the Mincemeat documentation!

This repository is PUBLIC. Read SECURITY.md and the "sensitive data"
section below before you submit.
-->

## Summary

<!--
What does this pull request change, in plain language?
Mention the user-visible effect, not just the file diff.
-->

## Type of change

<!-- Check all that apply. -->

- [ ] Typo or small wording fix
- [ ] New page
- [ ] Update to an existing page (steps, labels, accuracy)
- [ ] New or updated screenshot
- [ ] Theme, component, or build change
- [ ] CI, scripts, or repository configuration
- [ ] Other (explain below)

## Related issues

<!-- Link any related issues, e.g. "Closes #123". Leave blank if none. -->

## Docs quality checklist

- [ ] Page uses the structure from the [style guide](https://docs.mincemeat.id/contributing/style-guide) for its page type.
- [ ] H1 matches the `title` frontmatter.
- [ ] All required [frontmatter fields](https://docs.mincemeat.id/contributing/content-model#frontmatter-standard) are present and valid.
- [ ] `updated` is set to today's date for any meaningful content change.
- [ ] `related` lists 2-5 closely related pages.
- [ ] Internal links use site-relative paths without `.md` or `.html`.
- [ ] Tables, callouts, and components match style guide conventions.
- [ ] Headings follow `##` → `###` order (no skipped levels).
- [ ] Sidebar in `.vitepress/config.ts` is updated if a page was added, removed, renamed, or moved.

## Accuracy

- [ ] Every procedure was verified against the current Mincemeat UI.
- [ ] Status names, labels, and error messages match the app exactly.
- [ ] Feature-availability callouts are present if the feature depends on a plan, role, or assignment.

## Sensitive-data checklist

Confirm this pull request does **not** include any of the following:

- [ ] Production or staging credentials, API tokens, JWTs, session cookies, or access keys.
- [ ] Real customer account identifiers, email addresses, project names, or deployment IDs.
- [ ] Real customer domain names or DNS records (use `example.com`, `example.org`, or IANA reserved ranges).
- [ ] Private hostnames, internal IP addresses, or non-public service URLs.
- [ ] Provider account IDs, organization IDs, zone IDs, or other operator-only identifiers.
- [ ] Stack traces, logs, or error messages that contain any of the items above.
- [ ] Screenshots that show any of the items above or were captured from a non-seeded environment.
- [ ] Internal-only runbook content, incident details, or operations tooling instructions.
- [ ] Private repository names, internal Git remotes, or links into private GitHub repositories.

## Local checks

Confirm the following commands all pass on your branch:

- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run lint:links`
- [ ] `npm run scan:secrets`
- [ ] `npm run lint:frontmatter`
- [ ] `npm run lint:markdown`

## Screenshots

<!--
If this pull request adds or updates screenshots:
- Confirm they were captured from a seeded demo environment.
- Confirm all identifiers are blurred or replaced with example data.
- Include the before/after below or describe the change.
-->

## Notes for the reviewer

<!--
Anything else the reviewer should know - for example, an out-of-scope
follow-up, a UI question, or a deliberate style choice.
-->
