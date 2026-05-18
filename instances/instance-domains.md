---
title: Instance domains
description: View custom domains attached to your cloud instance and understand domain status, DNS setup, and SSL states.
category: instances
audience: user
updated: 2026-05-18
related:
  - /instances/proxy-settings
  - /instances/view-instances
  - /instances/troubleshooting
---

# Instance domains

A custom domain connects your cloud instance to a public web address so
that visitors can reach it at a memorable URL like
`myapp.example.com`. Administrators attach domains to instances;
as a user, you can view the domain configuration and its current status.

## Before you start

- You must be signed in.
- The instance must be assigned to your account.
- Domain attachment is managed by administrators. You cannot attach or
  remove domains with a user-role account.

## View domain details

1. Open the instance detail view.
2. Select the **Domains** tab.
3. If a domain is attached, you see the domain name, status, and
   DNS setup information.

## Domain status

The domain passes through several states after it is attached:

| Status | What it means | What to expect |
| --- | --- | --- |
| **Pending CNAME** | Mincemeat is waiting for a DNS CNAME record to be created. | Follow the displayed DNS instructions. Verification runs every 5 minutes. |
| **CNAME Verified** | The DNS record was found. An SSL certificate is being provisioned. | Wait — SSL provisioning usually completes within minutes. |
| **SSL Active** | The certificate is provisioned and the domain is fully active. | The domain is ready to use. |
| **CNAME Failed** | DNS verification did not succeed within 24 hours. | Check the DNS record and contact your administrator. |
| **Error** | An error occurred during provisioning. | Note the error message and contact your administrator. |

## DNS setup

When a domain is in the **Pending CNAME** state, the detail view shows
the DNS record you need to create:

| Record type | Name | Target |
| --- | --- | --- |
| `CNAME` | Your custom domain | The CNAME target shown in the domain panel |

Create this record with your DNS provider. DNS changes can take minutes
to hours to propagate. Mincemeat checks every 5 minutes and updates the
status automatically.

::: tip DNS propagation
Allow up to 30 minutes for propagation before expecting the status to
change. Some DNS providers take longer.
:::

## One domain per instance

Each instance can have at most one custom domain at a time.

## What requires administrator access

| Action | User | Admin / Operations |
| --- | --- | --- |
| View domain details and status | ✓ | ✓ |
| Attach a domain | — | ✓ |
| Remove a domain | — | ✓ |
| Purge CDN cache | — | ✓ |
| Block IPs or manage referrers | — | ✓ |
| Update proxy settings | ✓ (assigned instances) | ✓ |

## Real-time updates

Domain status changes are pushed to your browser in real time. The
status badge updates automatically when the domain transitions.

## Related

- [Proxy settings](/instances/proxy-settings)
- [View your instances](/instances/view-instances)
- [Troubleshooting](/instances/troubleshooting)
