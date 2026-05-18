---
title: Style guide
description: Voice, structure, terminology, examples, and screenshot rules for Mincemeat user documentation.
category: contributing
audience: contributor
updated: 2026-05-18
related:
  - /contributing/content-model
  - /contributing/pull-request-checklist
  - /contributing/security-and-privacy
---

# Style guide

This guide defines how we write Mincemeat user documentation. It keeps
voice, structure, and examples consistent across contributors so readers
can move quickly from "what is this page" to "what do I do next".

If you are unsure about a wording choice or page shape, follow this
guide first and the [content model](/contributing/content-model) second.

## Audience and goals

Write for the **`user` role** in Mincemeat - the person who signs in,
runs their assigned cloud instances, manages static sites, and connects
custom domains.

Every page must help a reader do one of these things:

- Understand what a feature is and when to use it.
- Complete a single concrete task.
- Recognize and resolve a specific error or status.
- Decide whether to escalate to support.

If a page does not match one of those goals, restructure or split it
before merging.

::: warning Out of scope
Operator runbooks, admin-only workflows, infrastructure provisioning,
incident response, and internal API references do **not** belong in this
repository. They live in the private `coreapp/docs` directory.
:::

## Voice

- Write to **"you"**. Never write to "we", "our users", or "the user".
- Use the active voice. Prefer "Mincemeat sends a verification code"
  over "a verification code is sent".
- Be calm and confident. Avoid hype, apologies, and intensifiers like
  "simply", "just", "easy", "obviously", or "powerful".
- Be specific. Replace "soon" with a real range ("usually within a few
  minutes"). Replace "various reasons" with the actual reasons or a
  link to the troubleshooting page.
- Match product language. Use the exact UI labels users see in the app
  (for example, "Sign in", not "log in"; "Cloud Instances", not
  "VPS"; "Static Sites", not "static hosting").
- Use plain English first. When you must introduce a technical term,
  define it on first use or link to a page that does.

### Word choices

| Use | Avoid |
| --- | --- |
| Sign in / sign out | Log in / log out |
| Cloud instance | VPS, VM, server |
| Static site | Static page, static hosting |
| Deployment | Build, release |
| Custom domain | Vanity domain, branded URL |
| Two-factor authentication (2FA) | MFA, OTP |
| Recovery code | Backup code, one-time code |
| Verify | Validate (unless referring to DNS or TLS validation) |
| Select | Click, tap (use "select" for cross-platform UI actions) |

## Page structure

Every task-oriented page follows this template. Keep the section order
even if a section is short.

```markdown
---
title: Page Title
description: One-sentence outcome the reader can expect.
category: section-name
audience: user
updated: YYYY-MM-DD
related:
  - /related/page-one
  - /related/page-two
---

# Page Title

Short outcome-focused introduction. One or two sentences.

## Before you start

- A required permission, plan, or assignment.
- A required file, account, or domain.

## Steps

1. Do the first action.
2. Do the second action.
3. Confirm the expected result.

## What happens next

Explain status changes, waiting time, or notifications.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Example issue | Practical next step |

## Related

- [Related page one](/related/page-one)
- [Related page two](/related/page-two)
```

Notes:

- Use sentence case for headings ("Connect a custom domain", not
  "Connect A Custom Domain").
- Use one `# H1` per page. The H1 must match the `title` frontmatter.
- Do not skip heading levels (`##` then `####` is not allowed).
- Keep paragraphs to three or four sentences.
- Prefer numbered procedures for ordered actions and bulleted lists for
  unordered options.

## Reference and concept pages

Some pages explain a concept (for example, "Instance status") rather
than walking through steps. Use this shape:

```markdown
# Concept name

Short definition.

## When you see this

Where this concept appears in the UI.

## What it means

Plain-language explanation, then exact labels and values.

## Related actions

Links to the task pages that act on this concept.
```

## Components

Prefer the built-in components over hand-rolled markup. They keep
typography, focus, and color tokens consistent.

| Component | Use it for |
| --- | --- |
| `<Callout type="note">` | Side information that is helpful but not required to complete the task. |
| `<Callout type="tip">` | Optional shortcuts or recommendations. |
| `<Callout type="warning">` | Actions that may cause data loss, downtime, or billing impact. |
| `<Prerequisites>` | The "Before you start" list, when items have links or status. |
| `<Steps>` and `<StepCard>` | Numbered procedures that need extra visual separation. |
| `<StatusTable>` | Status name, meaning, and recommended action triplets. |
| `<DnsRecord>` | Copyable DNS record examples. |
| `<ScreenshotFrame>` | Wrap product screenshots so they get the standard border, caption, and dark-mode treatment. |

VitePress also provides built-in `::: info`, `::: tip`, `::: warning`,
and `::: danger` containers. Either the Vue components or the
containers are acceptable; do not mix both styles on the same page.

## Code, commands, and examples

- Use fenced code blocks with a language tag (` ```bash`, ` ```text`,
  ` ```json`).
- Use code blocks only for things a user copies, pastes, or sees
  verbatim: commands, file contents, DNS records, error strings.
- Prefer placeholder values in `ALL_CAPS` or angle brackets
  (`<your-site-name>`) over realistic-looking secrets.
- Use the documented example domains: `example.com`, `example.org`,
  `example.net`, and the IANA reserved ranges (`192.0.2.0/24`,
  `198.51.100.0/24`, `203.0.113.0/24`).

::: danger Never publish

- Production or staging credentials, API tokens, JWTs, session
  cookies, or access keys.
- Real customer domains, deployment IDs, or account identifiers.
- Private hostnames, internal IP addresses, or non-public service URLs.
- Provider account IDs, zone IDs, or other operator-only identifiers.

:::

## Links

- Use descriptive link text. "[Connect a custom
  domain](/static-sites/)" is good; "[click
  here](/static-sites/)" is not.
- Use site-relative paths for internal links (`/account/recovery-codes`,
  not `https://docs.mincemeat.id/account/recovery-codes`).
- Do not link to private GitHub repositories, internal tooling, or
  localhost URLs. The link guardrail will block the PR.

## Screenshots and diagrams

- Capture screenshots from a **seeded demo account** only. Never use
  real customer data.
- Blur or replace any visible identifiers: real names, email addresses,
  domain names, deployment IDs, IP addresses, account IDs.
- Crop to the smallest useful region. Avoid full-window screenshots
  when a panel will do.
- Save screenshots as PNG under `public/screenshots/<section>/`.
- Use a `<ScreenshotFrame>` wrapper so dark mode gets a matching
  border.
- Always include alt text that describes the action, not the visual
  ("The Add Domain dialog with example.com in the domain field", not
  "Screenshot of dialog").
- Regenerate a screenshot whenever the matching UI label changes.

## Tables

- Use Markdown tables for status, comparison, and reference data.
- Keep the first column short and predictable. Put longer prose in the
  rightmost column.
- Right-align numeric columns with `---:`.
- Do not use tables for procedural steps; use a numbered list instead.

## Accessibility

- All images need meaningful alt text. Use `alt=""` only for purely
  decorative images.
- Do not communicate meaning with color alone. Combine color with an
  icon, label, or status name.
- Use heading levels in order; screen readers depend on them.
- Avoid directional cues ("the button on the right") without also
  naming the button.

## Versioning and feature availability

- When a feature depends on a plan, role, assignment, or platform
  configuration, mark it with a `<Callout type="note">` near the top of
  the page.
- When a status, label, or behavior changes, update the `updated` field
  in the frontmatter to the current date.
- Avoid "coming soon" content. Add the page only when the feature is
  available to at least one user role in production.

## Tone for errors and waiting states

- Describe what the user sees first, then what it means, then what to
  do next.
- Do not blame the user. Replace "you entered the wrong code" with
  "the code did not match".
- For waiting states (DNS propagation, deployment processing, snapshot
  creation), give a realistic time range and explain how the UI
  signals completion.
- Suggest "contact support" only after the user has at least one
  concrete self-check step.

## Linting and review

We use markdownlint to catch common formatting issues. Run it locally
before opening a pull request:

```bash
npm run lint:markdown
```

The CI also runs:

- `npm run typecheck`
- `npm run build`
- `npm run lint:links`
- `npm run scan:secrets`
- `npm run lint:markdown`

All five must pass before a pull request can merge.

## Related

- [Content model](/contributing/content-model)
- [Local development](/contributing/local-development)
- [Pull request checklist](/contributing/pull-request-checklist)
- [Security and privacy](/contributing/security-and-privacy)
