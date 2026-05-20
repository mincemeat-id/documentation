---
title: Domain troubleshooting
description: Diagnose and fix common issues with custom domains, DNS validation, and SSL certificates.
category: troubleshooting
audience: user
updated: 2026-05-19
related:
  - /domains/dns-basics
  - /domains/connect-custom-domain
  - /domains/domain-status
  - /troubleshooting/
---

# Domain troubleshooting

Diagnose and fix common issues when connecting or using custom domains
with your static sites or instances.

## Domain validation issues

### Domain stays in Pending status

**Problem**: You added a domain but it remains in **Pending** status
for an extended time.

**What to check**:

1. Verify the DNS record exists at your registrar.
2. Use a DNS lookup tool (like `dig` or an online checker) to confirm
   the record is visible publicly.
3. Check that the record value matches exactly what Mincemeat shows.

**Fix**: If the record is correct, wait for DNS propagation. This
typically takes minutes but can take up to 48 hours in rare cases.

### Validation fails

**Problem**: Mincemeat shows a **Failed** status for your domain.

**What to check**:

1. The DNS record type matches what Mincemeat expects (CNAME for
   subdomains, A for apex domains).
2. The record value is exact, with no typos, extra spaces, or trailing
   dots.
3. You added the record at the correct registrar (the one managing your
   domain's DNS).

**Fix**: Correct the DNS record and wait for Mincemeat to re-check. You
can also remove and re-add the domain in Mincemeat to trigger a fresh
validation.

## SSL certificate issues

### SSL provisioning fails

**Problem**: Your domain is validated but the SSL certificate fails to
provision.

**What to check**:

1. The domain resolves to the correct Mincemeat endpoint.
2. The domain status is **Validated**.
3. There are no conflicting DNS records pointing to a different
   location.

**Fix**: Wait a few minutes and check again. SSL provisioning is
automatic. If it continues to fail, contact support with the domain
name and any error message shown.

### Certificate expired

**Problem**: Visitors see a browser warning about an expired certificate.

**What to check**:

1. The domain status in Mincemeat.
2. Whether the certificate renewal process has started.

**Fix**: Mincemeat automatically renews certificates before they expire.
If a certificate has expired, contact support immediately. In the
meantime, visitors can still access your site via the shared subdomain.

## DNS issues

### DNS record not propagating

**Problem**: You added a DNS record but it is not visible yet.

**What to check**:

1. The TTL of the previous record (high TTLs mean slower propagation).
2. Your registrar's DNS management panel to confirm the record was
   saved.
3. Use `dig` or an online DNS checker to see if the record is visible
   from different locations.

**Fix**: Wait for propagation. You cannot speed up DNS propagation, but
you can verify progress using DNS lookup tools.

### Wrong DNS record type

**Problem**: You added an A record for a subdomain or a CNAME for an
apex domain.

**What to check**:

1. Subdomains (`www.example.com`) need a **CNAME** record.
2. Apex domains (`example.com`) need an **A** record.

**Fix**: Delete the incorrect record and add the correct type with the
value Mincemeat provides.

## Site not accessible via custom domain

**Problem**: Your domain is active but visitors cannot reach your site.

**What to check**:

1. The domain status is **Active** (not Pending, Failed, or Expired).
2. Your static site has an active deployment or your instance is
   running.
3. There are no proxy settings blocking traffic (for instances).
4. Your browser is not caching an old error page.

**Fix**:

1. Confirm the domain status in Mincemeat.
2. Check that your site or instance is operational.
3. Clear your browser cache or try an incognito window.
4. If the issue persists, contact support.

## Related

- [DNS basics](/domains/dns-basics)
- [Connect a custom domain](/domains/connect-custom-domain)
- [Domain status](/domains/domain-status)
- [Troubleshooting overview](/troubleshooting/)
