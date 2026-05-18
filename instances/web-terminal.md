---
title: Web terminal
description: Connect to your running cloud instance through a browser-based terminal for interactive command-line access.
category: instances
audience: user
updated: 2026-05-18
related:
  - /instances/instance-status
  - /instances/start-stop-restart
  - /instances/troubleshooting
---

# Web terminal

The web terminal lets you connect to your running cloud instance
directly from the browser. You get an interactive command-line session
without needing to install SSH clients or manage keys.

## Before you start

- You must be signed in.
- The instance must be assigned to your account.
- The instance must be in the **Running** status. The terminal is not
  available when the instance is stopped, creating, or in an error
  state.
- Use a modern browser — Chrome, Firefox, Safari, or Edge.

## Open a terminal session

1. Open the instance detail view.
2. Select **Terminal**.
3. The terminal view opens and connects to the instance automatically.
4. When you see the command prompt, the session is ready. You can type
   commands and see output in real time.

## Working in the terminal

The web terminal behaves like a standard Linux terminal:

- Type commands and press **Enter** to run them.
- Use **Tab** for command and path completion (if your shell supports
  it).
- Use **Ctrl + C** to interrupt a running command.
- Use **Ctrl + D** or type `exit` to end the shell session.
- The terminal resizes automatically when you resize the browser window.

## Session limits

| Limit | Default | What happens |
| --- | --- | --- |
| **Session duration** | 1 hour | The session closes automatically with a warning message in the terminal. |
| **Recording buffer** | 50 MB | Recording stops, but the session continues unrecorded. |

Your session activity is recorded for security auditing. The recording
is stored securely and is only accessible to administrators.

## Safety notes

::: warning Your session is recorded
All terminal input and output is recorded. Avoid entering sensitive
information such as passwords or API tokens directly in the terminal
when possible. Use environment variables or configuration files with
appropriate permissions.
:::

- **Save your work often.** If the session disconnects unexpectedly,
  unsaved changes in the terminal are lost.
- **Do not close the browser tab while a long-running command is
  active.** Closing the tab ends the terminal session and interrupts the
  running command.
- **Be careful with destructive commands.** Commands like `rm -rf` have
  immediate effect. There is no undo.

## Connection handling

The terminal uses a WebSocket connection to your instance:

- If your network drops briefly, the terminal may reconnect
  automatically.
- If the connection cannot be restored, the terminal shows a
  **Connection closed** message with a status code.
- To start a new session, navigate back to the instance and select
  **Terminal** again.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| The Terminal button is disabled | The instance must be **Running**. Check the status badge and start the instance if it is stopped. |
| The terminal shows "Connection closed" immediately | Your session may have expired. Navigate back and open a new terminal session. |
| The terminal is slow or unresponsive | Check your network connection. A slow network causes noticeable delay in keystroke echo. |
| Text appears garbled or misaligned | Resize the browser window to trigger a terminal refit, or refresh the page and reconnect. |
| The session ended unexpectedly | The 1-hour session limit may have been reached. Start a new session. |
| Copy and paste does not work | Use **Ctrl + Shift + C** / **Ctrl + Shift + V** in the terminal on Linux. On macOS, use **Cmd + C** / **Cmd + V**. Right-click paste may also work depending on your browser. |

## Related

- [Instance status](/instances/instance-status)
- [Start, stop, restart](/instances/start-stop-restart)
- [Troubleshooting](/instances/troubleshooting)
