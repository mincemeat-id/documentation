---
title: Instance status
description: Understand each cloud instance status, what it means for your work, and when to wait or take action.
category: instances
audience: user
updated: 2026-05-18
related:
  - /instances/view-instances
  - /instances/start-stop-restart
  - /instances/troubleshooting
---

# Instance status

Every cloud instance has a status that tells you what the instance is
doing right now. The status appears as a colour-coded badge on both the
instance list and the detail view.

## Status reference

| Status | What it means | What you can do |
| --- | --- | --- |
| **Pending** | The instance has been requested and is waiting for creation to begin. | Wait. Creation starts automatically. |
| **Creating** | Mincemeat is provisioning the instance on the server. | Wait. This usually takes less than a minute. |
| **Running** | The instance is active and reachable. | Use the web terminal, view metrics, and start workflows. |
| **Stopped** | The instance is powered off. It still exists and keeps its data. | Start the instance to resume work. |
| **Stopping** | The instance is shutting down gracefully. | Wait. The instance moves to **Stopped** shortly. |
| **Restarting** | The instance is stopping and then starting again. | Wait. The instance returns to **Running** shortly. |
| **Error** | Something went wrong during a lifecycle operation. | Check the [troubleshooting page](/instances/troubleshooting). If the problem persists, note the correlation ID and contact support. |
| **Deleting** | An administrator has requested deletion. | No actions are available. |
| **Deleted** | The instance has been removed. | The instance no longer appears in your list after a short time. |

## Waiting states

Some statuses are transitional — the instance is moving between stable
states and you cannot interact with it yet.

| Transitional status | Expected outcome | Typical wait time |
| --- | --- | --- |
| Pending | Creating → Running | Under 1 minute |
| Creating | Running | Under 1 minute |
| Stopping | Stopped | A few seconds |
| Restarting | Running | A few seconds |
| Deleting | Deleted | A few seconds |

During a transitional state:

- Lifecycle controls (start, stop, restart) are disabled.
- The web terminal is not available.
- Metrics may stop updating until the instance reaches a stable state.

## Real-time updates

Instance status updates are pushed to your browser in real time. You do
not need to refresh the page — the status badge updates automatically
when the instance transitions.

If you notice the status has not changed for an unusually long time,
try refreshing the page. The app re-synchronizes with the server on
every page load and reconnection.

## What to check next

- If the instance is **Running**, you can
  [open the web terminal](/instances/web-terminal) or
  [view metrics](/instances/metrics).
- If the instance is **Stopped**, you can
  [start it](/instances/start-stop-restart).
- If the instance is in **Error**, check the
  [troubleshooting page](/instances/troubleshooting).

## Related

- [View your instances](/instances/view-instances)
- [Start, stop, restart](/instances/start-stop-restart)
- [Troubleshooting](/instances/troubleshooting)
