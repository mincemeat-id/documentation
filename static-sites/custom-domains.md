---
title: Custom domains
description: Connect a custom subdomain or apex domain to your static site with automatic SSL and DNS validation.
category: static-sites
audience: user
updated: 2026-05-19
related:
  - /static-sites/shared-subdomains
  - /domains/
  - /static-sites/troubleshooting
---

# Custom domains

Connect your own domain to your static site so visitors reach your
site at an address you control — for example, `docs.example.com` or
`example.com`. Mincemeat handles SSL certificate provisioning
automatically after you configure your DNS records.

## Before you start

- You must be signed in.
- You must own the static site.
- You must have access to your domain's DNS settings at your DNS
  provider (such as Cloudflare, Namecheap, GoDaddy, or your
  registrar).
- Your site should have at least one active deployment so visitors see
  content when the domain goes live.

## Subdomain vs apex domain

Mincemeat supports two types of custom domains:

| Type | Example | DNS record |
| --- | --- | --- |
| **Subdomain** | `docs.example.com`, `blog.example.com` | CNAME |
| **Apex domain** | `example.com` | CNAME flattening, ALIAS, ANAME, or A/AAAA records |

Subdomains are simpler to set up because they use a standard CNAME
record. Apex domains require your DNS provider to support one of
several special record types.

## Connect a subdomain

1. Open the site detail view.
2. Select the **Domains** tab.
3. Select **Add domain**.
4. Enter your subdomain (for example, `docs.example.com`).
5. Select **Add**.
6. Mincemeat displays a **CNAME target** — a hostname that you need to
   point your DNS record to.
7. Go to your DNS provider and create a CNAME record:

   | Field | Value |
   | --- | --- |
   | Type | CNAME |
   | Name | `docs` (or the subdomain prefix you chose) |
   | Target | The CNAME target shown by Mincemeat |
   | TTL | Auto or 300 seconds |

8. Return to Mincemeat. The domain status shows **Pending CNAME**
   while DNS propagation is in progress.

## Connect an apex domain

Apex domains (for example, `example.com` without a subdomain prefix)
require your DNS provider to support CNAME-like records at the zone
apex.

### Option 1: CNAME flattening, ALIAS, or ANAME

If your DNS provider supports one of these features, set up the
record the same way as a subdomain:

| DNS provider | Feature name |
| --- | --- |
| Cloudflare DNS | CNAME flattening |
| DNSimple | ALIAS |
| Namecheap | ALIAS |
| Hover | ALIAS |
| Bunny DNS | ANAME |

Create the record at your DNS provider:

| Field | Value |
| --- | --- |
| Type | CNAME, ALIAS, or ANAME (depending on your provider) |
| Name | `@` or your apex domain |
| Target | The CNAME target shown by Mincemeat |
| TTL | Auto or 300 seconds |

### Option 2: A and AAAA records

If your DNS provider does not support CNAME-like records at the apex,
Mincemeat may display A and AAAA records instead. This option depends
on your platform configuration.

Create the records at your DNS provider:

| Field | Value |
| --- | --- |
| Type | A |
| Name | `@` or your apex domain |
| Value | The IPv4 address shown by Mincemeat |

| Field | Value |
| --- | --- |
| Type | AAAA |
| Name | `@` or your apex domain |
| Value | The IPv6 address shown by Mincemeat |

::: warning A/AAAA records must stay stable
Unlike CNAME records, A and AAAA records point to specific IP
addresses. If the platform addresses change, you must update your DNS
records. Mincemeat will notify you if this happens, but prefer CNAME
flattening or ALIAS if your DNS provider supports it.
:::

## Domain validation process

After you add your DNS records, Mincemeat validates the domain
automatically:

1. **Pending CNAME** — Mincemeat is waiting for your DNS record to
   propagate. Validation checks run periodically.
2. **Provider validating** — the DNS record was found. SSL certificate
   provisioning is in progress.
3. **SSL Active** — the certificate is issued and your domain is fully
   operational. Visitors can access your site at the custom domain.

The entire process typically takes 5 to 30 minutes, depending on DNS
propagation speed.

## Domain statuses

| Status | Meaning |
| --- | --- |
| **Pending provision** | The domain is being registered with the certificate provider. |
| **Pending CNAME** | Waiting for you to add the DNS record and for it to propagate. |
| **Provider validating** | DNS record found. The provider is validating and issuing the SSL certificate. |
| **SSL Active** | Domain is fully operational with a valid SSL certificate. |
| **CNAME Failed** | DNS validation did not complete within the allowed time. |
| **Error** | A provisioning error occurred. |

## Check domain status

1. Open the site detail view.
2. Select the **Domains** tab.
3. Each domain shows its current status. Select a domain for more
   detail, including the CNAME target and any error messages.

## Retry a failed domain

If a domain shows **CNAME Failed** or **Error**:

1. Verify that your DNS record exists and points to the correct
   target.
2. Open the domain detail view.
3. Select **Retry**.
4. Mincemeat resets the validation process and begins checking again.

## Remove a custom domain

1. Open the site detail view.
2. Select the **Domains** tab.
3. Select the domain you want to remove.
4. Select **Remove**.
5. Confirm the removal.

The domain is disconnected immediately. Visitors to that domain will
no longer reach your site. You should also remove or update the DNS
record at your DNS provider.

## Multiple custom domains

You can connect more than one custom domain to the same site. All
custom domains serve the same active deployment. This is useful when
you want both `example.com` and `www.example.com` to point to the
same site.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Domain stuck on **Pending CNAME** | Verify the DNS record at your provider. Make sure the CNAME target matches exactly. Allow up to 30 minutes for propagation. |
| Domain shows **CNAME Failed** | The DNS record was not found within the validation period. Check the record exists and is correct, then select **Retry**. |
| Domain shows **Error** | Note the error message and try **Retry**. If the error recurs, contact support. |
| Custom domain loads but shows wrong content | Make sure the domain is attached to the correct site. Check the Domains tab to confirm. |
| SSL certificate warning in browser | The certificate may still be provisioning. Wait a few minutes and try again. If the status shows **SSL Active** and the warning persists, clear your browser cache. |
| Apex domain not resolving | Your DNS provider may not support CNAME flattening or ALIAS records at the apex. Check the [provider table](#option-1-cname-flattening-alias-or-aname) above or use A/AAAA records if available. |

## Related

- [Shared subdomains](/static-sites/shared-subdomains)
- [Domains overview](/domains/)
- [Troubleshooting](/static-sites/troubleshooting)
