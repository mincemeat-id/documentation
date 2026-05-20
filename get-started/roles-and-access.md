---
title: Roles and access
description: Understand user and administrator roles in Mincemeat, what each role can do, and how permissions affect your workflow.
category: get-started
audience: user
updated: 2026-05-19
related:
  - /get-started/product-overview
  - /instances/
  - /static-sites/
---

# Roles and access

Mincemeat uses a role-based access model. Your role determines what you
can see and do within the platform. This documentation is written for
the **user** role.

## User role

As a user, you can:

| Capability | Description |
| --- | --- |
| View assigned instances | See instances that an administrator has assigned to you. |
| Manage instance settings | Start, stop, or restart assigned instances when allowed. View metrics and use the web terminal. |
| Create static sites | Create and manage your own static sites. |
| Deploy to static sites | Upload files or connect a GitHub repository to deploy. |
| Connect custom domains | Attach custom domains to your static sites or view instance domains. |
| Manage your account | Change your password, set up 2FA, view audit history. |

## Administrator role

Administrators have additional capabilities that are not available to
users:

| Capability | Description |
| --- | --- |
| Create and delete instances | Provision new cloud instances and remove them when no longer needed. |
| Assign instances | Grant users access to specific instances. |
| Manage resource limits | Change CPU, memory, and disk allocations for instances. |
| Manage users | Invite new users, change roles, and remove access. |
| Create snapshots | Take point-in-time snapshots of instances for backup or cloning. |
| Organisation settings | Configure organisation-wide policies and integrations. |

## How you get access

Your administrator creates your account and assigns resources. You
cannot create or assign instances to yourself. If you need access to a
resource you do not currently see, contact your administrator.

## What you cannot do

As a user, you cannot:

- Create or delete cloud instances.
- Assign or reassign instances to other users.
- Change instance resource limits.
- Create or delete snapshots.
- Manage other users' accounts or permissions.
- Access organisation-wide settings.

## Requesting changes

If you need additional access or permissions:

1. Identify the resource you need access to (instance, static site, or
   domain).
2. Contact your organisation's Mincemeat administrator.
3. Provide details about what you need and why.

Administrators can adjust your access through the organisation settings.

## Related

- [Product overview](/get-started/product-overview)
- [Cloud Instances](/instances/)
- [Static Sites](/static-sites/)
