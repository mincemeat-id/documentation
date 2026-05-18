# Security Policy

Thank you for helping keep Mincemeat and its users safe.

This repository contains the source for the public Mincemeat user
documentation site at <https://docs.mincemeat.id>. Please follow the
guidance below when reporting concerns or contributing changes.

## Reporting a vulnerability

If you believe you have found a security vulnerability in Mincemeat,
Mincemeat infrastructure, or this documentation site, please report it
**privately**. Do not open a public GitHub issue, pull request, or
discussion that includes vulnerability details.

Preferred reporting channels, in order:

1. Email **security@mincemeat.id** with a clear description of the issue,
   impact, and reproduction steps.
2. If email is not possible, use GitHub's private vulnerability reporting
   on this repository (Security tab → "Report a vulnerability").

Please include:

- A description of the issue and its potential impact.
- Steps to reproduce, proof-of-concept code, or screenshots.
- Your name or handle for acknowledgement, if desired.

We aim to acknowledge new reports within **3 business days** and to
provide an initial assessment within **10 business days**. Please give us
reasonable time to investigate and remediate before any public
disclosure.

## Reporting sensitive content in this repository

If a published page, screenshot, code sample, or configuration in this
repository exposes information that should not be public - such as
credentials, customer data, private hostnames, internal IP addresses,
private provider IDs, or stack traces with secrets - report it through
the same security channels above so we can remove it quickly.

## Public repository safety checklist

Before opening a pull request or merging documentation changes, contributors
and reviewers must confirm that the change does **not** include any of the
following:

- [ ] Production or staging credentials, API tokens, JWTs, session cookies,
      or access keys.
- [ ] Real customer account identifiers, email addresses, project names,
      or deployment IDs.
- [ ] Real customer domain names or DNS records (use the documented
      example domains instead).
- [ ] Private hostnames, internal IP addresses, or non-public service URLs.
- [ ] Provider account IDs, organization IDs, zone IDs, or other
      operator-only identifiers.
- [ ] Stack traces, logs, or error messages that contain any of the items
      above.
- [ ] Screenshots that show any of the items above, real user data, or
      UI captured from a non-seeded environment.
- [ ] Internal-only runbook content, incident details, or operations
      tooling instructions.
- [ ] Private repository names, internal Git remotes, or links into
      private GitHub repositories.
- [ ] Localhost or LAN URLs outside the approved DNS and command examples.

When in doubt, redact and ask a maintainer before merging. The CI secret
scan is a backstop, not a substitute for review.

## Scope

This policy covers:

- The contents of this repository.
- The published documentation site at <https://docs.mincemeat.id>.

For vulnerabilities in the Mincemeat product itself, please use the same
private reporting channels.
