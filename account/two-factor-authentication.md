---
title: Set up two-factor authentication
description: Protect your Mincemeat account with an authenticator app and save recovery codes safely.
category: account
audience: user
updated: 2026-05-18
related:
  - /account/sign-in
  - /account/recovery-codes
  - /account/disable-two-factor-authentication
---

# Set up two-factor authentication

Two-factor authentication adds a second sign-in step to your Mincemeat
account. After setup, you enter your password and then a code from an
authenticator app.

## Before you start

- You must be signed in.
- Install an authenticator app that supports time-based one-time codes,
  such as Google Authenticator, Authy, 1Password, Bitwarden, or a
  similar password manager.
- Make sure your phone or computer time is set automatically.

## Steps

1. Open **Account Settings**.
2. Select the **Two-Factor Auth** tab.
3. Select **Enable Two-Factor Authentication**.
4. Open your authenticator app.
5. Scan the QR code. If scanning is not available, enter the **Manual
   entry key** in the app.
6. Enter the 6-digit authenticator code in Mincemeat.
7. Select **Verify & Enable**.
8. When **Save Your Recovery Codes** appears, copy or store the codes
   in a safe private place.
9. Select the acknowledgement checkbox.
10. Select **I've Saved My Codes**.

## What happens next

Mincemeat shows **2FA Enabled** on the Two-Factor Auth tab. Future
sign-ins ask for a 6-digit authenticator code after your password.

::: warning Save recovery codes now
Recovery codes are shown only once during setup. Store them in a
password manager or another private location before closing the dialog.
Each code can be used only once.
:::

## Authenticator app guidance

- Use an app that you can recover if your device is lost.
- Keep the account name recognizable so you can find the Mincemeat code
  quickly.
- Do not store recovery codes in the same unlocked place as your
  authenticator device.
- If the code fails repeatedly, check that your device clock is set
  automatically.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| The QR code will not scan | Use the **Manual entry key** instead. |
| The verification code is rejected | Wait for the next 6-digit code and confirm device time is automatic. |
| You closed the recovery code dialog too soon | Regenerate recovery codes from the Two-Factor Auth tab while you still have your authenticator app. |

## Related

- [Sign in](/account/sign-in)
- [Use recovery codes](/account/recovery-codes)
- [Disable two-factor authentication](/account/disable-two-factor-authentication)
