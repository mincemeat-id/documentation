---
title: View your instances
description: Find and browse your assigned cloud instances using the instance list, search, filters, and detail view.
category: instances
audience: user
updated: 2026-05-18
related:
  - /instances/
  - /instances/instance-status
  - /instances/metrics
---

# View your instances

The Instances page shows every cloud instance assigned to your account.
Use search, filters, and sorting to find a specific instance quickly.

## Before you start

- You must be signed in.
- At least one instance must be assigned to your account by an
  administrator.

## View the instance list

1. Select **Instances** in the main navigation.
2. Browse the card grid. Each card shows the instance name, current
   status, and a status badge.
3. Use the **Search** field to find an instance by name.
4. Use the **Status** filter to show only instances in a particular
   state, such as **Running** or **Stopped**.
5. Change the sort order with the **Sort** control to arrange instances
   by name, creation date, or status.
6. Use the pagination controls at the bottom when you have more
   instances than fit on one page.

## View instance details

1. Select an instance card to open the detail view.
2. The detail view shows:
   - **Status** — current instance state with a colour-coded badge.
   - **Configuration** — assigned profile, resource limits (CPU, memory,
     disk), and the application template used during creation.
   - **Metrics** — live CPU, memory, and disk usage (when the instance
     is running).
   - **Domains** tab — custom domain and proxy settings, if a domain is
     attached.
   - **Snapshots** tab — point-in-time snapshots created by
     administrators.

## What happens next

From the detail view you can:

- [Check instance status](/instances/instance-status) to understand what
  the current state means.
- [Start, stop, or restart](/instances/start-stop-restart) the instance
  when lifecycle controls are available.
- [Open the web terminal](/instances/web-terminal) for interactive
  command-line access.
- [View metrics](/instances/metrics) for real-time resource usage.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| The instance list is empty | Confirm with your administrator that at least one instance is assigned to your account. |
| An instance you expected is missing | Check the status filter — it may be set to a specific state that excludes your instance. Clear all filters and try again. |
| The status badge shows a state you do not recognize | See [Instance status](/instances/instance-status) for a full list of states. |

## Related

- [Cloud Instances overview](/instances/)
- [Instance status](/instances/instance-status)
- [Metrics](/instances/metrics)
