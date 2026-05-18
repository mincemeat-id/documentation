---
title: Instance metrics
description: Monitor CPU, memory, and disk usage for your cloud instance and understand polling delays and stale data.
category: instances
audience: user
updated: 2026-05-18
related:
  - /instances/view-instances
  - /instances/instance-status
  - /instances/troubleshooting
---

# Instance metrics

When an instance is running, Mincemeat shows live resource metrics on
the instance detail view. Use metrics to understand how your instance is
performing and whether it is approaching resource limits.

## Before you start

- You must be signed in.
- The instance must be assigned to your account.
- The instance must be in the **Running** status. Metrics are not
  available for stopped or transitioning instances.

## What metrics are shown

| Metric | What it measures | Display |
| --- | --- | --- |
| **CPU** | Current processor usage as a percentage of the assigned CPU limit. | Percentage bar |
| **Memory** | Current memory usage compared to the assigned memory limit. | Used / total, with percentage bar |
| **Disk** | Current disk usage compared to the assigned disk size. | Used / total, with percentage bar |

## How metrics are updated

Metrics are fetched from the server every **15 seconds** while you are
viewing the instance detail page. The display updates automatically —
you do not need to refresh the page.

- Polling starts when you open the instance detail view.
- Polling stops when you navigate away, which saves network resources.
- The timestamp of the last metric snapshot is shown so you can tell how
  recent the data is.

## Stale data

Metric values can become stale if the instance or the monitoring system
experiences delays:

| Situation | What you see |
| --- | --- |
| The instance was just started | Metrics may not appear for the first 15–30 seconds while the first measurement is recorded. |
| The monitoring worker is behind | The **recorded at** timestamp shows a time older than expected. Values will catch up on the next poll. |
| The instance is stopped while viewing | Metrics stop updating. The last recorded values remain visible until you navigate away. |

If metrics have not updated for several minutes while the instance is
running, try refreshing the page.

## Understanding resource limits

The metrics display shows both current usage and the configured limit.
Resource limits are set by your administrator when the instance is
created and cannot be changed from the user view.

- **CPU** — the maximum number of processor cores available to the
  instance.
- **Memory** — the maximum amount of RAM available.
- **Disk** — the maximum storage space available.

If your instance consistently uses close to 100% of a resource, contact
your administrator to discuss whether a larger resource allocation is
needed.

## Related

- [View your instances](/instances/view-instances)
- [Instance status](/instances/instance-status)
- [Troubleshooting](/instances/troubleshooting)
