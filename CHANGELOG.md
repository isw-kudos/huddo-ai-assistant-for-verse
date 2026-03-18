# Changelog

All notable changes to this project will be documented here.

## [1.2.0] - 2026-03-18

### Added
- Multi-provider AI support: Claude (Anthropic), ChatGPT (OpenAI), Gemini (Google), Ollama (local/free)
- Ollama setup guide built into the settings popup with links to ollama.com
- Provider-aware API key labels, hints and placeholders
- Full UI localisation — 17 languages supported:
  - English (Australian, British, American)
  - German, French, Italian, Spanish
  - Portuguese (Brazilian), Dutch
  - Russian, Polish, Czech, Hungarian
  - Japanese, Korean, Simplified Chinese, Traditional Chinese
- Language auto-detection from browser (`navigator.language`)
- Language override dropdown in settings — both the UI and AI responses change language
- Save confirmation shows active language (e.g. "Settings saved! Language: German — Deutsch")
- Huddo AI branding — icon uses the Verse browser tab icon with white "AI" pill badge
- Panel header shows the Verse icon alongside "Huddo AI Assistant for Verse" (localised per language)
- Extension renamed to "Huddo AI for HCL Verse"

### Changed
- `max_tokens` increased to 2048 to support multi-part responses
- System prompt is now built dynamically per language rather than hardcoded

## [1.1.0] - 2026-03-18

### Added
- Draggable panel (drag by header bar)
- Resizable panel from all 8 edges and corners
- Rotating spinner in Send button while AI is working
- Dynamic panel height up to 50vh, expanding with content
- Tone picker (Professional, Friendly, Concise, Formal) with direct injection into Verse
- "No email selected" friendly message when no email is open
- Silent prompts for Summarise and Action items (no email text echoed in panel)
- Reply text no longer shown in panel on success — only a ✓ confirmation
- History isolation between Summarise and Draft reply actions
- Auto re-injection of content script when extension reloads (background.js onInstalled)
- Double-injection guard (`window.__cvpLoaded`)
- Configurable Verse URL in settings popup — works with any Verse deployment
- Multi-domain support — extension activates only on the configured Verse hostname

### Fixed
- Correct email body selector — skips `collapsed-mailcontent` preview element
- Reply drafts now insert directly into Verse's TinyMCE compose window
- Logged-in user identity detection from nav banner (replies written as the correct person)
- CORS fix — added `anthropic-dangerous-direct-browser-access: true` header

## [1.0.0] - 2026-03-18

### Added
- Initial release
- Summarise, Draft reply, Improve tone, Action items quick-action buttons
- Free-form chat input with multi-turn conversation history
- Direct injection into Verse's TinyMCE compose window
- Reply and Reply All support — auto-clicks Verse's Reply button
- Logged-in user identity detection
- "Insert into compose" fallback button when auto-injection fails
- CORS-compatible Anthropic API integration
