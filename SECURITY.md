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
