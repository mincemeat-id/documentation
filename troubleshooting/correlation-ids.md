---
title: Use a correlation ID
description: Copy the reference shown with an error and include support-ready context without exposing sensitive data.
category: troubleshooting
audience: user
updated: 2026-05-18
related:
  - /account/sign-in
  - /troubleshooting/error-messages
  - /troubleshooting/contact-support
---

# Use a correlation ID

A correlation ID is a reference value attached to an error. It helps
support find the matching server-side event without asking you to send
private logs or screenshots with sensitive data.

## When you see one

Mincemeat may show a reference in an error banner or toast:

```text
Ref: 550e8400-e29b-41d4
```

Some errors also include a **Copy** button next to the reference.

## Steps

1. Copy the value shown after **Ref:**.
2. Write down what you were trying to do.
3. Note the page or feature where the error appeared.
4. Note the approximate date and time when the error happened.
5. Try the action once more only if it is safe to repeat.
6. Send the correlation ID and context through your normal support
   channel.

## What to include

| Include | Example |
| --- | --- |
| Correlation ID | `550e8400-e29b-41d4` |
| Page or feature | Account Settings, Static Sites, Cloud Instances |
| Action | Changing password, adding a domain, opening terminal |
| Approximate time | 2026-05-18 09:30 in your local time |
| Expected result | What you expected Mincemeat to do |
| Actual result | The short error message shown in the app |

## What not to include

- Passwords, recovery codes, authenticator codes, session cookies, or
  tokens.
- Real customer domains unless support specifically asks for the public
  domain involved in the issue.
- Full browser console logs without checking them for sensitive values.
- Screenshots that show private account identifiers or unrelated
  customer data.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| There is no **Ref:** value | Send the page, action, time, and exact visible error message instead. |
| The copy button does not work | Select the reference text manually, or type it into the support request. |
| The error disappears after retrying | Include that the retry succeeded so support can treat it as intermittent. |

## Related

- [Sign in](/account/sign-in)
- [Error messages](/troubleshooting/error-messages)
- [Contact support](/troubleshooting/contact-support)
