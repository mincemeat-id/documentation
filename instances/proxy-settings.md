---
title: Proxy settings
description: Toggle authentication and maintenance mode on your instance domain when proxy controls are available to you.
category: instances
audience: user
updated: 2026-05-18
related:
  - /instances/instance-domains
  - /instances/view-instances
  - /instances/troubleshooting
---

# Proxy settings

When your instance has an active custom domain, you can adjust proxy
settings that control how visitors access your instance through that
domain. User-role accounts can toggle authentication mode and
maintenance mode on their assigned instances.

## Before you start

- You must be signed in.
- The instance must be assigned to your account.
- The instance must have a domain in the **SSL Active** status.

## Available settings

| Setting | What it does |
| --- | --- |
| **Authentication mode** | When enabled, visitors must enter a username and password before they can access your instance through the domain. |
| **Maintenance mode** | When enabled, all traffic to your domain is redirected to a maintenance page instead of your instance. |

## Enable authentication

1. Open the instance detail view.
2. Select the **Domains** tab.
3. In the proxy settings section, enable **Authentication mode**.
4. Enter a **Username** and **Password** for visitor access.
5. Save your changes.

Visitors who access your domain are prompted for the username and
password. The password is stored securely and is never shown again in
the interface after saving.

::: tip Changing the password
To change the authentication password, enter a new password in the
proxy settings and save. The old password is replaced immediately.
:::

## Enable maintenance mode

1. Open the instance detail view.
2. Select the **Domains** tab.
3. In the proxy settings section, enable **Maintenance mode**.
4. Save your changes.

All traffic to your domain is redirected to a maintenance page.
Authentication is automatically bypassed during maintenance mode —
visitors see the maintenance page without a password prompt.

## Disable a setting

To disable authentication or maintenance mode, toggle the setting off
and save. Changes take effect within seconds.

## When settings are not available

Proxy settings are only visible when the instance has a domain in the
**SSL Active** status. If you do not see the proxy settings section:

- Check that a domain is attached to the instance.
- Check that the domain status is **SSL Active** (not pending or
  failed).
- If the domain is still provisioning, wait for it to reach
  **SSL Active**.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Proxy settings section is missing | The instance may not have a domain, or the domain may not be in **SSL Active** status. |
| Visitors are not prompted for a password | Confirm that authentication mode is enabled and saved. Changes propagate within seconds. |
| The maintenance page does not appear | Confirm that maintenance mode is enabled and saved. Clear your browser cache if you previously accessed the domain. |
| You cannot save changes | Verify you are assigned to this instance. If the save button is disabled, check for validation errors in the form. |

## Related

- [Instance domains](/instances/instance-domains)
- [View your instances](/instances/view-instances)
- [Troubleshooting](/instances/troubleshooting)
