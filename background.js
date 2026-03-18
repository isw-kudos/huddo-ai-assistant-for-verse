// Re-inject content scripts into matching tabs when extension is reloaded/updated
chrome.runtime.onInstalled.addListener(reInjectAll);
chrome.runtime.onStartup.addListener(reInjectAll);

async function reInjectAll() {
  const { verseUrl } = await chrome.storage.local.get("verseUrl");
  if (!verseUrl) return;
  let hostname;
  try {
    const u = new URL(verseUrl.startsWith('http') ? verseUrl : 'https://' + verseUrl);
    hostname = u.hostname;
  } catch (e) { return; }
  const tabs = await chrome.tabs.query({ url: `https://${hostname}/*` });
  for (const tab of tabs) {
    try {
      await chrome.scripting.insertCSS({ target: { tabId: tab.id }, files: ["styles.css"] });
      await chrome.scripting.executeScript({ target: { tabId: tab.id }, files: ["content.js"] });
    } catch (e) {}
  }
}

// ── Language support ──────────────────────────────────────────────────────────

const LANGUAGE_MAP = [
  { prefix: "en-AU", instruction: "Use Australian English spelling (e.g. summarise, organise, colour, favour, centre, realise)." },
  { prefix: "en-GB", instruction: "Use British English spelling (e.g. summarise, organise, colour, favour, centre, realise)." },
  { prefix: "en",    instruction: "Use American English spelling." },
  { prefix: "de",    instruction: "Respond in German (Deutsch). Use formal Sie form unless the email uses du." },
  { prefix: "fr",    instruction: "Réponds en français. Utilise le vouvoiement sauf si l'email utilise le tutoiement." },
  { prefix: "it",    instruction: "Rispondi in italiano. Usa il Lei formale a meno che l'email non usi il tu." },
  { prefix: "es",    instruction: "Responde en español. Usa usted en contextos formales salvo que el correo use tú." },
  { prefix: "pt-BR", instruction: "Responda em português brasileiro. Use tratamento formal (você) salvo se o e-mail usar outro." },
  { prefix: "pt",    instruction: "Responda em português europeu. Use tratamento formal salvo indicação em contrário." },
  { prefix: "ja",    instruction: "日本語で返信してください。ビジネスメールに適した丁寧語（です・ます調）を使用してください。" },
  { prefix: "ko",    instruction: "한국어로 답변해 주세요. 비즈니스 이메일에 적합한 공손한 표현(합쇼체)을 사용해 주세요." },
  { prefix: "zh-TW", instruction: "請使用繁體中文回覆，並採用正式商業書信語氣。" },
  { prefix: "zh-HK", instruction: "請使用繁體中文回覆，並採用正式商業書信語氣。" },
  { prefix: "zh",    instruction: "请使用简体中文回复，并采用正式商务邮件的语气。" },
  { prefix: "ru",    instruction: "Отвечайте на русском языке, используя вежливое обращение «вы», если в письме не используется «ты»." },
  { prefix: "pl",    instruction: "Odpowiadaj po polsku, używając formalnej formy grzecznościowej, chyba że e-mail jest nieformalny." },
  { prefix: "cs",    instruction: "Odpovídejte česky, používejte formální oslovení, pokud e-mail není neformální." },
  { prefix: "hu",    instruction: "Válaszoljon magyarul, használjon formális megszólítást, ha az e-mail nem informális." },
  { prefix: "nl",    instruction: "Antwoord in het Nederlands. Gebruik de formele u-vorm tenzij de e-mail informeel is." },
];

function getLanguageInstruction(langCode) {
  if (!langCode) return LANGUAGE_MAP.find(l => l.prefix === "en").instruction;
  const lower = langCode.toLowerCase().replace("_", "-");
  const match = LANGUAGE_MAP.find(l =>
    lower === l.prefix.toLowerCase() ||
    lower.startsWith(l.prefix.toLowerCase() + "-")
  );
  return match ? match.instruction : LANGUAGE_MAP.find(l => l.prefix === "en").instruction;
}

function buildSystemPrompt(langInstruction) {
  return `You are an email assistant integrated into HCL Verse.
You help users read, summarise, reply to, and compose emails.
Be concise and professional. When drafting email content, output only the email body text with no preamble.
${langInstruction}`;
}

function resolveLanguage(storedOverride, browserLang) {
  // If user picked an explicit language in settings, use it
  if (storedOverride && storedOverride !== "") return storedOverride;
  // Otherwise use the browser language sent from content.js
  if (browserLang && browserLang !== "") return browserLang;
  return "en";
}

// ── Provider API calls ────────────────────────────────────────────────────────

async function callClaude(messages, apiKey, systemPrompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true"
    },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 2048, system: systemPrompt, messages })
  });
  if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message || "Claude API error"); }
  return (await res.json()).content[0].text;
}

async function callOpenAI(messages, apiKey, systemPrompt) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "gpt-4o", max_tokens: 2048,
      messages: [{ role: "system", content: systemPrompt }, ...messages]
    })
  });
  if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message || "OpenAI API error"); }
  return (await res.json()).choices[0].message.content;
}

async function callGemini(messages, apiKey, systemPrompt) {
  const contents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }]
  }));
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents,
        generationConfig: { maxOutputTokens: 2048 }
      })
    }
  );
  if (!res.ok) { const e = await res.json(); throw new Error(e.error?.message || "Gemini API error"); }
  return (await res.json()).candidates[0].content.parts[0].text;
}

async function callOllama(messages, ollamaUrl, ollamaModel, systemPrompt) {
  const base = (ollamaUrl || "http://localhost:11434").replace(/\/$/, "");
  const res = await fetch(`${base}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: ollamaModel || "llama3", stream: false,
      messages: [{ role: "system", content: systemPrompt }, ...messages]
    })
  });
  if (!res.ok) throw new Error(`Ollama error: ${res.status} ${res.statusText}`);
  return (await res.json()).message.content;
}

// ── Message handler ───────────────────────────────────────────────────────────

chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
  // Debug request — returns active language config without calling AI
  if (msg.type === "LANG_DEBUG") {
    (async () => {
      const stored = await chrome.storage.local.get(["languageOverride", "provider", "verseUrl"]);
      const langCode = resolveLanguage(stored.languageOverride, msg.browserLang);
      sendResponse({
        storedOverride: stored.languageOverride,
        browserLang: msg.browserLang,
        resolvedLang: langCode,
        instruction: getLanguageInstruction(langCode),
        provider: stored.provider,
        verseUrl: stored.verseUrl
      });
    })();
    return true;
  }

  if (msg.type !== "CLAUDE_REQUEST") return;

  (async () => {
    try {
      const stored = await chrome.storage.local.get(
        ["apiKey", "provider", "ollamaUrl", "ollamaModel", "languageOverride"]
      );

      const langCode = resolveLanguage(stored.languageOverride, msg.browserLang);
      const systemPrompt = buildSystemPrompt(getLanguageInstruction(langCode));
      const prov = stored.provider || "claude";
      const { apiKey, ollamaUrl, ollamaModel } = stored;
      let reply;

      if (prov === "claude") {
        if (!apiKey) throw new Error("No API key set. Click the extension icon to add your Anthropic API key.");
        reply = await callClaude(msg.messages, apiKey, systemPrompt);
      } else if (prov === "openai") {
        if (!apiKey) throw new Error("No API key set. Click the extension icon to add your OpenAI API key.");
        reply = await callOpenAI(msg.messages, apiKey, systemPrompt);
      } else if (prov === "gemini") {
        if (!apiKey) throw new Error("No API key set. Click the extension icon to add your Gemini API key.");
        reply = await callGemini(msg.messages, apiKey, systemPrompt);
      } else if (prov === "ollama") {
        reply = await callOllama(msg.messages, ollamaUrl, ollamaModel, systemPrompt);
      } else {
        throw new Error(`Unknown provider: ${prov}`);
      }

      sendResponse({ reply });
    } catch (e) {
      sendResponse({ error: e.message });
    }
  })();

  return true;
});
