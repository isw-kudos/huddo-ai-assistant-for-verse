# Huddo AI Assistant for HCL Verse

A Chrome and Firefox extension that brings AI-powered email assistance directly into HCL Verse. Summarise emails, draft replies, improve tone, extract action items, and chat with an AI — all without leaving your inbox.

![Version](https://img.shields.io/badge/version-1.2.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-Chrome%20%7C%20Firefox-yellow)

> **⚠️ Disclaimer — Use at your own risk.**
> This extension is an independent, open-source community project and is **not affiliated with, endorsed by, or supported by HCL Software, Anthropic, OpenAI, or Google**. It is provided "as is" with no warranty of any kind. When you use it, your email content is sent to the third-party AI provider you configure — you are responsible for ensuring that is appropriate for your organisation's data handling and compliance requirements. AI-generated content (summaries, replies, action items) may be inaccurate or incomplete and **must always be reviewed before sending**. See the [full disclaimer](#disclaimer) below.

---

## Features

- **Summarise** — Get a 3-bullet summary of any email instantly
- **Draft reply** — AI writes a professional reply and inserts it directly into Verse's compose window
- **Improve tone** — Choose from Professional, Friendly, Concise, or Formal rewrites
- **Action items** — Extract a numbered list of tasks from any email
- **Free-form chat** — Ask the AI anything about the open email
- **Multi-provider** — Works with Claude (Anthropic), ChatGPT (OpenAI), Gemini (Google), or Ollama (local/free)
- **17 languages** — Full UI and AI response localisation including auto-detection from your browser
- **Draggable & resizable** panel — position and size it anywhere on screen
- **No email selected?** — The assistant lets you know politely 😉

---

## Supported AI Providers

| Provider | Cost | Privacy | Setup |
|---|---|---|---|
| [Claude (Anthropic)](https://console.anthropic.com) | Pay per use | Sent to Anthropic | API key required |
| [ChatGPT (OpenAI)](https://platform.openai.com) | Pay per use | Sent to OpenAI | API key required |
| [Gemini (Google)](https://aistudio.google.com) | Free tier available | Sent to Google | API key required |
| [Ollama](https://ollama.com) | **Free** | **Stays on your machine** | Local install required |
| Domino IQ (HCL) | Included with Domino 14.5+ | **Stays on your server** | Admin setup required |

---

## Supported Languages

English (Australian, British, American), German, French, Italian, Spanish, Portuguese (Brazilian), Dutch, Russian, Polish, Czech, Hungarian, Japanese, Korean, Simplified Chinese, Traditional Chinese.

Language is auto-detected from your browser, or can be set manually in the extension settings.

---

## Installation

### 1. Download the extension

Click the green **Code** button on this page and choose **Download ZIP**, then unzip the folder.

Or if you use Git:
```bash
git clone https://github.com/isw-kudos/huddo-ai-assistant-for-verse.git
```

### 2. Load into Chrome or Firefox

#### Chrome



1. Open Chrome and go to `chrome://extensions`
2. Enable **Developer mode** (toggle in the top right)
3. Click **Load unpacked**
4. Select the `huddo-ai-assistant-for-verse` folder

#### Firefox

1. Go to `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on…**
3. Select any file inside the `huddo-ai-assistant-for-verse` folder (e.g. `manifest.json`)
4. The extension loads and persists until Firefox restarts

> **Note:** Temporary add-ons are removed on restart. For a permanent install, the extension must be signed and published on [addons.mozilla.org](https://addons.mozilla.org). Firefox Developer Edition and Nightly can load unsigned extensions permanently via `about:config` → `xpinstall.signatures.required = false`.

### 3. Configure the extension

1. Click the extension icon in Chrome's toolbar
2. Enter your **HCL Verse URL** (e.g. `mail.yourcompany.com/verse`)
3. Choose your **AI provider** and enter your API key (not needed for Ollama)
4. Choose your **language** or leave on Auto-detect
5. Click **Save settings**
6. Refresh your Verse tab

### 4. Use it

Open HCL Verse — you'll see a **✦ button** in the bottom-right corner. Click it to open the assistant panel.

---

## Setting up Ollama (local AI, free)

Ollama runs AI models entirely on your own machine — no API key, no cost, no data leaving your organisation.

1. Download and install from [ollama.com](https://ollama.com)
2. Open Terminal and pull a model:
   ```bash
   ollama pull llama3
   ```
3. **Allow the extension to connect to Ollama** — by default Ollama only accepts requests from `localhost`. Since the extension runs with a `chrome-extension://` origin, you need to set the `OLLAMA_ORIGINS` environment variable before starting Ollama.

   **Mac — one-time Terminal session:**
   ```bash
   # Quit Ollama from the menu bar first, then:
   OLLAMA_ORIGINS=* ollama serve
   ```

   **Mac — persistent (survives reboots):**
   ```bash
   launchctl setenv OLLAMA_ORIGINS "*"
   # Then start Ollama from the menu bar as normal
   ```

   **Windows:**
   Add `OLLAMA_ORIGINS` = `*` to your System Environment Variables, then restart the Ollama service.

4. In the extension settings, select **Ollama**, enter the model name (`llama3`), and save

Other good models to try: `mistral`, `phi3`, `gemma3`
Full model list: [ollama.com/library](https://ollama.com/library)

> **Troubleshooting:** If you see _"Ollama blocked the request (403 Forbidden)"_ in the extension panel, `OLLAMA_ORIGINS` is not set correctly. Follow step 3 above.

---

## Getting API Keys

- **Claude** → [console.anthropic.com](https://console.anthropic.com) → API Keys
- **ChatGPT** → [platform.openai.com](https://platform.openai.com) → API Keys
- **Gemini** → [aistudio.google.com](https://aistudio.google.com) → Get API Key (free tier available)

All keys are stored locally in Chrome and only ever sent directly to the provider's API.

---

## Compatibility

- Should work on any Verse deployment. Tested on Verse 3.2.5
- Chrome (or any Chromium-based browser — Edge, Brave, Arc, etc.) and Firefox 109+
- Works with HCL Verse's standard web client

> **Note:** HCL Verse's DOM structure can vary between versions and deployments. If the email body or reply injection isn't working on your instance, please [open an issue](https://github.com/isw-kudos/huddo-ai-assistant-for-verse/issues) with your Verse version and we'll add support.

---

## Project Structure

```
huddo-ai-assistant-for-verse/
├── manifest.json      # Extension config & permissions
├── background.js      # AI provider routing (Claude, OpenAI, Gemini, Ollama, Domino IQ) + language system
├── content.js         # UI panel, localisation, email reading, Verse DOM injection
├── styles.css         # Panel styling
├── popup.html         # Settings popup
├── popup.js           # Settings logic
└── icons/             # Extension icons (16, 32, 48, 128px)
```

---

## Contributing

Contributions are very welcome! Some ideas for improvements:

- Support for additional AI providers
- Inbox triage / priority summary
- Meeting prep from calendar invites
- Email thread summariser
- Follow-up tracker
- Additional language support

To contribute:
1. Fork this repository
2. Create a feature branch (`git checkout -b feature/my-feature`)
3. Commit your changes (`git commit -m 'Add my feature'`)
4. Push to the branch (`git push origin feature/my-feature`)
5. Open a Pull Request

---

## Privacy & Security

- Your API keys are stored locally in Chrome's extension storage and never shared
- Email content is sent only to your chosen AI provider when you click a button — nothing is sent automatically
- Using Ollama keeps all data entirely on your machine
- The extension only activates on the Verse domain you configure

---

## Disclaimer

This extension is an independent, open-source project created by [ISW Development Pty Ltd](https://isw.net.au). It is **not affiliated with, endorsed by, or in any way connected to HCL Software, Anthropic, OpenAI, Google, or any other company** whose products it integrates with.

**Use at your own risk.** This software is provided "as is", without warranty of any kind — express or implied — including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement. The authors accept no liability for any loss or damage arising from its use.

**Data & privacy responsibility:** When you use this extension, the content of your emails is transmitted to whichever AI provider you have configured. It is your responsibility to ensure this is permitted under your organisation's data handling policies, your employment agreement, and any applicable laws or regulations (including but not limited to GDPR, HIPAA, and industry-specific compliance requirements). The authors accept no responsibility for the unauthorised disclosure of confidential or sensitive information.

**AI-generated content:** Summaries, draft replies, and other AI-generated content may be inaccurate, incomplete, or inappropriate. Always review AI output carefully before acting on it or sending it. The authors accept no responsibility for decisions made or communications sent based on AI-generated content produced by this extension.

---

## License

MIT License — Copyright (c) 2026 ISW Development Pty Ltd
See [LICENSE](LICENSE) for full details.

---

## Author

Created by **Adam Brown** at [ISW Development Pty Ltd](https://isw.net.au)

- 🌐 [isw.net.au](https://isw.net.au)
- 🐙 [Huddo](https://huddo.com)
- 💼 [LinkedIn](https://www.linkedin.com/in/adambrownaus/)

---

## Acknowledgements

Built with ❤️ using the [Anthropic Claude API](https://anthropic.com), and compatible with OpenAI, Google Gemini, and Ollama.
