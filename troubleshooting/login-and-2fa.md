---
title: Login and 2FA troubleshooting
description: Resolve common sign-in, authenticator code, and recovery code problems without exposing account secrets.
category: troubleshooting
audience: user
updated: 2026-05-18
related:
  - /account/sign-in
  - /account/recovery-codes
  - /troubleshooting/correlation-ids
---

# Login and 2FA troubleshooting

Use this page when you cannot sign in, cannot complete the
two-factor authentication step, or need to recover access with a
recovery code.

## Common problems

| Problem | What to check |
| --- | --- |
| Password is rejected | Confirm the email address, check Caps Lock, and use your current Mincemeat password. |
| You are sent back to sign in | Refresh the page, then sign in again. Your session may have expired. |
| Authenticator code is rejected | Wait for the next 6-digit code and confirm your device time is set automatically. |
| You lost your authenticator device | Use one unused recovery code in **Verification code**. |
| Recovery code is rejected | Confirm the code has not already been used and that the full code was copied. |
| Error shows **Ref:** | Copy the reference and follow [Use a correlation ID](/troubleshooting/correlation-ids). |

## What to try next

1. Try signing in again once after checking the relevant item above.
2. If you used a recovery code, regenerate recovery codes after you
   regain access.
3. If you still cannot sign in, prepare a support request with the
   approximate time, page, visible error, and any correlation ID.

## Related

- [Sign in](/account/sign-in)
- [Use recovery codes](/account/recovery-codes)
- [Use a correlation ID](/troubleshooting/correlation-ids)
