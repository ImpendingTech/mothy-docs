---
title: "Security and Hardening"
description: "Mothy's security posture: fail-closed bind, authentication, CSRF, security headers, TLS, validated config, generic errors, and the egress guard that keeps data on the box."
---

Mothy is secure by default: a shipped configuration requires authentication and
does not open itself to the network by accident.

## Bind and authentication

- Fail-closed bind: Mothy refuses to start on a non-loopback address unless
  authentication is configured (`WEB_HOST`).
- Authentication supports single-password and multi-user modes, with scrypt
  password hashing and HMAC-signed HttpOnly session cookies. Login is rate
  limited, and login failures, logouts, and lockouts are audited with the source
  address on failures. Passwords are never logged.

## Request protections

- CSRF protection on every state-changing endpoint, bound to the session.
- The full set of security headers: Content-Security-Policy,
  X-Content-Type-Options, X-Frame-Options, and Referrer-Policy.
- TLS posture: a Secure cookie and HSTS behind a TLS-terminating reverse proxy
  (`COOKIE_SECURE`).
- Static assets are served through a fixed, unit-tested allowlist, so no client
  input reaches a file path.

## Sound engineering defaults

- Parameterised SQL everywhere.
- Secrets come only from the environment, never from source or defaults.
- Generic client errors, with the detail logged on the server under a per-request
  id.
- One central, validated configuration: every environment variable is read and
  checked in one place, and invalid configuration fails fast.

## The egress boundary

The core product makes no outbound network calls. A continuous-integration guard
fails the build if any module outside the allowlisted local Ollama and the
Microsoft 365 client acquires an outbound network call. The Microsoft 365
connector is the single, opt-in, audited exception, and it reaches only the
customer's own tenant. See
[Connectors and actions](./connectors-and-actions.md).

## Related

- [Audit and compliance](./audit-and-compliance.md)
- [Configuration](./configuration.md)
- [Deployment](./deployment.md)
