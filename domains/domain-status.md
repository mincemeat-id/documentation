---
title: Domain status
description: Understand domain validation states, what each status means, and what to do when a domain is not working.
category: domains
audience: user
updated: 2026-05-19
related:
  - /domains/dns-basics
  - /domains/connect-custom-domain
  - /troubleshooting/domains
---

# Domain status

When you connect a custom domain to Mincemeat, it goes through a
validation process. Understanding the status states helps you know what
to expect and what to check when something is not working.

## Domain status states

| Status | Meaning | What to do |
| --- | --- | --- |
| **Pending** | Mincemeat is waiting for the DNS record to appear. | Verify you added the correct DNS record at your registrar. Wait for DNS propagation. |
| **Validated** | Mincemeat has confirmed the DNS record and domain ownership. | No action needed. SSL certificate provisioning should begin automatically. |
| **SSL provisioning** | Mincemeat is generating an SSL certificate for your domain. | Wait a few minutes. This process is automatic. |
| **Active** | Your domain is serving traffic with a valid SSL certificate. | No action needed. Your domain is fully operational. |
| **Failed** | Validation or SSL provisioning failed. | Check the error message. Verify your DNS record is correct and try again. |
| **Expired** | The SSL certificate has expired and needs renewal. | Contact support if the certificate does not renew automatically. |
| **Removed** | The domain has been disconnected from your site or instance. | Re-add the domain if you want to use it again. |

## Checking domain status

1. Navigate to your static site or instance settings.
2. Select **Domains**.
3. Find your domain in the list and check its status.

If the status is **Failed**, Mincemeat shows an error message explaining
what went wrong.

## Common validation issues

### DNS record not found

Mincemeat cannot find the required DNS record. Check:

- You added the record at the correct registrar.
- The record type (CNAME or A) matches what Mincemeat expects.
- The record value is exact, with no extra characters.
- Enough time has passed for DNS propagation.

### DNS record mismatch

The DNS record exists but does not match the expected value. Check:

- You copied the validation target exactly from Mincemeat.
- There are no typos in the record value.
- You did not add an extra trailing dot or space.

### SSL certificate failure

SSL provisioning failed. This can happen if:

- The domain is not yet validated.
- The domain resolves to an incorrect endpoint.
- There is a temporary issue with the certificate authority.

Wait a few minutes and check again. If the issue persists, contact
support.

## What to check next

- If your domain is **Pending**, use a DNS lookup tool to verify your
  record is visible publicly.
- If your domain is **Failed**, review the error message and correct
  your DNS configuration.
- If your domain is **Active** but not serving content, check that your
  site or instance is running and has an active deployment.

## Related

- [DNS basics](/domains/dns-basics)
- [Connect a custom domain](/domains/connect-custom-domain)
- [Domain troubleshooting](/troubleshooting/domains)
