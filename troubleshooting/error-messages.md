---
title: Error messages
description: Read Mincemeat error messages, decide what is safe to retry, and collect useful support context.
category: troubleshooting
audience: user
updated: 2026-05-18
related:
  - /troubleshooting/correlation-ids
  - /troubleshooting/contact-support
  - /account/audit-history
---

# Error messages

Mincemeat errors usually include a short message and may include a
reference value. Use the message to decide what to check, and use the
reference when support needs to investigate.

## How to read an error

| Part | What it tells you |
| --- | --- |
| Message | The user-visible reason the action did not finish. |
| Field error | The specific form field that needs a different value. |
| **Ref:** | A correlation ID that support can use to find the matching event. |

## What to do first

1. Read the message and check whether it names a field or missing
   requirement.
2. Copy the correlation ID if the error includes **Ref:**.
3. Retry only if the action is safe to repeat.
4. If the same error continues, prepare a support request.

## Safe retry examples

- Signing in after correcting a password typo.
- Entering the next authenticator code.
- Saving a form after fixing a validation message.
- Refreshing a read-only list or detail page.

## Avoid repeated retries

Do not repeatedly retry actions that create, delete, publish, or rotate
important data. Collect the message and correlation ID, then contact
support.

## Related

- [Use a correlation ID](/troubleshooting/correlation-ids)
- [Contact support](/troubleshooting/contact-support)
- [Review your audit history](/account/audit-history)
