const verseUrlEl        = document.getElementById("verseUrl");
const providerEl        = document.getElementById("provider");
const keyEl             = document.getElementById("key");
const keyLabelEl        = document.getElementById("apikey-label");
const keyHintEl         = document.getElementById("apikey-hint");
const keyFieldEl        = document.getElementById("apikey-field");
const ollamaInfo        = document.getElementById("ollama-info");
const ollamaFields      = document.getElementById("ollama-fields");
const ollamaUrlEl       = document.getElementById("ollamaUrl");
const ollamaModelEl     = document.getElementById("ollamaModel");
const langOverrideEl    = document.getElementById("languageOverride");
const detectedLangEl    = document.getElementById("detected-lang");
const statusEl          = document.getElementById("status");

const PROVIDER_META = {
  claude:   { label: "Anthropic API key",     hint: "Get yours at console.anthropic.com — stored locally",  placeholder: "sk-ant-…" },
  openai:   { label: "OpenAI API key",        hint: "Get yours at platform.openai.com — stored locally",    placeholder: "sk-…"     },
  gemini:   { label: "Google Gemini API key", hint: "Get yours at aistudio.google.com — stored locally",    placeholder: "AIza…"    },
};

// Detect and display browser language from the active tab
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  const detect = lang => { detectedLangEl.textContent = lang || navigator.language || "en"; };
  if (tabs[0]?.id) {
    chrome.scripting.executeScript(
      { target: { tabId: tabs[0].id }, func: () => navigator.language },
      results => detect(results?.[0]?.result)
    );
  } else {
    detect(navigator.language);
  }
});

// Load ALL saved settings — use null-safe restore for every field including languageOverride
chrome.storage.local.get(
  ["apiKey", "verseUrl", "provider", "ollamaUrl", "ollamaModel", "languageOverride"],
  (stored) => {
    if (stored.verseUrl)    verseUrlEl.value    = stored.verseUrl;
    if (!stored.verseUrl)   inheritVerseUrl(verseUrlEl);
    if (stored.apiKey)      keyEl.value         = stored.apiKey;
    if (stored.provider)    providerEl.value    = stored.provider;
    if (stored.ollamaUrl)   ollamaUrlEl.value   = stored.ollamaUrl;
    if (stored.ollamaModel) ollamaModelEl.value = stored.ollamaModel;

    // Restore language — must use !== undefined check so "" (auto-detect) also restores
    if (stored.languageOverride !== undefined) {
      langOverrideEl.value = stored.languageOverride;
    }

    updateUI(stored.provider || "claude");
  }
);

providerEl.addEventListener("change", () => { updateUI(providerEl.value); saveAll(); });

function inheritVerseUrl(inputEl) {
  chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
    if (!tab) return;
    chrome.tabs.sendMessage(tab.id, { type: 'GET_SHARED_VERSE_URL' }, res => {
      if (chrome.runtime.lastError) return;
      if (res?.url && !inputEl.value) inputEl.value = res.url;
    });
  });
}

function updateUI(prov) {
  const isOllama = prov === "ollama";
  ollamaInfo.classList.toggle("visible",   isOllama);
  ollamaFields.classList.toggle("visible", isOllama);
  keyFieldEl.classList.toggle("hidden", isOllama);
  if (!isOllama) {
    const meta = PROVIDER_META[prov] || PROVIDER_META.claude;
    keyLabelEl.textContent = meta.label;
    keyHintEl.textContent  = meta.hint;
    keyEl.placeholder      = meta.placeholder;
  }
}

function saveAll() {
  const url  = verseUrlEl.value.trim().replace(/^https?:\/\//, "").replace(/\/$/, "");
  const prov = providerEl.value;
  const key  = keyEl.value.trim();
  const oUrl = ollamaUrlEl.value.trim();
  const oMod = ollamaModelEl.value.trim();
  const lang = langOverrideEl.value;

  if (!url) { showStatus("Enter your Verse URL to save.", false); return; }
  if (prov !== "ollama" && !key) { showStatus("Enter your API key to save.", false); return; }

  chrome.storage.local.set(
    { apiKey: key, verseUrl: url, provider: prov, ollamaUrl: oUrl, ollamaModel: oMod, languageOverride: lang },
    () => { showStatus("Saved", true); setTimeout(() => { statusEl.textContent = ""; statusEl.className = ""; }, 2000); }
  );
}

function debounce(fn, ms) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}
const debouncedSave = debounce(saveAll, 800);

[verseUrlEl, keyEl, ollamaUrlEl, ollamaModelEl].forEach(el => el.addEventListener("input", debouncedSave));
langOverrideEl.addEventListener("change", saveAll);

function showStatus(msg, ok) {
  statusEl.textContent = msg;
  statusEl.className = ok ? "status-ok" : "status-err";
}
