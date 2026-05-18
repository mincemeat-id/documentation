---
title: Snapshots
description: View point-in-time snapshots of your cloud instance created by administrators for backup and recovery.
category: instances
audience: user
updated: 2026-05-18
related:
  - /instances/view-instances
  - /instances/instance-status
  - /instances/troubleshooting
---

# Snapshots

A snapshot is a point-in-time copy of your instance's state. Snapshots
are created by administrators as part of backup, maintenance, or upgrade
workflows. As a user, you can view the snapshots that exist for your
assigned instances.

## Before you start

- You must be signed in.
- The instance must be assigned to your account.
- Snapshots are managed by administrators. You cannot create, restore,
  or delete snapshots with a user-role account.

## View snapshots

1. Open the instance detail view.
2. Select the **Snapshots** tab.
3. Review the list of available snapshots. Each entry shows:
   - **Name** — a descriptive label chosen by the administrator (for
     example, `before-upgrade`).
   - **Created at** — the date and time the snapshot was taken.
   - **Stateful** — whether the snapshot includes the running process
     state (memory) or just the disk state.

## What snapshots contain

| Type | What is captured |
| --- | --- |
| **Stateless snapshot** | The instance's file system and configuration at the moment the snapshot was taken. Running processes are not preserved. |
| **Stateful snapshot** | The file system, configuration, and the state of running processes (memory). When restored, the instance resumes where it left off. |

Most snapshots are stateless. Stateful snapshots are larger and take
longer to create, so they are used less frequently.

## What you can do with snapshots

With user access, snapshots are **read-only**:

| Action | User access | Admin / Operations access |
| --- | --- | --- |
| View snapshot list | ✓ | ✓ |
| Create a snapshot | — | ✓ |
| Restore from a snapshot | — | ✓ |
| Delete a snapshot | — | ✓ |

If you need a snapshot created, restored, or deleted, contact your
administrator.

## When snapshots are useful

- **Before upgrades** — your administrator may take a snapshot before
  applying system updates, so the instance can be rolled back if
  something goes wrong.
- **Before risky changes** — if you plan to make significant changes
  inside your instance, ask your administrator to create a snapshot
  first.
- **Recovery** — if your instance enters an unusable state, an
  administrator can restore it from a previous snapshot.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| The Snapshots tab is empty | No snapshots have been created for this instance yet. Contact your administrator if you need one. |
| You cannot find the Restore or Delete button | These actions require administrator or operations access. Contact your administrator. |
| A snapshot name is unclear | Snapshot names are chosen by the administrator. Ask them what the snapshot represents if the name is not self-explanatory. |

## Related

- [View your instances](/instances/view-instances)
- [Instance status](/instances/instance-status)
- [Troubleshooting](/instances/troubleshooting)
