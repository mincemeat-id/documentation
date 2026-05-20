---
title: DNS basics
description: Understand DNS records, how they point to Mincemeat, and what you need to configure at your domain registrar.
category: domains
audience: user
updated: 2026-05-19
related:
  - /domains/connect-custom-domain
  - /domains/domain-status
  - /static-sites/custom-domains
---

# DNS basics

DNS (Domain Name System) translates human-readable domain names into
addresses that computers use to route traffic. To connect a custom
domain to Mincemeat, you need to add DNS records at your domain
registrar or DNS provider.

## Key DNS record types

### CNAME record

A CNAME record points one domain name to another. Use CNAME records for
subdomains.

```dns
Type: CNAME
Name: www
Value: your-site.mincemeat.app
TTL: 3600
```

This example points `www.example.com` to `your-site.mincemeat.app`.

### A record

An A record points a domain name to an IP address. Use A records for
apex domains (the bare domain without a subdomain).

```dns
Type: A
Name: @
Value: 203.0.113.1
TTL: 3600
```

Mincemeat provides the IP address you need when you connect an apex
domain.

### TTL (Time to Live)

TTL controls how long DNS resolvers cache your record. A lower TTL
means changes propagate faster but increases DNS queries. For initial
setup, use the default TTL your registrar provides. After validation,
you can increase it.

## Subdomain vs apex domain

| Type | Example | Record type | Notes |
| --- | --- | --- | --- |
| Subdomain | `www.example.com`, `docs.example.com` | CNAME | Easiest to configure. Point to your Mincemeat endpoint. |
| Apex domain | `example.com` | A | Requires an A record. Mincemeat provides the IP address. |

## DNS propagation

After you add or change a DNS record, it can take time for the change
to reach all DNS resolvers worldwide. This is called **propagation**.

- Propagation typically completes within minutes to a few hours.
- The maximum time is determined by the TTL of the previous record.
- You can check propagation using online DNS lookup tools or the
  `dig` command.

## What Mincemeat does with DNS

When you connect a custom domain in Mincemeat:

1. Mincemeat generates a validation target for your domain.
2. You add a DNS record at your registrar pointing to that target.
3. Mincemeat checks for the record and validates ownership.
4. Once validated, Mincemeat provisions an SSL certificate and starts
   serving traffic for your domain.

## Common registrars

You can connect domains from any registrar. Common providers include:

- Cloudflare
- GoDaddy
- Namecheap
- AWS Route 53
- Google Domains
- Porkbun

Each provider has a different interface for adding DNS records, but the
record types and values are the same.

## Related

- [Connect a custom domain](/domains/connect-custom-domain)
- [Domain status](/domains/domain-status)
- [Custom domains for static sites](/static-sites/custom-domains)
