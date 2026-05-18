---
title: Start, stop, and restart an instance
description: Use lifecycle controls to start, stop, or restart your cloud instance when the current status allows it.
category: instances
audience: user
updated: 2026-05-18
related:
  - /instances/instance-status
  - /instances/web-terminal
  - /instances/troubleshooting
---

# Start, stop, and restart an instance

Lifecycle controls let you power on, shut down, or restart a running
cloud instance. The controls available depend on the instance's current
status.

## Before you start

- You must be signed in.
- The instance must be assigned to your account.
- The instance must be in a status that allows the action you want to
  take.

## Available actions by status

| Current status | Start | Stop | Restart | Force stop |
| --- | --- | --- | --- | --- |
| **Running** | — | ✓ | ✓ | ✓ |
| **Stopped** | ✓ | — | — | — |
| **Error** | ✓ | — | — | — |
| **Pending / Creating / Stopping / Restarting / Deleting** | — | — | — | — |

When an action is not available, the button is disabled or hidden.

## Start an instance

1. Open the instance detail view.
2. Select **Start**.
3. The status changes to a transitional state and then moves to
   **Running**.

## Stop an instance

1. Open the instance detail view.
2. Select **Stop**.
3. Confirm the action in the dialog.
4. The status moves to **Stopping** and then to **Stopped**.

::: warning Unsaved work
Stopping an instance is a graceful shutdown. Running processes receive a
shutdown signal, but any unsaved work inside the instance may be lost.
Save your work before stopping.
:::

## Restart an instance

1. Open the instance detail view.
2. Select **Restart**.
3. Confirm the action in the dialog.
4. The status moves to **Restarting** and then returns to **Running**.

## Force stop an instance

If a graceful stop does not complete, you can force the instance to
power off immediately.

1. Open the instance detail view.
2. Select **Force Stop**.
3. Confirm the action in the dialog.
4. The instance powers off without waiting for a graceful shutdown.

::: warning Data risk
Force stopping an instance is equivalent to pulling the power plug.
Processes do not receive a shutdown signal and in-progress writes may be
lost or corrupted. Use force stop only when a normal stop is not
responding.
:::

## What happens next

- After starting or restarting, the instance returns to **Running** and
  the [web terminal](/instances/web-terminal) becomes available.
- After stopping, the instance keeps its data and configuration. You can
  start it again at any time.
- Status changes appear in real time — you do not need to refresh the
  page.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| The Start button is disabled | The instance may be in a transitional state. Wait for the current operation to complete. |
| The Stop or Restart button is disabled | The instance may already be stopped or in a transitional state. Check the status badge. |
| The instance stays in a transitional state for a long time | Refresh the page. If the status does not change after several minutes, note the correlation ID from any error message and contact support. |
| An error appears after starting | See the [troubleshooting page](/instances/troubleshooting) for common error causes. |

## Related

- [Instance status](/instances/instance-status)
- [Web terminal](/instances/web-terminal)
- [Troubleshooting](/instances/troubleshooting)
