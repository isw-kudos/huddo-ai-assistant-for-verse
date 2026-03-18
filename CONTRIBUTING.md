# Contributing to AI Assistant for HCL Verse

Thanks for your interest in contributing! Here's how to get involved.

## Getting Started

1. **Fork** this repository using the Fork button at the top right of this page
2. **Clone** your fork to your local machine:
   ```bash
   git clone https://github.com/YOUR_USERNAME/huddo-ai-assistant-for-verse.git
   ```
3. **Load** the extension in Chrome (see README for instructions)
4. Make your changes and test them against a live HCL Verse instance

## Suggesting Features or Reporting Bugs

- Use the [Issues](https://github.com/adambrownaus/huddo-ai-assistant-for-verse/issues) tab to report bugs or suggest features
- For bugs, please include your Chrome version, Verse version/URL pattern, and steps to reproduce
- For features, describe the use case — what problem does it solve?

## Pull Requests

- Keep PRs focused — one feature or fix per PR
- Update the README if you add a new feature
- Test against at least one live Verse instance before submitting
- Use clear commit messages (e.g. `Add: meeting prep button`, `Fix: reply injection on Verse 3.x`)

## Code Style

- Plain JavaScript — no build tools, no bundlers, no frameworks
- Keep `content.js` focused on DOM interaction and UI
- Keep `background.js` focused on API calls
- New AI providers should be added as a self-contained function in `background.js` following the existing pattern

## Adding a New AI Provider

1. Add a `callProviderName(messages, ...)` function in `background.js`
2. Add a new `<option>` in the provider dropdown in `popup.html`
3. Add metadata (label, hint, placeholder) to `PROVIDER_META` in `popup.js`
4. Handle the new provider in the `chrome.runtime.onMessage` handler in `background.js`
5. Update the provider table in `README.md`

## Questions?

Open an issue and tag it with `question`.
