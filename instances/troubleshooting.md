---
title: Instance troubleshooting
description: Diagnose and resolve common cloud instance problems including status errors, terminal issues, and domain failures.
category: instances
audience: user
updated: 2026-05-18
related:
  - /instances/instance-status
  - /instances/web-terminal
  - /troubleshooting/correlation-ids
---

# Instance troubleshooting

Use this page to diagnose common problems with your cloud instances.
Each section covers a category of issues with practical steps to
resolve them.

## Instance status problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Instance stuck in **Pending** or **Creating** | The server may be busy provisioning. | Wait up to 5 minutes. If the status does not change, refresh the page. If it persists, note the correlation ID and contact support. |
| Instance shows **Error** after start | A lifecycle operation failed on the server. | Try starting the instance again. If the error recurs, note the error message and correlation ID, then contact support. |
| Instance shows **Error** after restart | The restart operation encountered a problem. | Try stopping the instance first, then starting it. If the error persists, contact support with the correlation ID. |
| Status badge does not update | The real-time connection may have dropped. | Refresh the page. The app re-synchronizes status on every page load. |
| Instance disappeared from the list | An administrator may have deleted or unassigned the instance. | Contact your administrator to confirm. |

## Web terminal problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Terminal button is disabled | The instance is not in **Running** status. | Start the instance first, then try again. |
| "Connection closed" appears immediately | Your session token may have expired, or the instance stopped. | Navigate back and open a new terminal session. Check that the instance is still running. |
| Terminal is slow or laggy | Network latency between your browser and the server. | Check your internet connection. Try a wired connection if on Wi-Fi. |
| Text is garbled or columns misaligned | Terminal dimensions are out of sync. | Resize the browser window to trigger a refit, or refresh and reconnect. |
| Session ended unexpectedly | The 1-hour session limit was reached. | Open a new terminal session. Sessions are limited to 1 hour for security. |
| Cannot paste text into terminal | Browser keyboard shortcut conflict. | Use **Ctrl+Shift+V** (Linux) or **Cmd+V** (macOS). Right-click paste may also work. |

## Metrics problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Metrics are not showing | The instance may have just started. | Wait 15–30 seconds for the first metric snapshot to be recorded. |
| Metrics appear stale | The monitoring worker may be delayed. | Check the **recorded at** timestamp. If it is more than a few minutes old, refresh the page. |
| Metrics show 0% for everything | The instance may be idle or just booted. | This is normal for a freshly started or idle instance. |

## Domain problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Domain status stuck on **Pending CNAME** | The DNS record has not propagated yet. | Verify the CNAME record with your DNS provider. Allow up to 30 minutes for propagation. Mincemeat checks every 5 minutes. |
| Domain shows **CNAME Failed** | DNS verification did not complete within 24 hours. | Check that the CNAME record exists and points to the correct target. Contact your administrator — the domain may need to be re-added. |
| Domain shows **Error** | A provisioning error occurred. | Note the error message and contact your administrator. |
| Custom domain not loading in browser | SSL may still be provisioning, or DNS has not propagated. | Check the domain status in Mincemeat. If it shows **SSL Active**, try clearing your browser cache or waiting a few minutes. |

## Proxy settings problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Proxy settings section not visible | No domain is attached, or the domain is not **SSL Active**. | Check the Domains tab for domain status. |
| Authentication not working for visitors | The setting may not have been saved. | Open proxy settings and confirm authentication mode is enabled, then save again. |
| Maintenance page not showing | The setting may not have propagated yet. | Save again and wait a few seconds. Clear browser cache if you previously accessed the domain. |

## Snapshot problems

| Problem | Possible cause | What to do |
| --- | --- | --- |
| Snapshots tab is empty | No snapshots have been created for this instance. | Contact your administrator to request a snapshot. |
| Cannot create or restore snapshots | User-role accounts have read-only access to snapshots. | Contact your administrator for snapshot operations. |

## Before contacting support

When you need help beyond what this page covers:

1. Note the **correlation ID** from any error message. This is a
   unique reference that helps support locate the exact issue.
2. Note the **instance name** and **current status**.
3. Note the **time** the problem occurred.
4. Describe what you were trying to do and what happened instead.

See [Correlation IDs](/troubleshooting/correlation-ids) for more on
how to find and use correlation IDs.

## Related

- [Instance status](/instances/instance-status)
- [Web terminal](/instances/web-terminal)
- [Correlation IDs](/troubleshooting/correlation-ids)
