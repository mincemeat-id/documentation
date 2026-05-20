---
title: Connect a custom domain
description: Add a custom domain to your static site or instance and validate DNS ownership.
category: domains
audience: user
updated: 2026-05-19
related:
  - /domains/dns-basics
  - /domains/domain-status
  - /static-sites/custom-domains
  - /instances/instance-domains
---

# Connect a custom domain

Connect a custom domain to your static site or cloud instance so
visitors can access your content using your own domain name instead of
the shared Mincemeat subdomain.

## Before you start

- You own the domain you want to connect.
- You have access to your domain registrar or DNS provider's control
  panel.
- Your static site or instance is active and serving content.

## Steps

### 1. Add the domain in Mincemeat

1. Navigate to your static site or instance settings.
2. Select **Domains**.
3. Select **Add Domain**.
4. Enter your full domain name (for example, `www.example.com` or
   `example.com`).
5. Select **Add**.

Mincemeat displays a validation target and the DNS record you need to
add.

### 2. Add the DNS record

The record you need to add depends on your domain type:

**For subdomains** (for example, `www.example.com`):

Add a CNAME record at your DNS provider:

```dns
Type: CNAME
Name: www
Value: <validation-target>.mincemeat.app
TTL: 3600
```

**For apex domains** (for example, `example.com`):

Add an A record at your DNS provider:

```dns
Type: A
Name: @
Value: 203.0.113.1
TTL: 3600
```

Use the exact values shown in the Mincemeat interface.

### 3. Wait for validation

Mincemeat automatically checks for your DNS record. Validation
typically completes within a few minutes, but can take longer if DNS
propagation is slow.

The domain status changes from **Pending** to **Validated** once
Mincemeat detects the correct DNS record.

### 4. SSL certificate provisioning

After validation, Mincemeat automatically provisions an SSL certificate
for your domain. This process usually takes a few minutes.

Once the certificate is ready, your domain serves traffic over HTTPS.

## What happens next

- Your custom domain appears in the domain list with a **Validated**
  status.
- Visitors can access your site using your custom domain.
- Mincemeat automatically renews your SSL certificate before it expires.

## Troubleshooting

| Problem | What to check |
| --- | --- |
| Domain stays in **Pending** status | Verify the DNS record is correct using a DNS lookup tool. Check that you added the record at the correct registrar. |
| Validation fails | Confirm the record value matches exactly what Mincemeat shows. Remove any trailing dots or extra spaces. |
| SSL certificate fails to provision | Ensure validation completed successfully. Wait a few minutes and check again. |
| Site not accessible via custom domain | Check that the domain status is **Validated** and the SSL certificate is active. Clear your browser cache. |

## Related

- [DNS basics](/domains/dns-basics)
- [Domain status](/domains/domain-status)
- [Custom domains for static sites](/static-sites/custom-domains)
- [Instance domains](/instances/instance-domains)
