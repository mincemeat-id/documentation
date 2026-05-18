---
title: Cloud Instances
description: View assigned instances, read status and metrics, use the web terminal, and manage proxy settings.
category: instances
audience: user
updated: 2026-05-18
related:
  - /get-started/
  - /troubleshooting/
---

# Cloud Instances

A cloud instance is a dedicated Linux container managed by your
organisation through Mincemeat. Administrators create instances and
assign them to users. Once assigned, you can view your instance's
status, monitor resource usage, open a web terminal for interactive
work, and review available snapshots and domain settings.

## What you can do with user access

| Capability | What it means |
| --- | --- |
| View assigned instances | See every instance that an admin has assigned to your account, including name, status, and configuration. |
| Read status and metrics | Check whether an instance is running, stopped, or in a transitional state. View CPU, memory, and disk usage. |
| Start, stop, and restart | Use lifecycle controls when the instance is in a state that allows them. |
| Open the web terminal | Connect to a running instance through a browser-based terminal for interactive command-line work. |
| View snapshots | See the list of point-in-time snapshots created by administrators. |
| View instance domains | See the custom domain attached to your instance and its current validation state. |
| Update proxy settings | Toggle authentication and maintenance mode on your instance's domain when those controls are available. |

## What requires administrator access

The following actions are managed by administrators and are not
available to user-role accounts:

- Creating, deleting, or reassigning instances.
- Changing instance resource limits (CPU, memory, disk).
- Creating, restoring, or deleting snapshots.
- Attaching or removing a custom domain.
- Blocking IPs, managing referrers, or purging CDN cache.

## Getting started

If you have at least one assigned instance, start with
[View your instances](/instances/view-instances) to explore the
instance list and detail views.

## Related

- [Get started](/get-started/)
- [Troubleshooting](/troubleshooting/)
