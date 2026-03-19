# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in this extension, please do not open a public issue.

Instead, please email the maintainer directly or use GitHub's private vulnerability reporting feature.

## What to Report

- Any issue that could expose a user's API keys
- Any issue that could cause email content to be sent to unintended third parties
- Any XSS or injection vulnerability in the extension's UI

## What This Extension Does With Your Data

- **API keys** are stored in Chrome's local extension storage (`chrome.storage.local`) and are never transmitted anywhere except directly to your chosen AI provider's API
- **Email content** is only sent to your AI provider when you explicitly click a button (Summarise, Draft reply, etc.) — nothing is sent automatically or in the background
- **No analytics, no tracking, no telemetry** of any kind

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.2.x   | ✅ Yes    |
| < 1.2   | ❌ No     |

## No Warranty / Use at Your Own Risk

This extension is provided "as is", without warranty of any kind. The maintainers make no guarantees about the security, reliability, or fitness of this software for any particular purpose, including use in regulated or sensitive environments.

You are responsible for:
- Ensuring that sending email content to a third-party AI provider is permitted under your organisation's policies and applicable law
- Securing your API keys
- Reviewing AI-generated output before acting on it or sending it

See the full [Disclaimer](README.md#disclaimer) in the README.
